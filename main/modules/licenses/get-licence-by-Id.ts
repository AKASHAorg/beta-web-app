import { getLicence } from '../models/Licenses';
import * as Promise from 'bluebird';

const execute = Promise.coroutine(function*(data: { id: string | number }) {
    return { license: getLicence(data.id) };
});

export default { execute, name: 'getLicenceById' };