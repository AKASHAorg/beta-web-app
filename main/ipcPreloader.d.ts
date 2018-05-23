import { Subject } from 'rxjs/Subject';
export declare class GenericApi {
    channel: string;
    channelName: string;
    constructor(channel: string, channelName?: string);
}
export declare class ApiListener extends GenericApi {
    pipe: Subject<any>;
    subscribers: Map<any, any>;
    constructor(channel: string, channelName?: string);
    send(data: {}): void;
    on(listener: any): void;
    once(listener: any): void;
    removeListener(listener: any): void;
    removeAllListeners(): void;
    readonly listenerCount: number;
}
export declare class ApiRequest extends ApiListener {
    private listener;
    constructor(channel: string, channelName?: string);
    enable(): {
        listening: boolean;
    };
    disable(): {
        listening: boolean;
    };
    registerListener(listener: (data) => {}): void;
}
