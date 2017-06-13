import * as Promise from 'bluebird';
import IpfsConnector from '@akashaproject/ipfs-js-connector';
import createImage from '../helpers/create-image';

const execute = Promise.coroutine(function*(data: string[]) {
    const requests = data.map((hash) => {
        return IpfsConnector.getInstance().api.getFile(hash).then((uintData) => {
            return { data: uintData, hash };
        });
    });
    const collection = yield Promise.all(requests);
    const response = collection.map((record) => {
        return { [record.hash]: createImage(record.data) };
    });
    return { collection: response };
});

export default { execute, name: 'createImage' };