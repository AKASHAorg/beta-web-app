import getChannels from '../channels';
import { mainResponse } from './responses';

export default class ModuleEmitter {
    protected MODULE_NAME: string;
    protected DEFAULT_MANAGED: string[];

    /**
     *
     * @private
     */
    protected _manager() {
        this.DEFAULT_MANAGED.forEach(
            (action: string) => {
                getChannels().server[this.MODULE_NAME][action].enable();
                console.info('Listening on', this.MODULE_NAME, action);
            }
        );
    }

    public generateStreamListener(method) {
        return (data: any) => {
            let response: any;
            // console.time(method.name);
            method
                .execute(data, (er, ev) => {
                    if (er) {
                        response = mainResponse({ error: { message: er } }, data);
                    } else {
                        response = mainResponse(ev, data);
                    }
                    getChannels().client[this.MODULE_NAME][method.name].send(response);
                })
                .then((result: any) => {
                    response = mainResponse(result, data);
                })
                .catch((err: Error) => {
                    response = mainResponse({ error: { message: err.message } }, data);
                })
                .finally(() => {
                    getChannels().client[this.MODULE_NAME][method.name].send(response);
                    // console.timeEnd(method.name);
                    response = null;
                });
        };
    }

    public generateListener(method) {
        return (data: any) => {
            let response: any;
            // const stamp = method.name + ' ' + (new Date()).getTime();
            // console.time(stamp);
            method
                .execute(data)
                .then((result: any) => {
                    response = mainResponse(result, data);
                })
                .catch((err: Error) => {
                console.log(err);
                    response = mainResponse({ error: { message: err.message } }, data);
                })
                .finally(() => {
                    getChannels().client[this.MODULE_NAME][method.name].send(response);
                    // console.timeEnd(stamp);
                    response = null;
                });
        };
    }

    protected _initMethods(methods) {
        methods.forEach((method) => {
                getChannels().server[this.MODULE_NAME][method.name].registerListener(
                    method.hasStream ? this.generateStreamListener(method) : this.generateListener(method)
                );
        });
    }
}
