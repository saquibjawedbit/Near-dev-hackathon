import { connect, keyStores, providers } from "near-api-js";
import { KeyPair } from "near-api-js/lib/utils/key_pair.js";
import dotenv from "dotenv";

// Configure dotenv properly
dotenv.config();

// Function to get a NEAR account
async function getAccount() {
  // Use the imported KeyPair, not keyStores.KeyPair
  const keyStore = new keyStores.InMemoryKeyStore();
  const keyPair = KeyPair.fromString(process.env.PRIVATE_KEY);
  await keyStore.setKey("testnet", process.env.CONTRACT_ID, keyPair);
  // Connect to NEAR
  const near = await connect({
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    keyStore,
  });


  // Get account and return it
  const account = await near.account(process.env.CONTRACT_ID);  
  return account;
}


// If args are required, they can be passed in like this:
// args: {
//   from_index: "0",
//   limit: "10"
// }
async function viewContract({
  contractId,
  methodName,
  args = {},
  finality = "optimistic",
}) {
  // Set up a new provider
  const url = `https://rpc.testnet.near.org`;
  const provider = new providers.JsonRpcProvider({ url });

  // Convert the arguments to base64
  const argsBase64 = args
    ? Buffer.from(JSON.stringify(args)).toString("base64")
    : "";

  // Make the view call
  const viewCallResult = await provider.query({
    request_type: "call_function",
    account_id: contractId,
    method_name: methodName,
    args_base64: argsBase64,
    finality: finality,
  });

  // Parse the result
  return JSON.parse(Buffer.from(viewCallResult.result).toString());
}



export { viewContract, getAccount };
