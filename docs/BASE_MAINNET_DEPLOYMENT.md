# Base Mainnet Deployment Guide

This guide walks you through deploying the Literary Network app to Base Mainnet.

## Prerequisites

✅ **You have:**
- Contract deployed at: `0xcB8B11587625EA052D309e86fA0F2d525A4f94e4`
- IPFS metadata at: `https://ipfs.io/ipfs/bafybeiewc5v6islzpvvvvpntnzio5tsp4orsntcdewc3muv24si7zmbwgi/`
- Base Mainnet ETH in your wallet (at least 0.01 ETH for testing)

## Step 1: Environment Setup

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your RPC endpoint:
```bash
# Use Alchemy, QuickNode, or public RPC
VITE_BASE_MAINNET_RPC=https://mainnet.base.org

# Contract address (already set)
VITE_LITERARY_NFT_ADDRESS=0xcB8B11587625EA052D309e86fA0F2d525A4f94e4
```

**Recommended**: Get a free RPC from [Alchemy](https://www.alchemy.com/) or [QuickNode](https://www.quicknode.com/) for better performance and rate limits.

Example with Alchemy:
```
VITE_BASE_MAINNET_RPC=https://base-mainnet.g.alchemy.com/v2/YOUR_API_KEY
```

## Step 2: Local Testing

1. Install dependencies:
```bash
npm install
```

2. Start the dev server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

4. Test the flow:
   - Connect your wallet (MetaMask, Coinbase Wallet, etc.)
   - Make sure you're on Base Mainnet (chain ID 8453)
   - If on wrong network, click "Switch to Base"
   - Try purchasing "The Prologues" for 0.001 ETH
   - Confirm you have enough ETH for gas (~0.0002-0.0005 ETH)

## Step 3: Contract Verification (Recommended)

Before going live, verify your contract on BaseScan:

Follow the guide in [CONTRACT_VERIFICATION.md](./CONTRACT_VERIFICATION.md)

Quick link: https://basescan.org/address/0xcB8B11587625EA052D309e86fA0F2d525A4f94e4#code

## Step 4: Production Build

1. Build for production:
```bash
npm run build
```

2. Test the production build locally:
```bash
npm run preview
```

3. Verify everything works at http://localhost:4173

## Step 5: Deploy to Vercel

1. Push your code to GitHub (make sure `.env.local` is in `.gitignore`)

2. Go to [Vercel](https://vercel.com) and import your repository

3. Add environment variables in Vercel dashboard:
   - `VITE_BASE_MAINNET_RPC` = Your Alchemy/QuickNode URL
   - `VITE_LITERARY_NFT_ADDRESS` = `0xcB8B11587625EA052D309e86fA0F2d525A4f94e4`

4. Deploy!

## Step 6: Post-Deployment Checklist

After deploying, verify:

- [ ] App loads without errors
- [ ] Wallet connection works (RainbowKit modal opens)
- [ ] Network guard shows when on wrong network
- [ ] "Switch to Base" button works
- [ ] Purchase button appears for non-owners
- [ ] Purchase flow works (connect → confirm → success)
- [ ] Error messages show for failed transactions
- [ ] Book appears as "Owned" after purchase
- [ ] Book content loads when clicked
- [ ] Contract is verified on BaseScan

## Step 7: Fund Your Testing Wallet

For testing purchases, you'll need Base ETH:

**Option 1: Bridge from Ethereum**
- Use [Base Bridge](https://bridge.base.org)
- Bridge at least 0.01 ETH for testing

**Option 2: Buy directly on Base**
- Use [Coinbase](https://www.coinbase.com/) → Withdraw to Base
- Use [Uniswap on Base](https://app.uniswap.org/#/swap?chain=base)

**Option 3: Use a Testnet First**
- Deploy to Base Sepolia testnet
- Get free testnet ETH from [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
- Test thoroughly before mainnet

## Common Issues

### "Insufficient funds for gas"
- You need more ETH than just the 0.001 purchase price
- Keep at least 0.01 ETH in your wallet for gas

### "Wrong Network" despite being on Base
- Clear browser cache and reload
- Disconnect and reconnect wallet
- Check wallet is actually on Base (chain ID 8453)

### Transaction fails immediately
- Check you have enough ETH for gas
- Verify contract isn't paused
- Try increasing gas limit manually in MetaMask

### "Contract not verified"
- Follow [CONTRACT_VERIFICATION.md](./CONTRACT_VERIFICATION.md)
- This doesn't affect functionality, only BaseScan display

## Production Monitoring

Consider adding:

1. **Analytics**: Track purchases, wallet connections, failed transactions
2. **Error logging**: Use Sentry or similar for production errors
3. **RPC monitoring**: Watch your RPC rate limits
4. **Gas price alerts**: Monitor Base gas prices for user experience

## Next Steps for V2

Future improvements to consider:

- [ ] Multiple books support
- [ ] Dynamic pricing
- [ ] Sale periods with discounts
- [ ] Metadata updates for new books
- [ ] Royalty splits for multiple authors
- [ ] Reading progress tracking
- [ ] Social features (reviews, ratings)
- [ ] Secondary market integration

## Support

If you encounter issues:

1. Check [BaseScan](https://basescan.org) for transaction details
2. Review error messages in browser console
3. Test with a fresh wallet to rule out wallet-specific issues
4. Verify environment variables are set correctly

## Security Notes

**Never commit:**
- `.env.local` (contains RPC URLs)
- Private keys
- API keys

**Best practices:**
- Use a separate wallet for admin functions
- Don't share your Alchemy/QuickNode API keys
- Monitor contract for unexpected behavior
- Keep a small amount of ETH in testing wallets

---

**You're ready for Base Mainnet! 🎉**

The app is production-ready with proper error handling, network switching, and user feedback. Test thoroughly, then share with your readers!
