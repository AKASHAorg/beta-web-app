import { ipfsProvider, regenWeb3, web3Api } from './services';

const registerWithExecution = function (nextExecution) {
  window.addEventListener('load', async () => {
    let web3Local;

    ipfsProvider.instance = {};
    if (window.hasOwnProperty('ethereum')) {
      web3Local = regenWeb3(window['ethereum']);
      try {
        await (window['ethereum']).enable();
        web3Local.eth.getAccounts((err, accList) => {
          if (err) {
            throw err;
          }
          web3Api.instance = web3Local;
          web3Api.instance.eth.defaultAccount = accList[0];
          nextExecution(web3Local, !!accList.length);
        });
      } catch (e) {
        nextExecution(web3Local, false);
      }

    } else {
      nextExecution(false, false);
    }
  });
};

export default registerWithExecution;
