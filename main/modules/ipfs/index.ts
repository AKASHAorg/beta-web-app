import createImage from './create-image';
import getConfig from './get-config';
import getPorts from './get-ports';
import logs from './logs';
import resolve from './resolve';
import setPorts from './set-ports';
import start from './start';
import status from './status';
import stop from './stop';

const exported: any = [createImage, getConfig, getPorts, logs, resolve, setPorts, start, status, stop];

export default exported;