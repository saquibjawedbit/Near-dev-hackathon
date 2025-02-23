import nearAPI from "near-api-js";

const { connect, KeyPair, keyStores, transactions, utils } = nearAPI;

export default async function initNear() {
    const keyStore = new keyStores.InMemoryKeyStore();
    
    // Load your private key
    const PRIVATE_KEY = "your_private_key_here";
    const ACCOUNT_ID = "yourname.testnet";  // Your contract's account
    
    // Add key to keystore
    const keyPair = KeyPair.fromString(PRIVATE_KEY);
    await keyStore.setKey("testnet", ACCOUNT_ID, keyPair);

    // Configure connection
    const near = await connect({
        networkId: "testnet",
        keyStore,
        nodeUrl: "https://rpc.testnet.near.org",
    });

    return near.account(ACCOUNT_ID);
}
