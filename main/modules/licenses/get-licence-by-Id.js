import { getLicence } from '../models/Licenses';
import * as Promise from 'bluebird';
const execute = Promise.coroutine(function* (data) {
    return { license: getLicence(data.id) };
});
export default { execute, name: 'getLicenceById' };
//# sourceMappingURL=get-licence-by-Id.js.map