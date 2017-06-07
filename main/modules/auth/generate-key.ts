import * as Promise from 'bluebird';
// import Auth from './Auth';

// this functionality is delegated to Metamask as exposing personal module over rpc is not safe
const execute = Promise.coroutine(function*(data: AuthKeygenRequest) {
    // const address = yield Auth.generateKey(data.password);
    // return { address };
    return true;
});

export default { execute, name: 'generateEthKey' };