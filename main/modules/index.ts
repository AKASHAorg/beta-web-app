import AuthIPC from './AuthIPC';
import IpfsIPC from './IpfsIPC';
import UtilsIPC from './UtilsIPC';

export default [
    new AuthIPC(),
    new IpfsIPC(),
    new UtilsIPC()
];