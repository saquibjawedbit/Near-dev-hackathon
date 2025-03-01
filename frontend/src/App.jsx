import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import Battle from "./pages/Battle";
import { connect, keyStores, WalletConnection } from "near-api-js";

const config = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  contractName: "saquibjawed.testnet",
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/battle" element={<Battle />} />
      </Routes>
    </Router>
  );
}

export default App;
