// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title LiteraryNFT
 * @dev ERC-1155 token for gating access to literary works.
 * Each token ID represents a different book.
 * Multiple copies of each book can exist.
 *
 * Features:
 * - Owner and public mint (purchase)
 * - Max supply per book (0 = unlimited)
 * - Time-bounded sales (including free mints when price = 0)
 * - Metadata freeze flag
 * - Pausable minting/purchasing
 */
contract LiteraryNFT is ERC1155, Ownable, Pausable {
    using Strings for uint256;

    // Token IDs for each book
    uint256 public constant THE_PROLOGUES   = 1;
    uint256 public constant ASH_AND_STATIC  = 2;
    uint256 public constant MIDNIGHT_LEDGER = 3;

    // Base URI for metadata
    string private _baseTokenURI;

    // Metadata freeze flag
    bool public metadataFrozen;

    // Max supply per token ID (0 = unlimited)
    mapping(uint256 => uint256) public maxSupply;

    // Current minted supply per token ID
    mapping(uint256 => uint256) public currentSupply;

    /**
     * @dev Pricing information for a book.
     * basePrice: default price when there is no active sale.
     * salePrice: price used during a sale window (can be 0 for free mint).
     * saleStart / saleEnd: unix timestamps bounding the sale window.
     */
    struct BookPricing {
        uint256 basePrice;
        uint256 salePrice;
        uint64 saleStart;
        uint64 saleEnd;
    }

    mapping(uint256 => BookPricing) private _pricing;

    event BookMinted(address indexed to, uint256 indexed tokenId, uint256 amount);
    event BasePriceUpdated(uint256 indexed tokenId, uint256 newBasePrice);
    event SaleUpdated(
        uint256 indexed tokenId,
        uint256 salePrice,
        uint64 saleStart,
        uint64 saleEnd
    );
    event BaseURIUpdated(string newBaseURI);
    event MetadataFrozen();
    event Withdrawn(address indexed to, uint256 amount);

    constructor(string memory baseURI)
        ERC1155("")
        Ownable(msg.sender)
    {
        _baseTokenURI = baseURI;

        // Example initial pricing:
        // Base price: 0.001 ETH (can be changed later by owner).
        _pricing[THE_PROLOGUES].basePrice   = 0.001 ether;
        _pricing[ASH_AND_STATIC].basePrice  = 0.001 ether;
        _pricing[MIDNIGHT_LEDGER].basePrice = 0.001 ether;

        // Max supply (0 = unlimited)
        maxSupply[THE_PROLOGUES]   = 1000;
        maxSupply[ASH_AND_STATIC]  = 1000;
        maxSupply[MIDNIGHT_LEDGER] = 1000;
    }

    // --------- Views ---------

    /**
     * @dev Returns the metadata URI for a given token ID.
     */
    function uri(uint256 tokenId) public view override returns (string memory) {
        require(_isValidTokenId(tokenId), "Invalid token ID");
        return string(abi.encodePacked(_baseTokenURI, tokenId.toString(), ".json"));
    }

    /**
     * @dev Returns the *current* effective price for a tokenId,
     * taking into account any active sale window.
     */
    function getCurrentPrice(uint256 tokenId) public view returns (uint256) {
        require(_isValidTokenId(tokenId), "Invalid token ID");

        BookPricing memory p = _pricing[tokenId];

        if (p.saleStart != 0 && p.saleEnd != 0) {
            if (block.timestamp >= p.saleStart && block.timestamp <= p.saleEnd) {
                // Active sale period (can be 0 for free mint)
                return p.salePrice;
            }
        }

        // Default to base price when there is no active sale
        return p.basePrice;
    }

    /**
     * @dev Helper to read pricing details for a book.
     */
    function getPricing(uint256 tokenId)
        external
        view
        returns (BookPricing memory)
    {
        require(_isValidTokenId(tokenId), "Invalid token ID");
        return _pricing[tokenId];
    }

    /**
     * @dev Check if an address owns a specific book.
     */
    function ownsBook(address account, uint256 tokenId)
        external
        view
        returns (bool)
    {
        require(_isValidTokenId(tokenId), "Invalid token ID");
        return balanceOf(account, tokenId) > 0;
    }

    // --------- Minting ---------

    /**
     * @dev Mint a book NFT (owner only, for airdrops/giveaways).
     */
    function mint(
        address to,
        uint256 tokenId,
        uint256 amount
    ) external onlyOwner whenNotPaused {
        require(_isValidTokenId(tokenId), "Invalid token ID");
        require(amount > 0, "Amount must be greater than 0");

        _enforceMaxSupply(tokenId, amount);

        currentSupply[tokenId] += amount;
        _mint(to, tokenId, amount, "");

        emit BookMinted(to, tokenId, amount);
    }

    /**
     * @dev Purchase a book NFT.
     * - Respects max supply.
     * - Uses the current price (base or sale).
     * - Requires EXACT payment (no overpay).
     */
    function purchase(uint256 tokenId, uint256 amount)
        external
        payable
        whenNotPaused
    {
        require(_isValidTokenId(tokenId), "Invalid token ID");
        require(amount > 0, "Amount must be greater than 0");

        uint256 unitPrice = getCurrentPrice(tokenId);
        // price == 0 is allowed (free mint or free sale)
        uint256 requiredValue = unitPrice * amount;
        require(msg.value == requiredValue, "Incorrect payment");

        _enforceMaxSupply(tokenId, amount);

        currentSupply[tokenId] += amount;
        _mint(msg.sender, tokenId, amount, "");

        emit BookMinted(msg.sender, tokenId, amount);
    }

    // --------- Admin: pricing & sales ---------

    /**
     * @dev Set the base (non-sale) price for a book.
     * This is the default price used when there is no active sale window.
     */
    function setBasePrice(uint256 tokenId, uint256 newBasePrice)
        external
        onlyOwner
    {
        require(_isValidTokenId(tokenId), "Invalid token ID");
        _pricing[tokenId].basePrice = newBasePrice;

        emit BasePriceUpdated(tokenId, newBasePrice);
    }

    /**
     * @dev Configure a sale for a book.
     * - `salePrice` can be 0 for free mint during the sale window.
     * - Set `saleStart` and `saleEnd` as UNIX timestamps.
     * - To disable a sale, set both to 0.
     *
     * Example: free mint for 24 hours:
     *   setSale(tokenId, 0, uint64(block.timestamp), uint64(block.timestamp + 1 days));
     */
    function setSale(
        uint256 tokenId,
        uint256 salePrice,
        uint64 saleStart,
        uint64 saleEnd
    ) external onlyOwner {
        require(_isValidTokenId(tokenId), "Invalid token ID");
        require(
            saleStart == 0 && saleEnd == 0 || saleStart < saleEnd,
            "Invalid sale window"
        );

        _pricing[tokenId].salePrice = salePrice;
        _pricing[tokenId].saleStart = saleStart;
        _pricing[tokenId].saleEnd = saleEnd;

        emit SaleUpdated(tokenId, salePrice, saleStart, saleEnd);
    }

    // --------- Admin: supply & metadata ---------

    /**
     * @dev Update max supply for a book (owner only).
     * Cannot be set below current supply.
     */
    function setMaxSupply(uint256 tokenId, uint256 newMaxSupply)
        external
        onlyOwner
    {
        require(_isValidTokenId(tokenId), "Invalid token ID");
        require(
            newMaxSupply == 0 || newMaxSupply >= currentSupply[tokenId],
            "Cannot set below current supply"
        );
        maxSupply[tokenId] = newMaxSupply;
    }

    /**
     * @dev Update base URI (owner only).
     * Cannot be changed after metadata is frozen.
     */
    function setBaseURI(string memory newBaseURI) external onlyOwner {
        require(!metadataFrozen, "Metadata frozen");
        _baseTokenURI = newBaseURI;
        emit BaseURIUpdated(newBaseURI);
    }

    /**
     * @dev Freeze metadata permanently.
     * After this, `setBaseURI` can no longer be called successfully.
     */
    function freezeMetadata() external onlyOwner {
        require(!metadataFrozen, "Already frozen");
        metadataFrozen = true;
        emit MetadataFrozen();
    }

    // --------- Admin: pause / unpause ---------

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // --------- Admin: withdraw ---------

    /**
     * @dev Withdraw contract balance (owner only).
     * Uses call instead of transfer for forward-compatibility.
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");

        address to = owner();
        (bool success, ) = to.call{value: balance}("");
        require(success, "Withdraw failed");

        emit Withdrawn(to, balance);
    }

    // --------- Internal helpers ---------

    function _isValidTokenId(uint256 tokenId) internal pure returns (bool) {
        return tokenId >= 1 && tokenId <= 3;
    }

    function _enforceMaxSupply(uint256 tokenId, uint256 amount) internal view {
        uint256 max = maxSupply[tokenId];
        if (max > 0) {
            require(
                currentSupply[tokenId] + amount <= max,
                "Max supply reached"
            );
        }
    }
}
