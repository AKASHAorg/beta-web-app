import * as Promise from 'bluebird';
export declare const filter: {
    _address: {};
    _blockNr: number;
    _currentAddress: string;
    setBlockNr: (bNr: number) => void;
    setAddress: (addresses: any) => void;
    hasAddress: (qAddress: any) => any;
    getBlockNr: () => any;
    setMyAddress: (address: any) => void;
    getMyAddress: () => any;
    removeAddress: (rAddress: any) => void;
    appendAddress: (aAddress: any) => void;
};
declare const _default: {
    execute: (a1: {
        profiles: string[];
        exclude?: string[];
        blockNr?: number;
    }) => Promise<{}>;
    name: string;
};
export default _default;
