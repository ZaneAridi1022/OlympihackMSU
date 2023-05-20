import {FileUploadHandler, FileIo, WalletHandler, StorageHandler, RnsHandler, FolderHandler ,} from 'jackal.js';

async function connectJackalandUpload(_file: any){
    let walletConfig ={
        signerChain: 'lupulella-2',
        enabledChains: ['lupulella-2'],
        queryAddr: 'https://testnet-grpc.jackalprotocol.com/',
        txAddr: 'https://testnet-rpc.jackalprotocol.com/',
        chainConfig: {
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
          },
          selectedWallet: 'keplr'
      }
    const wallet = await WalletHandler.trackWallet(walletConfig);

    console.log(wallet);

    const rns = await RnsHandler.trackRns(wallet)

    const storage = await StorageHandler.trackStorage(wallet)

    const fileIo = await FileIo.trackIo(wallet)

    const path = await fileIo.verifyFoldersExist(['kyc']);

    const folder = await fileIo.downloadFolder('s/kyc');

    let sourcesData = 
    {
      data: null
    }
    let sources = 
    {
        myUpload1: _file
    }

    let tracker = {
        complete: 0,
        timer: 0,
      }

    await fileIo.staggeredUploadFiles(sources, folder, tracker)

}


// const verifyJackalUpload = async () => {
//     const read = 
// }


// //Read encryped file tree entry 
// //readcompressedfiletree

export {connectJackalandUpload};
