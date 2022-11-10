// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
let account = {
    user:'admin',
    password:'admin123'
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {user,password} = req.body
  console.log(user,password)
    if(user === account.user && password === account.password){
        res.status(200).json({ result: true })
    }else{
        res.status(200).json({ result: false })
    }
}
