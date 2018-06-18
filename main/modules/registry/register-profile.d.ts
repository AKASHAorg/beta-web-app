import * as Promise from 'bluebird';
export declare const registerProfile: {
    'id': string;
    'type': string;
    'properties': {
        'akashaId': {
            'type': string;
            'minLength': number;
        };
        'ethAddress': {
            'type': string;
            'format': string;
        };
        'donationsEnabled': {
            'type': string;
        };
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
    execute: (a1: ProfileCreateRequest, a2: any) => Promise<{}>;
    name: string;
    hasStream: boolean;
};
export default _default;
