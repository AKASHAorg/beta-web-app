import * as Promise from 'bluebird';
import { post as POST } from 'request';
import { FAUCET_TOKEN, FAUCET_URL } from '../../config/settings';

const execute = Promise.coroutine(function*(data: RequestEtherRequest) {
    return Promise.fromCallback(function (cb) {
        return POST({
            url: FAUCET_URL,
            json: { address: data.address, token: FAUCET_TOKEN },
            agentOptions: { rejectUnauthorized: false }
        }, cb);
    }, { multiArgs: true }).spread(function (response, body) {
        return body;
    });
});

export default { execute, name: 'requestEther' };
