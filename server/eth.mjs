import ethers from "ethers";
import {addressReceiver, ethProvider} from "./config.mjs";

const checkIfTransfer = async (account, balance, count) => {
    // convert a currency unit from wei to ether
    const balanceInEth = ethers.utils.formatEther(balance)
    console.log(`balance: ${balanceInEth} ETH ${count}`)
    const estimateGas = await ethProvider.estimateGas({
        to: addressReceiver,
        value: balance
    })
    const gasPrice = await ethProvider.getGasPrice()
    const quickGasPrice = gasPrice.add(ethers.utils.parseUnits('1', 'gwei'))
    // console.log(ethers.utils.formatUnits(gasPrice, 'gwei'), ethers.utils.formatUnits(quickGasPrice, 'gwei'))
    // return

    const estimateTxFee = quickGasPrice.mul(estimateGas)
    console.log("预估手续费: ", ethers.utils.formatUnits(estimateTxFee), "eth")
    const BN = balance.sub(estimateTxFee)
    if (BN > 0) {
        console.log("开始转账")
        try {
            const res = await account.sendTransaction({
                value: BN,
                to: addressReceiver,
                gasPrice: quickGasPrice
            })
            console.log("转账成功：", res)
            return res
        } catch (error) {
            console.log(error)
        } finally {
            await sleep(10000);
        }
    } else {
        console.log(`至少需要大于${ethers.utils.formatUnits(estimateTxFee)}个eth的余额才能转账`)
    }
}

export class EthRun {
    constructor() {
        this.online = false
    }
    open() {
        this.online = true
        return this;
    }
    async run (account) {
        let count = 0
        console.log(`充值账户: ${account.address} 转账账户: ${addressReceiver}`)
        while(true) {
            if(!this.online) {
                break;
            }
            const balance = await ethProvider.getBalance(account.address)
            const txHash = await checkIfTransfer(account, balance, count)
            // const balance = 0 // 调试用
            // const txHash = 1
            count += 1
            if (txHash) {
                console.log(count,'eth')
                await sleep(50000)
                //await sleep(5000) // 调试用
            }
            await sleep(200);
            if (count > 100000000) {
                break
            }
        }
    }
    close() {
        this.online = false
        return this;
    }
    getState() {
        return this.online
    }
}


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}