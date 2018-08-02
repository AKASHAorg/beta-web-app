export declare const dbs: {
    entry: {
        path: string;
        additional: {
            fieldOptions: {
                excerpt: {
                    searchable: boolean;
                    preserveCase: boolean;
                };
                title: {
                    searchable: boolean;
                    preserveCase: boolean;
                };
            };
        };
        searchIndex: any;
    };
    tags: {
        path: string;
        searchIndex: any;
        additional: {};
    };
    profiles: {
        path: string;
        searchIndex: any;
        additional: {};
    };
};
export default function init(): Promise<{}[]>;
