import * as Promise from 'bluebird';
import web3Helper from '../helpers/web3-helper';
import schema from '../utils/jsonschema';

const emitMined = {
    'id': '/emitMined',
    'type': 'object',
    'properties': {
        'watch': { 'type': 'bool' }
    },
    'required': ['watch']

};

const execute = Promise.coroutine(function* (data: EmitMinedRequest) {
    const v = new schema.Validator();
    v.validate(data, emitMined, { throwError: true });

    (data.watch) ? web3Helper.startTxWatch() : web3Helper.stopTxWatch();
    return { watching: web3Helper.watching };
});

export default { execute, name: 'emitMined' };
