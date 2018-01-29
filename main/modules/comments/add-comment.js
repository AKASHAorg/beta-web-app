"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ipfs_1 = require("./ipfs");
const helpers_1 = require("../ipfs/helpers");
const Promise = require("bluebird");
const index_1 = require("../../contracts/index");
const jsonschema_1 = require("../utils/jsonschema");
const comment = {
    'id': '/comment',
    'type': 'object',
    'properties': {
        'ethAddress': { 'type': 'string', 'format': 'address' },
        'parent': { 'type': 'string' },
        'entryId': { 'type': 'string' },
        'token': { 'type': 'string' }
    },
    'required': ['ethAddress', 'entryId', 'token']
};
const execute = Promise.coroutine(function* (data, cb) {
    const v = new jsonschema_1.default.Validator();
    v.validate(data, comment, { throwError: true });
    const ipfsHash = yield ipfs_1.create(data.content);
    const decodedHash = helpers_1.decodeHash(ipfsHash);
    const replyTo = data.parent || '0';
    const txData = index_1.default.instance
        .Comments.publish.request(data.entryId, data.ethAddress, replyTo, ...decodedHash, { gas: 250000 });
    const transaction = yield index_1.default.send(txData, data.token, cb);
    return { tx: transaction.tx, receipt: transaction.receipt };
});
exports.default = { execute, name: 'comment', hasStream: true };
//# sourceMappingURL=add-comment.js.map