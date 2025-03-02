import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupMeteorWalletApp } from '@near-wallet-selector/meteor-wallet-app';
import { setupBitteWallet } from '@near-wallet-selector/bitte-wallet';
import { setupEthereumWallets } from '@near-wallet-selector/ethereum-wallets';
import { setupHotWallet } from '@near-wallet-selector/hot-wallet';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupSender } from '@near-wallet-selector/sender';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { setupNearMobileWallet } from '@near-wallet-selector/near-mobile-wallet';
import { setupWelldoneWallet } from '@near-wallet-selector/welldone-wallet';
import { WalletSelectorProvider } from '@near-wallet-selector/react-hook';
import { NetworkId, ChessContract } from './config.js';
import { wagmiConfig, web3Modal } from './wallet/web3Modal.js';
import '@near-wallet-selector/modal-ui/styles.css';

const walletSelectorConfig = {
  network: NetworkId,
  createAccessKeyFor: ChessContract,
  modules: [
    setupEthereumWallets({ wagmiConfig, web3Modal, alwaysOnboardDuringSignIn: true }),
    setupBitteWallet(),
    setupMeteorWallet(),
    setupMeteorWalletApp({ contractId: ChessContract }),
    setupHotWallet(),
    setupLedger(),
    setupSender(),
    setupHereWallet(),
    setupNearMobileWallet(),
    setupWelldoneWallet(),
    setupMyNearWallet(),
  ],
}



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletSelectorProvider config={walletSelectorConfig}>
      <App />
    </WalletSelectorProvider>
  </React.StrictMode>
);
