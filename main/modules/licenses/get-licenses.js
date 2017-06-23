import { LicencesList } from '../models/Licenses';
import * as Promise from 'bluebird';
const execute = Promise.coroutine(function* () {
    return { licenses: LicencesList };
});
export default { execute, name: 'getLicenses' };
//# sourceMappingURL=get-licenses.js.map