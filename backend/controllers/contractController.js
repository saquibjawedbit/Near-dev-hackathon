import initNear from "../utils/nearClient.js";

export const depositMoney = async (req, res) => {
    try {
        const { depositAmount } = req.body; // Amount in yoctoNEAR
        const account = await initNear();

        const result = await account.functionCall({
            contractId: process.env.NEAR_ACCOUNT_ID, // Your smart contract account
            methodName: "deposit",
            args: {},
            gas: "30000000000000",
            attachedDeposit: depositAmount, // Send deposit amount
        });

        res.json({ success: true, result });
    } catch (error) {
        console.error("Deposit error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const declareWinner = async (req, res) => {
    try {
        const { winner } = req.body;
        const account = await initNear();

        const result = await account.functionCall({
            contractId: process.env.NEAR_ACCOUNT_ID,
            methodName: "declare_winner",
            args: { winner },
            gas: "30000000000000",
        });

        res.json({ success: true, result });
    } catch (error) {
        console.error("Declare winner error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}