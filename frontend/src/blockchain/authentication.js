import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import "@near-wallet-selector/modal-ui/styles.css";
import { connect, keyStores, WalletConnection, Contract } from "near-api-js";

const config = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  contractName: "saquibjawed.testnet",
};

export async function initNear() {
  const near = await connect(config);
  const wallet = new WalletConnection(near);
  return { near, wallet };
}

export async function getContract(wallet) {
  return new Contract(wallet.account(), config.contractName, {
    viewMethods: ["get_game"], // Read-only methods
    changeMethods: ["place_bet", "set_winner", "claim_winnings"], // Methods that modify state
  });
}

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
    await wallet.signIn({ contractId: "saquibjawed.testnet" });
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