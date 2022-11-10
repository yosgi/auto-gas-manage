// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
export const ethWsUrl = "wss://lingering-proud-glade.quiknode.pro/245dd8a61552d7698343e073662dcbbbe33bb45d/";
import { MongoClient } from "mongodb";
import { timeStamp } from 'console';
async function saveRecord (address:string,hash: string) {
        const client = await
            MongoClient.connect(
                "mongodb+srv://mint_factory:mint_factory100@cluster0.rribboq.mongodb.net/?retryWrites=true&w=majority");
        const db = client.db("mint_factory");
        const yourCollection = db.collection("transactions");
        const result = await yourCollection.insertOne({address,hash,timeStamp: Date.now()});
        console.log(result);
        let res = await client.close();
        return res
}
type Data = {
  result: any
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    //  get address and hash from post request
    const {address,hash} = req.body
    console.log("address: ", address, "hash: ", hash)
    // save record to db
    let result = await saveRecord(address,hash)
    // return result
    res.status(200).json({ result })
}
