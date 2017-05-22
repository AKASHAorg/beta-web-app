import 'babel-polyfill';
import { initChannels } from './channels';
import injectApi from './preloader';
import  initModules from './init-modules';

console.time('bootstrap');
initChannels();
Object.defineProperty(window, 'Channel', { value: injectApi() });
initModules();
console.timeEnd('bootstrap');