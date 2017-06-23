import * as Promise from 'bluebird';
import start from './start';
import stop from './stop';
const execute = Promise.coroutine(function* () {
    yield stop.execute();
    yield Promise.delay(500);
    return start.execute();
});
export default { execute, name: 'restartService' };
//# sourceMappingURL=restart.js.map