import { initChannels } from './channels';
import injectApi from './preloader';

console.time('bootstrap');
initChannels();
Object.defineProperty(window, 'Channel', { value: injectApi() });
console.timeEnd('bootstrap');