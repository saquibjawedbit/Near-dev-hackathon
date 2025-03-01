import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import "@near-wallet-selector/modal-ui/styles.css";

// Create a function to initialize wallet selector
async function initWalletSelector() {
  return await setupWalletSelector({
    network: "testnet",
    modules: [setupMyNearWallet()]
  });
}

// Cache the wallet selector instance
let walletSelectorInstance = null;

async function signInWithNEAR() {
  try {
    // Initialize the wallet selector if not already done
    if (!walletSelectorInstance) {
      walletSelectorInstance = await initWalletSelector();
    }

    const wallet = await walletSelectorInstance.wallet("my-near-wallet");
    await wallet.signIn({ contractId: "test.testnet" });
  } catch (error) {
    console.error("Error signing in with NEAR:", error);
    return { success: false, error: error.message };
  }
}

// Function to check if user is signed in (based on URL params or stored state)
async function checkSignedIn() {
  if (!walletSelectorInstance) {
    walletSelectorInstance = await initWalletSelector();
  }

  const wallet = await walletSelectorInstance.wallet("my-near-wallet");
  const accounts = await wallet.getAccounts();
  return accounts;
}

export { signInWithNEAR, checkSignedIn };