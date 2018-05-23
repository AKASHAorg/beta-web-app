import { web3Api } from '../../services';
import resolveEthAddress from './resolve-ethaddress';

const execute = () => resolveEthAddress.execute(
    { ethAddress: web3Api.instance.eth.defaultAccount }
);
const exported: any = { execute, name: 'getCurrentProfile' };
export default exported;
