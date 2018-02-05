import * as Promise from 'bluebird';
import Auth from './Auth';
import schema from '../utils/jsonschema';
const login = {
    'id': '/loginWeb',
    'type': 'object',
    'properties': {
        'ethAddress': { 'type': 'string', 'format': 'address' },
        'rememberTime': { 'type': 'number' }
    },
    'required': ['ethAddress']
};
const execute = Promise.coroutine(function* (data) {
    const v = new schema.Validator();
    console.log(data, v.validate(data, login).valid);
    v.validate(data, login, { throwError: true });
    return Auth.login(data.ethAddress, data.rememberTime);
});
export default { execute, name: 'login' };
//# sourceMappingURL=login.js.map