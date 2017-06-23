import * as Promise from 'bluebird';
const execute = Promise.coroutine(function* (data) {
    return true;
});
export default { execute, name: 'generateEthKey' };
//# sourceMappingURL=generate-key.js.map