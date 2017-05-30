import * as Promise from 'bluebird';

const execute = Promise.coroutine(function*(data: {}, cb: any) {
    const interval = setInterval(() => {
        cb(null, {x: new Date().toISOString()});
    }, 2000);
    setTimeout(() => clearTimeout(interval), 20000);
    return Promise.resolve({
        platform: {
            platform: 'a platform',
            arch: 'an arch',
            type: 'a type'
        },
        resources: {
            memoryUsage: 'over 9100'
        }
    });

});

export default { execute, name: 'checkUpdate', hasStream: true };