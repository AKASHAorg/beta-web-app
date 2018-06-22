/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const imageSize: {
    'id': string;
    'type': string;
    'properties': {
        'src': {
            'type': string;
        };
        'width': {
            'type': string;
        };
        'height': {
            'type': string;
        };
    };
    'required': string[];
};
export declare const ProfileSchema: {
    AVATAR: string;
    LINKS: string;
    ABOUT: string;
    BACKGROUND_IMAGE: string;
};
export declare const create: (a1: IpfsProfileCreateRequest) => Promise<{}>;
export declare const getShortProfile: (a1: string, a2: boolean) => Promise<{}>;
export declare const resolveProfile: (a1: string, a2: boolean) => Promise<{}>;
