import * as Promise from 'bluebird';
const execute = Promise.coroutine(function* () {
    return Promise.resolve({
        platform: {
            platform: 'a platform',
            arch: 'an arch',
            type: 'a type'
        },
        resources: {
            memoryUsage: 'over 9000'
        }
    });
});
export default { execute, name: 'osInfo' };
//# sourceMappingURL=os-info.js.map