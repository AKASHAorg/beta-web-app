import * as Promise from 'bluebird';
import IpfsConnector from '@akashaproject/ipfs-js-connector';
const execute = Promise.coroutine(function* (data) {
    return IpfsConnector.getInstance().setPorts(data.ports, data.restart);
});
export default { execute, name: 'setPorts' };
//# sourceMappingURL=set-ports.js.map