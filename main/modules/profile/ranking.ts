import * as Promise from 'bluebird';
import schema from '../utils/jsonschema';
import contracts from '../../contracts/index';
import { web3Api } from '../../services';

export const karmaRanking = {
    'id': '/karmaRanking',
    'type': 'object',
    'properties': {
        'following': {
            'type': 'array',
            'items': {
                'type': 'string'
            },
            'uniqueItems': true,
            'minItems': 1
        }
    },
    'required': ['following']
};


const execute = Promise.coroutine(function* (data: { following: string[] }) {
    const v = new schema.Validator();
    v.validate(data, karmaRanking, { throwError: true });

    if (!data.following) {
        return {};
    }
    const collection = [];
    data.following.push(web3Api.instance.eth.defaultAccount);
    for (let i = 0; i < data.following.length; i++) {
        const [karma, ] = yield contracts.instance.Essence.getCollected(data.following[i]);
        collection.push({ethAddress: data.following[i], karma: (web3Api.instance.fromWei(karma)).toNumber()});
    }

    collection.sort((first, second) => {
       return second.karma - first.karma;
    });

    const rankedCollection = collection.map((v, i) => {
       return Object.assign({}, v, { rank: i });
    });

    const myRanking = collection.findIndex((profile) => {
      return profile.ethAddress === web3Api.instance.eth.defaultAccount;
    });

    return { collection: rankedCollection, myRanking };
});

export default { execute, name: 'karmaRanking'};
