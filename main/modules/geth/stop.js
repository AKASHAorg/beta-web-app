import * as Promise from 'bluebird';
import { web3Api } from '../../services';
import { gethStatus } from '../../event/responses';
const execute = Promise.coroutine(function* () {
    if (web3Api.instance) {
        web3Api.instance.reset();
    }
    gethStatus.process = false;
    gethStatus.api = false;
    gethStatus.version = '';
    return { stopped: true };
});
export default { execute, name: 'stopService' };
//# sourceMappingURL=stop.js.map