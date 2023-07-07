import { ethers } from "ethers";
import throttle from "lodash/throttle";
import _ from "lodash";
import { useUserStore } from "@/store";

export async function sign(msg: string, address: string): Promise<any> {
  const signature = await window.ethereum.request({
    method: "personal_sign",
    params: [msg, address],
  });

  return signature;
}

// 预处理数据金额解决方案
/**
 * @description: 大数据处理使用ethers
 * @param {*} amount
 * @param {*} tokenDecimals
 * @return {*}
 */
export function toAmount(amount: any, tokenDecimals = 18) {
  return ethers.utils.parseUnits(amount, tokenDecimals);
}

// 从合约拉取数据转化 Bignumber => 10 进制字符串(不处理精度)
/**
 * @description: Bignumber => 10进制字符串
 * @param {*} object
 * @return {*}
 */
export function transBigNumber(object: any) {
  const isBig = ethers.BigNumber.isBigNumber(object);
  if (isBig) {
    return object.toString();
  }
  return object;
}

// 从合约拉取数据转化 Bignumber => 10 进制字符串(处理精度)
export function receiveAmount(amount: any, tokenDecimals = 18) {
  const inNumber = transBigNumber(amount);
  let outAmount = ethers.utils.formatUnits(inNumber, tokenDecimals); //处理原数据

  //return outAmount
  outAmount = dealDecimals(outAmount); // 截取有效数据
  return outAmount;
}

// 调用链相关
// 获取块高度
/**
 * @description: 获取块高度
 * @param {*}
 * @return {*}
 */
export async function getBlockNumber() {
  if (!window.ethereum) return;
  let currentBLock = await window.ethereum.request({
    method: "eth_getBlockByNumber",
    params: ["latest", false],
  });
  currentBLock = Number(currentBLock.number).toString();
  return currentBLock;
}

// 账号相关
// 校验 token Address 是否合法
// 此处为语雀内容卡片，点击链接查看：https://www.yuque.com/go/doc/48378172

// 大小写地址矫正
/**
 * @description:  fix address lowercase letters
 * @param {*} address
 * @return {*}
 */
export function transLegalAddress(address: any) {
  const account = ethers.utils.getAddress(address);
  return account;
}

export function outContract(abi: any, contractAddress: any) {
  // 连接区块链网络
  const ethersProvider = new ethers.providers.Web3Provider(
    window.ethereum,
    "any"
  );
  // 提示用户连接钱包
  ethersProvider.send("eth_requestAccounts", []); // <- this promps user to connect metamask
  // 连接合约实例
  const Contract = new ethers.Contract(
    contractAddress,
    abi,
    ethersProvider.getSigner()
  );
  return Contract;
}

/**
 * @description: handelConnectInfo
 * @param {*} info
 * @return {*}
 */
function handelConnectInfo(info: any) {
  console.log(info, "handelConnectInfo");
}

/**
 * @description: handleDisConnect
 * @param {*} disconnect
 * @return {*}
 */
function handleDisConnect(disconnect: any) {
  console.log(disconnect, "handleDisConnect");
}

/**
 * @description: handleNewAccount
 * @param {*} account
 * @return {*}
 */
// function handleNewAccount(account: string) {
// }

async function refreshData(account?: string) {
  const userStore = useUserStore();
  //const rocketPoolStore = useRocketPoolStore();

  //const userStore = useUserStore();
  userStore.refreshAccountInfo(account);
}

async function handleNetworkChanged() {
  const userStore = useUserStore();

  userStore.resetInfo();
  // window.location.href = window.location.href;
  window.location.reload();

  refreshData();
}

async function handleAccountsChanged(accounts: Array<string> | []) {
  // window.location.href = window.location.href;
  window.location.reload();

  refreshData(accounts[0]);
}

/**
 * @description: handelNewMessage
 * @param {*} msg
 * @return {*}
 */
function handelNewMessage(msg: any) {
  console.log(msg, "handelNewMessage");
}

/**
 * @description: monitor metamsk
 * @param {*}
 * @return {*}
 */
function _listeningMetamsk() {
  const ethereum = window.ethereum;

  //ethereum.on('chainChanged', handleNewChain);

  //ethereum.on('accountsChanged', handleNewAccount);

  // 监听网络切换
  ethereum.on("networkChanged", handleNetworkChanged);

  // 监听账号切换
  ethereum.on("accountsChanged", handleAccountsChanged);

  ethereum.on("message", handelNewMessage);

  ethereum.on("connect", throttle(handelConnectInfo, 1000));

  ethereum.on("disconnect", throttle(handleDisConnect, 1000));
}

/**
 * @description: Switch to the rest of the network (mainly used)
 * @param {*} findChain
 * @return {*}
 */
// async function switchToOtherNetwork(findChain: any) {
//   const data = [];
//   data.push(findChain);
//   console.log(findChain, 'switchNetwork');
//   try {
//     await window.ethereum.request({
//       method: 'wallet_addEthereumChain',
//       params: data // [{XXXXX}]  is Array
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

/**
 * @description: Switch to the primary network (may be deprecated in the future)
 * @param {*}
 * @return {*}
 */
// async function switchToEthereum() {
//   try {
//     await window.ethereum.request({
//       method: 'wallet_switchEthereumChain',
//       params: [
//         {
//           chainId: '0x1',
//         },
//       ],
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

/**
 * @description: 获取chainid
 * @param {*}
 * @return {*}
 */
//  async function getChainId() {
//   const { ethereum } = window;
//   try {
//     const chainId = await ethereum.request({
//       method: 'eth_chainId',
//     });
//     //handleNewChain(chainId);
//   } catch (err) {
//     console.error(err);
//   }
//  }

/**
 * @description: check metamsk
 * @param {*}
 * @return {bool}
 */
export function isMetaMask() {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
}

export async function getMetamskConnect() {
  let account = "";
  if (!isMetaMask()) {
    //openUrl('https://metamask.io/', 'install metamsk');
  }
  if (window.ethereum) {
    window.provider = window.ethereum;
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      account = accounts[0];
    } catch (error) {
      console.warn("Please authorize to access tour account");
    }
  }
  //await getChainId(); //获取chanid参数
  _listeningMetamsk();
  return account;
}

/**
 * @description: switch or add rpcNetwork
 * @param {*} id chan_id（16）
 * @return {*}
 */
//  export async function switchNetwork(id: any) {
//   let findChain = nativeMetamaskMap.find(v => v.chainId === id);
//   if (!window.ethereum) {
//     //Message.warning('Please install metamsk');
//     return;
//   }
//   if (!findChain) {
//     //Message.warning('The current website does not support the chain');
//     return;
//   }
//   if (id === '0x1') {
//     switchToEthereum();
//   } else {
//     switchToOtherNetwork(findChain);
//   }
// }

export async function addNetwork(id: any) {
  const findChain = nativeMetamaskMap.find((v) => v.chainId === id);
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [findChain],
    });
  } catch (error) {
    console.log(error);
  }
}

export async function switchNetwork(id: any) {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: id }],
    });
  } catch (error) {
    console.log(error);
  }
}

// 添加链节点
export async function changeNetwork(id: string) {
  if (!window.ethereum) {
    return false;
  }

  // 获取当前链id
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  console.log(`chainId:${chainId}`);
  if (chainId == id) {
    return;
  }

  try {
    await switchNetwork(id);
    return true;
  } catch (e) {
    const err: any = e;
    console.log(err);
    if (err.code === 4902) {
      addNetwork(id);
    }
  }
}

/**
 * @description: matemask config
 * @param {*}
 * @return {*}
 */
export const nativeMetamaskMap = [
  {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    blockExplorerUrls: ["https://etherscan.io"],
  },
  {
    chainId: "0x38",
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com/"],
  },
  {
    chainId: "0x61",
    chainName: "BSC-Test-Network",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  {
    chainId: "0x3",
    chainName: "Ropsten testNet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    blockExplorerUrls: ["https://ropsten.etherscan.io"],
  },
  {
    chainId: "0x2a",
    chainName: "Kovan testNet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    blockExplorerUrls: ["https://kovan.etherscan.io"],
  },
  {
    chainId: "0x440",
    chainName: "Maas - TestNet",
    nativeCurrency: {
      name: "Maas",
      symbol: "Maas",
      decimals: 18,
    },
    rpcUrls: ["https://maas-test-node.onchain.com/"],
    blockExplorerUrls: ["https://maas-test-explorer.onchain.com/"],
  },
  {
    chainId: "0x828",
    chainName: "Maas",
    nativeCurrency: {
      name: "Maas",
      symbol: "Maas",
      decimals: 18,
    },
    rpcUrls: ["https://maas-node.onchain.com/"],
    blockExplorerUrls: ["https://maas-explorer.onchain.com/"],
  },
  {
    chainId: "0x80",
    chainName: "huobi Network",
    nativeCurrency: {
      name: "HT",
      symbol: "HT",
      decimals: 18,
    },
    rpcUrls: ["https://http-mainnet-node.huobichain.com"],
    blockExplorerUrls: ["https://hecoinfo.com"],
  },
  {
    chainId: "0x539",
    chainName: "Local-Test-Network",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorerUrls: ["https://etherscan.io/"],
  },
];

/**
  * @name: handleCutZero
  * @description:  去掉double类型小数点后面多余的0
  参数：old 要处理的字符串或double
  返回值：newStr 没有多余零的小数或字符串
  * @param {*} num
  * @return {*}num
*/
function dealDecimals(num: any) {
  //拷贝一份 返回去掉零的新串
  let newstr = num;
  //循环变量 小数部分长度
  const leng = num.length - num.indexOf(".") - 1;
  //判断是否有效数
  if (num.indexOf(".") > -1) {
    //循环小数部分
    for (let i = leng; i > 0; i--) {
      //如果newstr末尾有0
      if (
        newstr.lastIndexOf("0") > -1 &&
        newstr.substr(newstr.length - 1, 1) == 0
      ) {
        const k = newstr.lastIndexOf("0");
        //如果小数点后只有一个0 去掉小数点
        if (newstr.charAt(k - 1) == ".") {
          return newstr.substring(0, k - 1);
        } else {
          //否则 去掉一个0
          newstr = newstr.substring(0, k);
        }
      } else {
        //如果末尾没有0
        return Number(newstr);
      }
    }
  }
  return Number(num);
}

// 错误处理
// 归集处理错误

/**
 * @description: rpc错误配置处理
 * @param {*} error
 * @return {*}
 */
//  export function handleRpcError(error: any) {
//   if (!error) {
//     console.error('other RpcError', 'local handleRpcError');
//     return;
//   }

//   if (error.data && error.data.message) {
//     Message.error(error.data.message);
//     return;
//   }

//   if (error.code === -32603) {
//     Message.error('Internal JSON-RPC error');
//     return;
//   }

//   if (error.code === 4001) {
//     Message.error('Transaction rejected!');
//     return;
//   }

//   if (error.message) {
//     Message.error(error.message);
//     return;
//   }
//   Message.error('Unexpected interruption of transaction');
// }
