// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"
import {ethers} from "ethers";
import InputDataDecoder from "ethereum-input-data-decoder"
export const ethWsUrl = "wss://goerli.infura.io/ws/v3/cb99235454074eefb7f021962c1c6a6a";
console.log(ethers)
export const ethWsProvider = new ethers.providers.WebSocketProvider(ethWsUrl);
interface TX {
  to?: string;
  data?: string;
}
async function getAbiFromEtherScan(address: string) {
  // const res = await axios.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=KQD6BGRQT3KKK62DADUJ4Y3Z242VIZQS64`)
  const res = await axios.get(`https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=KQD6BGRQT3KKK62DADUJ4Y3Z242VIZQS64`)
  return res
}


async function decodeTransactionData(hash: string) {
  const tx: TX = await ethWsProvider.getTransaction(hash)
  return tx
}


type Data = {
  name: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const hash = req.body.hash
  // console.log("hash: ", hash)
  let tx = await decodeTransactionData(hash?.toString() || "");
  // console.log("tx: ", tx)
  if (tx.to) {
    let abi = await getAbiFromEtherScan(tx.to);
    // console.log("abi: ", abi.data.result)
    const data = JSON.parse(abi.data.result)
      const decoder = new InputDataDecoder(data);
      if (tx.data) {
        const result = decoder.decodeData(tx.data)
        let number: number = 99
        try {
          if (parseInt(tx.data.slice(10)) && parseInt(tx.data.slice(10)) > 0) {
            number = parseInt(tx.data.slice(10))
          }
        } catch (e) {
          console.log(e)
        }

        console.log(`${result.method}(${result.types.toString()})`)
        const finalResult = `${result.method}(${result.types.toString()})`
        res.status(200).json({ name: `${result.method}(${result.types.toString()})`, abi: abi.data.result, method: result.method, to: tx.to, number: number})
        return finalResult
      }
  }
  res.status(500);
 
}
