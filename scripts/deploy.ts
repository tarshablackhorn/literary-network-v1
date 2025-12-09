import { ethers, run } from "hardhat";

async function main() {
  // IMPORTANT: Update this with your actual metadata base URI
  const baseURI = "ipfs://bafybeiewc5v6islzpvvvvpntnzio5tsp4orsntcdewc3muv24si7zmbwgi/";


  console.log("\n🚀 Deploying LiteraryNFT contract...");
  console.log("📝 Base URI:", baseURI);

  const [deployer] = await ethers.getSigners();
  console.log("👤 Deploying from:", deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH\n");

  const LiteraryNFT = await ethers.getContractFactory("LiteraryNFT");
  const literaryNFT = await LiteraryNFT.deploy(baseURI);

  await literaryNFT.waitForDeployment();

  const address = await literaryNFT.getAddress();
  console.log("✅ LiteraryNFT deployed to:", address);
  console.log("🔗 View on Basescan: https://basescan.org/address/" + address);

  // Wait for a few block confirmations before verifying
  console.log("\n⏳ Waiting for block confirmations...");
  await literaryNFT.deploymentTransaction()?.wait(5);

  // Verify on Basescan
  console.log("\n🔍 Verifying contract on Basescan...");
  try {
    await run("verify:verify", {
      address: address,
      constructorArguments: [baseURI],
    });
    console.log("✅ Contract verified successfully!");
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("✅ Contract already verified!");
    } else {
      console.error("❌ Verification failed:", error.message);
      console.log("\n📝 Manual verification command:");
      console.log(`npx hardhat verify --network base ${address} "${baseURI}"`);
    }
  }

  console.log("\n✨ Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
