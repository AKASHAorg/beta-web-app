/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare const updateProfileData: {
    'id': string;
    'type': string;
    'properties': {
        'ipfs': {
            'type': string;
            'properties': {
                'firstName': {
                    'type': string;
                };
                'lastName': {
                    'type': string;
                };
                'avatar': {
                    'type': string;
                };
                'backgroundImage': {
                    'type': string;
                };
                'about': {
                    'type': string;
                };
                'links': {
                    'type': string;
                    'items': {
                        'type': string;
                        'properties': {
                            'title': {
                                'type': string;
                            };
                            'url': {
                                'type': string;
                            };
                            'type': {
                                'type': string;
                            };
                            'id': {
                                'type': string;
                            };
                        };
                        'required': string[];
                    };
                };
            };
        };
        'token': {
            'type': string;
        };
    };
    'required': string[];
};
declare const _default: {
    execute: (a1: ProfileUpdateRequest, a2: any) => Promise<{}>;
    name: string;
    hasStream: boolean;
};
export default _default;
