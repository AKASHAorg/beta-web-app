export default class ModuleEmitter {
    protected MODULE_NAME: string;
    protected DEFAULT_MANAGED: string[];
    protected _manager(): void;
    generateStreamListener(method: any): (data: any) => any;
    generateListener(method: any): (data: any) => any;
    protected _initMethods(methods: any): void;
}
