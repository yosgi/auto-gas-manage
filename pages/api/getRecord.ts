// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
export const ethWsUrl = "wss://lingering-proud-glade.quiknode.pro/245dd8a61552d7698343e073662dcbbbe33bb45d/";
import { MongoClient } from "mongodb";
async function getRecord(address: string) {
    const client = await MongoClient.connect(
        "mongodb+srv://mint_factory:mint_factory100@cluster0.rribboq.mongodb.net/?retryWrites=true&w=majority");
    const db = client.db("mint_factory");
    // get all transactions
    const yourCollection = db.collection("transactions");
    const result = await yourCollection.find({address}).toArray();
    let res = await client.close();
    return result
}


type Data = {
  result: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {address} = req.query
  let result = await getRecord(address?.toString() || "")
  res.status(200).json({ result })
}
