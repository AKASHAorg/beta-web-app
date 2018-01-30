import * as Promise from 'bluebird';

const execute = Promise.coroutine(function* (data: { mention: string[], entryId: string, commentId?: string }) {
        throw new Error('Not implemented');
    });

export default { execute, name: 'mention' };
