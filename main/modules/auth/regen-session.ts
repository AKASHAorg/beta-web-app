import * as Promise from 'bluebird';
import Auth from './Auth';

const execute = Promise.coroutine(function*(data: { token: string }) {
    const session = Auth.regenSession(data.token);
    return { session };
});

export default { execute, name: 'regenSession' };