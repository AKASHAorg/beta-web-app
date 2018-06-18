/// <reference types="bluebird" />
/// <reference types="node" />
import * as Promise from 'bluebird';
export declare const randomBytesAsync: (arg1: number) => Promise<Buffer>;
export declare class Auth {
    private _decipher;
    private _cipher;
    private _session;
    private _key;
    constructor(key?: string);
    regenSession(token: string): boolean;
    private _generateCipher(token);
    private _generateDecipher(token);
    login(acc: string, timer?: number, registering?: boolean): Promise<{
        token: string;
        expiration: Date;
        ethAddress: string;
    }>;
    logout(): void;
    isLogged(token: any): Promise<boolean>;
    private _flushSession();
    private _signSession(hash, account);
    signData(data: {}, token: string): Promise<any>;
    signMessage(data: {}, token: string): Promise<any>;
}
declare const _default: Auth;
export default _default;
