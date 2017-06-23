import * as Promise from 'bluebird';
import Auth from './Auth';
const execute = Promise.coroutine(function* (data) {
    return Auth.login(data.account, data.rememberTime, data.registering);
});
export default { execute, name: 'login' };
//# sourceMappingURL=login.js.map