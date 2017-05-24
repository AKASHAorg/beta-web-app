import Profile from './Profile';
import Registry from './Registry';
import Tags from './Tags';
import Feed from './Feed';
import Faucet from './Faucet';
import Entries from './Entries';
import Comments from './Comments';
import Subs from './Subs';
import Votes from './Votes';
import RegistryStore from './RegistryStore';
import contracts from '@akashaproject/contracts.js';

class Contracts {
    public instance: any;

    /**
     * Boostrap web3 contracts
     * @param web3
     * @returns {any}
     */
    public init(web3: any) {
        const factory = new contracts.Class(web3);
        const registry = new Registry(factory.objects.registry, web3);
        const registryStore = new RegistryStore(factory.objects.registry_store, web3);
        const profile = new Profile(factory.classes.Profile, web3);
        const tags = new Tags(factory.objects.tags, web3);
        const feed = new Feed(factory.objects.feed, web3);
        const subs = new Subs(factory.objects.subs, web3);
        const faucet = new Faucet(factory.objects.faucet, web3);
        const entries = new Entries(factory.objects.entries, web3);
        const comments = new Comments(factory.objects.comments, web3);
        const votes = new Votes(factory.objects.votes, web3);
        this.instance = { profile, registry, registryStore, tags, feed, faucet, entries, comments, subs, votes };
        return this.instance;
    }
}

export default new Contracts();
