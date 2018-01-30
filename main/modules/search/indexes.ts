import Storage from './Storage';

export const dbs = {
    entry: {
        path: 'akasha#beta/entry-index',
        additional: {
            fieldOptions: {
                excerpt: {
                    searchable: true,
                    preserveCase: false
                },
                title: {
                    searchable: true,
                    preserveCase: false
                }
            }
        },
        searchIndex: null
    },
    tags: {
        path: 'akasha#beta/tags-index',
        searchIndex: null,
        additional: {}
    },
    profiles: {
        path: 'akasha#beta/profileID-index',
        searchIndex: null,
        additional: {}
    }
};

export default function init() {
    const waitFor = Object.keys(dbs).map((index) => {
        return new Storage(dbs[index].path, dbs[index].additional).init().then(si => dbs[index].searchIndex = si);
    });
    return Promise.all(waitFor);
}
