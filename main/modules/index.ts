import AuthIPC from './AuthIPC';
import IpfsIPC from './IpfsIPC';
import RegistryIPC from './RegistryIPC';
import UtilsIPC from './UtilsIPC';

export default [
    new AuthIPC(),
    new IpfsIPC(),
    new RegistryIPC(),
    new UtilsIPC()
];