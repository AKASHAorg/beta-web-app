import resolveEthAddress from './resolve-ethaddress';
import { web3Api } from '../../services';
const execute = () => resolveEthAddress.execute(
    { ethAddress: web3Api.instance.eth.defaultAccount }
);
export default { execute, name: 'getCurrentProfile' };
