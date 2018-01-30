import * as logger from 'loglevel';

const symbolEnforcer = Symbol();
const symbol = Symbol();

class AppLogger {
    public loggers: Object;

    /**
     *
     * @param enforcer
     */
    constructor(enforcer: Symbol) {
        if (enforcer !== symbolEnforcer) {
            throw new Error('Cannot construct singleton');
        }
        this.loggers = {};
    }

    /**
     *
     * @returns {*}
     */
    static getInstance() {
        if (!this[symbol]) {
            this[symbol] = new AppLogger(symbolEnforcer);
        }
        return this[symbol];
    }

    public init() {
        return Promise.resolve();
    }

    getLogger(name: string) {
        return logger.getLogger(name);
    }
}

export default AppLogger;
