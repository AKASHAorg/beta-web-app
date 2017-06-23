import * as Promise from 'bluebird';
import contracts from '../../contracts/index';
const execute = Promise.coroutine(function* (data) {
    const active = yield contracts.instance.entries.isMutable(data.entryId);
    return { active: active, entryId: data.entryId };
});
export default { execute, name: 'isActive' };
//# sourceMappingURL=entry-is-active.js.map