import getChannels from '../channels';
import { mainResponse } from './responses';
import { registerChannel } from '../channels';
export default class ModuleEmitter {
    _manager() {
        this.DEFAULT_MANAGED.forEach((action) => {
            getChannels().server[this.MODULE_NAME][action].enable();
        });
    }
    generateStreamListener(method) {
        return (data) => {
            let response;
            return method
                .execute(data, (er, ev) => {
                if (er) {
                    response = mainResponse({ error: { message: er } }, data);
                }
                else {
                    response = mainResponse(ev, data);
                }
                getChannels().client[this.MODULE_NAME][method.name].send(response);
            })
                .then((result) => {
                response = mainResponse(result, data);
            })
                .catch((err) => {
                response = mainResponse({ error: { message: err.message } }, data);
            })
                .finally(() => {
                getChannels().client[this.MODULE_NAME][method.name].send(response);
                response = null;
            });
        };
    }
    generateListener(method) {
        return (data) => {
            let response;
            return method
                .execute(data)
                .then((result) => {
                response = mainResponse(result, data);
            })
                .catch((err) => {
                console.log(err);
                response = mainResponse({ error: { message: err.message } }, data);
            })
                .finally(() => {
                getChannels().client[this.MODULE_NAME][method.name].send(response);
                response = null;
            });
        };
    }
    _initMethods(methods) {
        methods.forEach((method) => {
            registerChannel(this.MODULE_NAME, method.name);
            getChannels().server[this.MODULE_NAME][method.name].registerListener(method.hasStream ? this.generateStreamListener(method) : this.generateListener(method));
        });
    }
}
//# sourceMappingURL=ModuleEmitter.js.map