import options from './options';
import restart from './restart';
import start from './start';
import status from './status';
import stop from './stop';
import syncStatus from './sync-status';

const exported: any = [options, restart, start, status, stop, syncStatus];
export default exported;