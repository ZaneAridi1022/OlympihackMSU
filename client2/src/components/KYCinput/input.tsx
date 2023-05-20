import { FileUploadHandler, FileIo, WalletHandler, StorageHandler, RnsHandler, FolderHandler, IWalletHandler } from 'jackal.js';


async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function connectWallet() {
  const chainConfig =
  {
    chainId: 'jackal-1',
    chainName: 'Jackal Mainnet',
    rpc: 'https://rpc.jackalprotocol.com',
    rest: 'https://api.jackalprotocol.com',
    bip44: {
      coinType: 118
    },
    coinType: 118,
    stakeCurrency: {
      coinDenom: 'JKL',
      coinMinimalDenom: 'ujkl',
      coinDecimals: 6
    },
    bech32Config: {
      bech32PrefixAccAddr: 'jkl',
      bech32PrefixAccPub: 'jklpub',
      bech32PrefixValAddr: 'jklvaloper',
      bech32PrefixValPub: 'jklvaloperpub',
      bech32PrefixConsAddr: 'jklvalcons',
      bech32PrefixConsPub: 'jklvalconspub'
    },
    currencies: [
      {
        coinDenom: 'JKL',
        coinMinimalDenom: 'ujkl',
        coinDecimals: 6
      }
    ],
    feeCurrencies: [
      {
        coinDenom: 'JKL',
        coinMinimalDenom: 'ujkl',
        coinDecimals: 6,
        gasPriceStep: {
          low: 0.002,
          average: 0.002,
          high: 0.02
        }
      }
    ],
    features: []
  }

  const walletConfig =
  {
    selectedWallet: 'keplr',
    signerChain: 'jackal-1',
    enabledChains: ['jackal-1'],
    queryAddr: 'https://grpc.jackalprotocol.com',
    txAddr: 'https://rpc.jackalprotocol.com',
    chainConfig: chainConfig
  }

  const wallet = await WalletHandler.trackWallet(walletConfig)

  console.log("Wallet:", wallet);

  return wallet;
}


// {
//   data: null | IFileConfigRaw
//   exists: boolean
//   handler: IFileUploadHandler
//   key: string
//   uploadable: File
// }




async function connectJackalandUpload(wallet:IWalletHandler, _file: any) {

  const rns = await RnsHandler.trackRns(wallet)

  const storage = await StorageHandler.trackStorage(wallet)

  const fileIo = await FileIo.trackIo(wallet, '1.0')


  console.log(await fileIo.verifyFoldersExist(["kyc"]));

  delay(1000);

  const folder = await fileIo.downloadFolder("s/kyc");
  console.log("Folder", folder);

  const sourcesData =
  {
    data: null
  }
  const file = await FileUploadHandler.trackFile(_file, "s/kyc")
  const uploadList: any = {}
  
  uploadList["KYC"] = {
    data: null,
    exists: false,
    handler: file,
    key: "KYC",
    uploadable: await file.getForUpload()
  }

  const tracker = {
    complete: 0,
    timer: 0,
  }

  await fileIo.staggeredUploadFiles(uploadList, folder, tracker)
}


const checkFolder = async (wallet:IWalletHandler, folderName: string) => {
  const fileIo = await FileIo.trackIo(wallet, '1.0')
  const folder = await fileIo.downloadFolder(folderName);
  console.log("Folder", folder);
  return folder;
}

export { connectJackalandUpload,connectWallet, checkFolder};
