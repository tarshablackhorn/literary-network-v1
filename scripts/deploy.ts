import { ethers } from "hardhat";

async function main() {
  console.log("Deploying LiteraryNFT contract...");

  // Base URI for metadata - you'll need to update this with your actual IPFS/server URL
  const baseURI = "https://your-metadata-server.com/metadata/";

  const LiteraryNFT = await ethers.getContractFactory("LiteraryNFT");
  const literaryNFT = await LiteraryNFT.deploy(baseURI);

  await literaryNFT.waitForDeployment();

  const address = await literaryNFT.getAddress();
  console.log("LiteraryNFT deployed to:", address);

  // Optional: Mint some initial tokens to yourself for testing
  // const [deployer] = await ethers.getSigners();
  // await literaryNFT.mint(deployer.address, 1, 1); // Mint 1 copy of The Prologues
  // console.log("Minted 1 copy of The Prologues to:", deployer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
