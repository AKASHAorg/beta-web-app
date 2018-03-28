import * as Promise from 'bluebird';
import IpfsConnector from '@akashaproject/ipfs-js-connector';

const execute = Promise.coroutine(function*() {
    IpfsConnector.getInstance().stop();
    yield Promise.delay(50);
    return { stopped: true };
});

export default { execute, name: 'stopService' };