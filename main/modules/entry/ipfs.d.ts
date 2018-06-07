import * as Promise from 'bluebird';
export declare const DRAFT_BLOCKS = "blocks";
export declare const ATOMIC_TYPE = "atomic";
export declare const IMAGE_TYPE = "image";
export declare const max_size: number;
export declare const EXCERPT = "excerpt";
export declare const FEATURED_IMAGE = "featuredImage";
export declare const CARD_INFO = "cardInfo";
export declare const DRAFT_PART = "draft-part";
export declare const PREVIOUS_VERSION = "previous-version";
declare class IpfsEntry {
    id: string;
    draft: any;
    title: string;
    licence: string;
    tags: any[];
    wordCount: number;
    entryLinks: any[];
    create(content: any, tags: any[], entryType: number, previous?: {
        hash: string;
        version: number;
    }): Promise<any>;
    edit(content: any, tags: any[], entryType: number, previousHash: any): any;
    private _filterForImages;
    private _normalizeImage;
    private _uploadMediaDraft;
}
export declare const getShortContent: (a1: any) => Promise<{}>;
export declare const getFullContent: (a1: string, a2: any) => Promise<{}>;
export default IpfsEntry;
