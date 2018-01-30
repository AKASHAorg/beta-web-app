import * as Promise from 'bluebird';

const execute = Promise.coroutine(function* () {
    return Promise.resolve({ done: true });
});

export default { execute, name: 'checkUpdate' };
