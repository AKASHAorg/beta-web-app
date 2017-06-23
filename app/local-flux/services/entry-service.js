import entriesDB from './db/entry';
import BaseService from './base-service';
import { channel } from 'services';

const PUBLISH = 'publish';
const EDIT_ENTRY = 'editEntry';

/**
 * Entry service
 * channels => ['publish', 'update', 'upvote', 'downvote', 'isOpenedToVotes', 'getVoteOf',
 *  'getVoteEndDate', 'getScore', 'getEntriesCount', 'getEntryOf', 'getEntry', 'getEntriesCreated',
 *  'getVotesEvent']
 * default open channels => ['getVoteEndDate', 'getScore', 'getEntry']
 */
class EntryService extends BaseService {
    constructor () {
        super();
        this.clientManager = channel.instance.client.entry.manager;
    }

    /**
     *  Publish a new entry
     *
     */
    publishEntry = ({ draftObj, token, gas, onError, onSuccess }) => {
        const channelName = draftObj.entryId ? EDIT_ENTRY : PUBLISH;
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry[channelName],
            clientChannel: channel.instance.client.entry[channelName],
            listenerCb: this.createListener(onError, onSuccess)
        }, () =>
            channel.instance.server.entry[channelName].send({
                entryId: draftObj.entryId,
                content: draftObj.content,
                tags: draftObj.tags,
                token,
                gas
            })
        );
    };

    getEntriesCount = ({ akashaId, onError, onSuccess }) => {
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry.getProfileEntriesCount,
            clientChannel: channel.instance.client.entry.getProfileEntriesCount,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => channel.instance.server.entry.getProfileEntriesCount.send({ akashaId }));
    };

    entryProfileIterator = ({ akashaId, start, limit, onSuccess, onError }) => {
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry.entryProfileIterator,
            clientChannel: channel.instance.client.entry.entryProfileIterator,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => channel.instance.server.entry.entryProfileIterator.send({ akashaId, start, limit }));
    }

    moreEntryProfileIterator = ({ akashaId, start, limit, onError = () => {}, onSuccess }) =>
        this.registerListener(
            channel.instance.client.entry.entryProfileIterator,
            this.createListener(onError, onSuccess),
            () => channel.instance.server.entry.entryProfileIterator.send({ akashaId, start, limit })
        );

    // get resource by id (drafts or entries);
    getById = ({ table, id, onSuccess, onError }) =>
        entriesDB[table]
            .where('id')
            .equals(parseInt(id, 10))
            .first()
            .then(entries => onSuccess(entries))
            .catch(reason => onError(reason));

    saveEntry = ({ akashaId, entry, onError, onSuccess }) =>
        entriesDB.savedEntries.where('akashaId').equals(akashaId)
            .toArray()
            .then((records) => {
                let result;
                if (!records.length) {
                    result = { akashaId, entries: [entry] };
                } else {
                    records[0].entries.push(entry);
                    result = { akashaId, entries: records[0].entries };
                }
                return entriesDB.savedEntries.put(result)
                    .then(() => onSuccess(entry))
                    .catch(reason => onError(reason));
            })
            .catch(reason => onError(reason));

    deleteEntry = ({ akashaId, entryId, onError, onSuccess }) =>
        entriesDB.savedEntries.where('akashaId').equals(akashaId)
            .toArray()
            .then((records) => {
                let result;
                if (!records.length) {
                    return;
                } else {
                    const entries = records[0].entries.filter(entry =>
                        entry.entryId !== entryId);
                    result = { akashaId, entries };
                }
                return entriesDB.savedEntries.put(result)
                    .then(() => onSuccess(entryId))
                    .catch(reason => onError(reason));
            })
            .catch(reason => onError(reason));

    getSavedEntries = ({ akashaId, onError = () => {}, onSuccess }) =>
        entriesDB.savedEntries.where('akashaId')
            .equals(akashaId)
            .first()
            .then(result => onSuccess(result ? result.entries : []))
            .catch(reason => onError(reason));

    getEntryList = ({ entries, onError = () => {}, onSuccess }) => {
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry.getEntryList,
            clientChannel: channel.instance.client.entry.getEntryList,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.entry.getEntryList.send(entries);
        });
    }

    moreEntryList = ({ entries, onError = () => {}, onSuccess }) => {
        this.registerListener(
            channel.instance.client.entry.getEntryList,
            this.createListener(onError, onSuccess),
            () => channel.instance.server.entry.getEntryList.send(entries)
        );
    }

    entryTagIterator = ({ tagName, start, limit, onError = () => {}, onSuccess }) => {
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry.entryTagIterator,
            clientChannel: channel.instance.client.entry.entryTagIterator,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.entry.entryTagIterator.send({ tagName, start, limit });
        });
    };

    moreEntryTagIterator = ({ tagName, start, limit, onError = () => {}, onSuccess }) =>
        this.registerListener(
            channel.instance.client.entry.entryTagIterator,
            this.createListener(onError, onSuccess),
            () => channel.instance.server.entry.entryTagIterator.send({ tagName, start, limit })
        );

    allStreamIterator = ({ limit, toBlock, onError = () => {}, onSuccess }) => {
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry.allStreamIterator,
            clientChannel: channel.instance.client.entry.allStreamIterator,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.entry.allStreamIterator.send({ limit, toBlock });
        });
    };

    getTagEntriesCount = ({
        tagName, onError = () => {
        }, onSuccess
    }) =>
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry.getTagEntriesCount,
            clientChannel: channel.instance.client.entry.getTagEntriesCount,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.entry.getTagEntriesCount.send({ tagName });
        });

    getLicences = ({ onSuccess, onError }) => {
        this.openChannel({
            clientManager: channel.instance.client.licenses.manager,
            serverChannel: channel.instance.server.licenses.getLicenses,
            clientChannel: channel.instance.client.licenses.getLicenses,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.licenses.getLicenses.send();
        });
    };

    getLicencesById = ({ id, onSuccess, onError }) => {
        this.registerListener(
            channel.instance.client.licenses.getLicenceById,
            this.createListener(onError, onSuccess),
            () => channel.instance.server.licenses.getLicenceById({ id })
        );
    };

    getEntriesStream = ({
        akashaId, onError = () => {
        }, onSuccess
    }) => {
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry.getEntriesStream,
            clientChannel: channel.instance.client.entry.getEntriesStream,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.entry.getEntriesStream.send({ akashaId });
        });
    }

    voteCost = ({ weight, onError = () => {}, onSuccess }) =>
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry.voteCost,
            clientChannel: channel.instance.client.entry.voteCost,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.entry.voteCost.send({ weight });
        });

    upvote = ({ token, entryId, extra, weight, value, gas = 2000000, onError = () => {}, onSuccess }) =>
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry.upvote,
            clientChannel: channel.instance.client.entry.upvote,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.entry.upvote.send({ token, entryId, extra, weight, value, gas });
        });


    downvote = ({ token, entryId, extra, weight, value, gas = 2000000, onError = () => {}, onSuccess }) =>
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry.downvote,
            clientChannel: channel.instance.client.entry.downvote,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.entry.downvote.send({ token, entryId, extra, weight, value, gas });
        });

    getEntry = ({ entryId, full = false, version = null , onError = () => {}, onSuccess }) => {
        this.registerListener(
            channel.instance.client.entry.getEntry,
            this.createListener(onError, onSuccess)
        );
        channel.instance.server.entry.getEntry.send({ entryId, full, version });
    };

    getScore = ({ entryId, onError = () => {}, onSuccess }) => {
        this.registerListener(
            channel.instance.client.entry.getScore,
            this.createListener(onError, onSuccess)
        );
        channel.instance.server.entry.getScore.send({ entryId });
    };

    isActive = ({ entryId, onError = () => {}, onSuccess }) =>
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry.isActive,
            clientChannel: channel.instance.client.entry.isActive,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.entry.isActive.send({ entryId });
        });

    getVoteOf = ({ akashaId, entryId, onError = () => {}, onSuccess }) => {
        if (this._openChannels.has(channel.instance.server.entry.getVoteOf.channel)) {
            return channel.instance.server.entry.getVoteOf.send({ akashaId, entryId });
        }
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry.getVoteOf,
            clientChannel: channel.instance.client.entry.getVoteOf,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.entry.getVoteOf.send({ akashaId, entryId });
        });
    };

    canClaim = ({ entryId, onError, onSuccess }) => {
        if (this._openChannels.has(channel.instance.server.entry.canClaim.channel)) {
            return channel.instance.server.entry.canClaim.send({ entryId });
        }
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry.canClaim,
            clientChannel: channel.instance.client.entry.canClaim,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.entry.canClaim.send({ entryId });
        });
    };

    getEntryBalance = ({ entryId, onError, onSuccess }) => {
        if (this._openChannels.has(channel.instance.server.entry.getEntryBalance.channel)) {
            return channel.instance.server.entry.getEntryBalance.send({ entryId });
        }
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry.getEntryBalance,
            clientChannel: channel.instance.client.entry.getEntryBalance,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.entry.getEntryBalance.send({ entryId });
        });
    };

    claim = ({ entryId, token, gas, onError, onSuccess }) =>
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry.claim,
            clientChannel: channel.instance.client.entry.claim,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.entry.claim.send({ entryId, token, gas });
        });

    pinEntry = ({ operation, entryId, onError = () => {}, onSuccess = () => {} }) =>
        this.openChannel({
            clientManager: this.clientManager,
            serverChannel: channel.instance.server.entry.pin,
            clientChannel: channel.instance.client.entry.pin,
            listenerCb: this.createListener(onError, onSuccess)
        }, () => {
            channel.instance.server.entry.pin.send({ id: entryId, type: 2, operation });
        });
}

export { EntryService };
