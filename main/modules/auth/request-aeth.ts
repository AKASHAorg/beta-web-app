import * as Promise from 'bluebird';
import {post as POST} from 'superagent';
import {FAUCET_TOKEN, FAUCET_URL} from '../../config/settings';
import {Contracts} from '../../contracts/index';

const execute = Promise.coroutine(function*(data: RequestEtherRequest, cb) {
    const response = yield Promise.fromCallback(function (cb1) {
        return POST(FAUCET_URL)
            .set('Content-Type', 'application/json')
            .send({ address: data.address, token: FAUCET_TOKEN })
            .end(cb1);
    }).then((body) => {
        if (body.ok && body.text) {
            return JSON.parse(body.text);
        }
        return body;
    });

    if (!response.tx) {
        throw new Error('The request could not be completed.');
    }

    Contracts.watchTx(response.tx)
        .then(success => cb('', success)).catch(err => cb(err));
    return response;

});

export default { execute, name: 'requestEther', hasStream: true };
