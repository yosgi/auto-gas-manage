// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {process} from '../../server/index.mjs'

interface ReqBody {
  eth:Boolean
  bsc:Boolean,
  account:String
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let arr = req.body
    console.log(arr)
    if(arr){
        arr.forEach((item:ReqBody) => process(item));
        res.status(200).json({ result: true })
    }else{
        res.status(200).json({ result: false,message:'request body error' })
    }
}
