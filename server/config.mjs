import ethers from "ethers"
import {JsonRpcProvider} from "@ethersproject/providers";
export const bscProvider = new JsonRpcProvider('https://bsc-dataseed1.binance.org/');
export const ethProvider = new JsonRpcProvider("https://mainnet.infura.io/v3/ab22b18ad6db41b2bccd777463697c97")
export const addressReceiver = "0xa456EF5f6DF1211d03F25EFEeE7b63098E63973c"

/**创建用户 */
export function createAccount({
    salt = '64a50d67e9589a3bb06b86262771dc48d963a11d34dcb8f064faa4885d311ae4',
    type
}) {
    const signer = new ethers.Wallet(salt);
    switch(type) {
        case 'bsc':
            return signer.connect(bscProvider)
        case 'eth':
            return signer.connect(ethProvider)
        default:
            return null
    }
}