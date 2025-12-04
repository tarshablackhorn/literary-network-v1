// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title LiteraryNFT
 * @dev ERC-1155 token for gating access to literary works
 * Each token ID represents a different book
 * Multiple copies of each book can exist
 */
contract LiteraryNFT is ERC1155, Ownable {
    using Strings for uint256;

    // Token IDs for each book
    uint256 public constant THE_PROLOGUES = 1;
    uint256 public constant ASH_AND_STATIC = 2;
    uint256 public constant MIDNIGHT_LEDGER = 3;

    // Base URI for metadata
    string private _baseTokenURI;

    // Mapping from token ID to max supply (0 = unlimited)
    mapping(uint256 => uint256) public maxSupply;

    // Mapping from token ID to current supply
    mapping(uint256 => uint256) public currentSupply;

    // Price per book (in wei)
    mapping(uint256 => uint256) public price;

    event BookMinted(address indexed to, uint256 indexed tokenId, uint256 amount);
    event PriceUpdated(uint256 indexed tokenId, uint256 newPrice);

    constructor(
        string memory baseURI
    ) ERC1155("") Ownable(msg.sender) {
        _baseTokenURI = baseURI;
        
        // Set initial prices (0.001 ETH = 1000000000000000 wei)
        price[THE_PROLOGUES] = 0.001 ether;
        price[ASH_AND_STATIC] = 0.001 ether;
        price[MIDNIGHT_LEDGER] = 0.001 ether;

        // Set max supply (0 = unlimited)
        maxSupply[THE_PROLOGUES] = 1000;
        maxSupply[ASH_AND_STATIC] = 1000;
        maxSupply[MIDNIGHT_LEDGER] = 1000;
    }

    /**
     * @dev Returns the URI for a given token ID
     */
    function uri(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(_baseTokenURI, tokenId.toString(), ".json"));
    }

    /**
     * @dev Mint a book NFT (owner only, for airdrops/giveaways)
     */
    function mint(
        address to,
        uint256 tokenId,
        uint256 amount
    ) external onlyOwner {
        require(tokenId >= 1 && tokenId <= 3, "Invalid token ID");
        
        // Check max supply
        if (maxSupply[tokenId] > 0) {
            require(
                currentSupply[tokenId] + amount <= maxSupply[tokenId],
                "Max supply reached"
            );
        }

        currentSupply[tokenId] += amount;
        _mint(to, tokenId, amount, "");
        
        emit BookMinted(to, tokenId, amount);
    }

    /**
     * @dev Purchase a book NFT
     */
    function purchase(uint256 tokenId, uint256 amount) external payable {
        require(tokenId >= 1 && tokenId <= 3, "Invalid token ID");
        require(amount > 0, "Amount must be greater than 0");
        require(msg.value >= price[tokenId] * amount, "Insufficient payment");

        // Check max supply
        if (maxSupply[tokenId] > 0) {
            require(
                currentSupply[tokenId] + amount <= maxSupply[tokenId],
                "Max supply reached"
            );
        }

        currentSupply[tokenId] += amount;
        _mint(msg.sender, tokenId, amount, "");
        
        emit BookMinted(msg.sender, tokenId, amount);
    }

    /**
     * @dev Check if an address owns a specific book
     */
    function ownsBook(address account, uint256 tokenId) external view returns (bool) {
        return balanceOf(account, tokenId) > 0;
    }

    /**
     * @dev Update the price of a book (owner only)
     */
    function setPrice(uint256 tokenId, uint256 newPrice) external onlyOwner {
        require(tokenId >= 1 && tokenId <= 3, "Invalid token ID");
        price[tokenId] = newPrice;
        emit PriceUpdated(tokenId, newPrice);
    }

    /**
     * @dev Update max supply for a book (owner only)
     */
    function setMaxSupply(uint256 tokenId, uint256 newMaxSupply) external onlyOwner {
        require(tokenId >= 1 && tokenId <= 3, "Invalid token ID");
        require(newMaxSupply >= currentSupply[tokenId], "Cannot set below current supply");
        maxSupply[tokenId] = newMaxSupply;
    }

    /**
     * @dev Update base URI (owner only)
     */
    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    /**
     * @dev Withdraw contract balance (owner only)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        payable(owner()).transfer(balance);
    }
}
