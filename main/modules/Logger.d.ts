/// <reference types="loglevel" />
import * as logger from 'loglevel';
declare class AppLogger {
    loggers: Object;
    constructor(enforcer: Symbol);
    static getInstance(): any;
    init(): Promise<void>;
    getLogger(name: string): logger.Logger;
}
export default AppLogger;
