import backupStore from './backup-keystore';
import osInfo from './os-info';
import checkUpdates from './check-updates';
import uploadImage from './upload-image';
import manaCosts from './mana-costs';

const exported: any = [backupStore, checkUpdates, osInfo, uploadImage, manaCosts];
export default exported;
