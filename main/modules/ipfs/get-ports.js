import * as Promise from 'bluebird';
import IpfsConnector from '@akashaproject/ipfs-js-connector';
const execute = Promise.coroutine(function* () {
    const ports = yield IpfsConnector.getInstance().getPorts();
    return {
        apiPort: ports.api,
        gatewayPort: ports.gateway,
        swarmPort: ports.swarm
    };
});
export default { execute, name: 'getPorts' };
//# sourceMappingURL=get-ports.js.map