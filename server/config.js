import ethers from "ethers"
import {JsonRpcProvider} from "@ethersproject/providers";
export const bscProvider = new JsonRpcProvider('https://bsc-dataseed1.binance.org/');
export const ethProvider = new JsonRpcProvider("https://mainnet.infura.io/v3/ab22b18ad6db41b2bccd777463697c97")
export const signer = new ethers.Wallet(""); // 私钥1
export const signer2 = new ethers.Wallet(""); // 私钥2
export const bscAccount = signer.connect(bscProvider);
export const bscAccount2 = signer2.connect(bscProvider);
export const ethAccount = signer.connect(ethProvider);
export const ethAccount2 = signer2.connect(ethProvider)
export const addressReceiver = "0xa456EF5f6DF1211d03F25EFEeE7b63098E63973c"