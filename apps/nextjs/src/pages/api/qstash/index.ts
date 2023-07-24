// Imports
// ========================================================
import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiHandler } from "next";

// Main Handler
// ========================================================
const handler: NextApiHandler = async (req, res) => {
    console.log("If this is printed, the signature has already been verified");

    // do stuff
    res.status(200).end();
}

// Exports
// ========================================================
export default verifySignature(handler);

export const config = {
    api: {
        bodyParser: false,
    },
};