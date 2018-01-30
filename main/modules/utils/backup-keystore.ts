import * as Promise from 'bluebird';

const execute = Promise.coroutine(function* (data: { target?: string }) {
    throw new Error('This method is unavailable.');
});

export default { execute, name: 'backupKeys' };
