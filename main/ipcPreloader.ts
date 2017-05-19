import { Subject } from 'rxjs/Subject';

export class GenericApi {
    public channel: string;
    public channelName: string;

    constructor(channel: string, channelName?: string) {
        this.channel = channel;
        this.channelName = channelName;
    }

}

export class ApiListener extends GenericApi {
    public pipe: Subject<any>;
    public subscribers = new Map();
    constructor(channel: string, channelName?: string) {
        super(channel, channelName);
        this.pipe = new Subject();
    }

    public send(data: {}) {
        return this.pipe.next(data);
    }

    public on(listener) {
        this.subscribers.set(listener, this.pipe.subscribe(listener));
    }

    public once(listener) {
        let sub = this.pipe.subscribe((data) => {
            listener(data);
            sub.unsubscribe();
        });
    }

    public removeListener(listener) {
        this.subscribers.get(listener).unsubscribe();
        this.subscribers.delete(listener);
    }

    public removeAllListeners() {
        for(let listener of this.subscribers){
            this.removeListener(listener);
        }
        this.pipe.unsubscribe();
        this.subscribers.clear();
    }
    get listenerCount() {
        return this.subscribers.size;
    }
}

export class ApiRequest extends ApiListener {
    public manager: Subject<any>;
    constructor(channel: string, manager: Subject<any>, channelName?: string) {
        super(channel, channelName);
        this.manager = manager;
    }

    public enable() {
        this.manager.next({ channel: this.channel, listen: true });
    }

    public disable() {
        this.manager.next({ channel: this.channel, listen: false });
    }
}
