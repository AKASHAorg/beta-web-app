import * as Promise from 'bluebird';
import Auth from './Auth';
const execute = Promise.coroutine(function* (data) {
    const session = Auth.regenSession(data.token);
    return { session };
});
export default { execute, name: 'regenSession' };
//# sourceMappingURL=regen-session.js.map