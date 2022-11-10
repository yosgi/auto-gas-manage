import {createAccount} from './config.mjs'
import {EthRun} from './eth.mjs'
import {BscRun} from './bsc.mjs'

let map = new Map()
/**
 * 连接合约
 */
export function process({
    bsc,
    eth,
    account
}) {
    !!bsc ? connect({
        salt:account,
        type:'bsc'
    }) : disconnect({
        salt:account,
        type:'bsc'
    })

    !!eth ? connect({
        salt:account,
        type:'eth'
    }) : disconnect({
        salt:account,
        type:'eth'
    })
}

function connect({salt,type}) {
    const Account = createAccount({
        salt,
        type
    })
    if(Account) {
        const RunObj = map.get(`${type}${salt}`);
        if(RunObj) {
            if(!RunObj.getState()) {
                RunObj.open().run(Account) 
            }
            return;
        }
        let obj = type === 'bsc' ? new BscRun() : new EthRun();
        map.set(`${type}${salt}`,obj);
        obj.open().run(Account)
    }
}

function disconnect({
    salt,
    type
}) {
    const RunObj = map.get(`${type}${salt}`);
        if(RunObj) {
            RunObj.close()
            return;
        }
}

//以下为node侧调试代码：node ./server/index.mjs
//对应的bsc.mjs和eth.mjs的调试用代码替换可以方便查看效果
// process({
//     bsc:true,
//     eth:true,
//     account:'64a50d67e9589a3bb06b86262771dc48d963a11d34dcb8f064faa4885d311ae4'
// })

// setTimeout(() => process({
//     bsc:true,
//     eth:false,
//     account:'64a50d67e9589a3bb06b86262771dc48d963a11d34dcb8f064faa4885d311ae4'
// }),15000)


// setTimeout(() => process({
//     bsc:false,
//     eth:true,
//     account:'64a50d67e9589a3bb06b86262771dc48d963a11d34dcb8f064faa4885d311ae4'
// }),30000)

// setTimeout(() => process({
//     bsc:false,
//     eth:false,
//     account:'64a50d67e9589a3bb06b86262771dc48d963a11d34dcb8f064faa4885d311ae4'
// }),45000)



// setTimeout(() => process({
//     bsc:true,
//     eth:true,
//     account:'64a50d67e9589a3bb06b86262771dc48d963a11d34dcb8f064faa4885d311ae4'
// }),60000)