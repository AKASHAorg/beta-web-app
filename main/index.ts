import IpfsConnector from '@akashaproject/ipfs-js-connector';
import { bootstrap } from '../app/index';
import initModules from './init-modules';
import { ipfsApi } from './services';
import web3Helper from './modules/helpers/web3-helper';
import getChannels from './channels';
import contracts from './contracts';
import { DEFAULT_IPFS_CONFIG } from './config/settings';
import registerWeb3Provider from './register-web3-provider';


const startApp = (web3, vault) => {
  if (!web3) {
    return bootstrap(false, false);
  }

  ipfsApi.instance = IpfsConnector.getInstance();
  console.time('bootstrap');
  IpfsConnector.getInstance().setOption('config', DEFAULT_IPFS_CONFIG);
  IpfsConnector.getInstance().setOption('repo', 'ipfs#akasha-beta');
  initModules();
  // for dev only
  Object.defineProperty(window, 'ipfs', { value: IpfsConnector });
  Object.defineProperty(window, 'Channel', { value: getChannels() });
  Object.defineProperty(window, 'contracts', { value: contracts });
  // end

  web3Helper.setChannel(getChannels().client.tx.emitMined);
  console.timeEnd('bootstrap');
  bootstrap(true, vault);
};

// start the app
registerWeb3Provider(startApp);