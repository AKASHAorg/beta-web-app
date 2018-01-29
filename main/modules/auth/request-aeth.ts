import * as Promise from 'bluebird';
import { post as POST } from 'superagent';
import { FAUCET_TOKEN, FAUCET_URL } from '../../config/settings';

const execute = Promise.coroutine(function*(data: RequestEtherRequest, cb) {
    return Promise.fromCallback(function (cb1) {
        return POST(FAUCET_URL)
            .set('Content-Type', 'application/json')
            .send({ address: data.address, token: FAUCET_TOKEN })
            .end(cb1);
    }).then((body) => {
        if (body.ok && body.text) {
            cb('testing faucet');
            return JSON.parse(body.text);
        }
        return body;
    });
});

export default { execute, name: 'requestEther', hasStream: true };
