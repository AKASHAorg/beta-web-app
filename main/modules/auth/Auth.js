import { createCipher, createDecipher, randomBytes } from 'crypto';
import { addHexPrefix, stripHexPrefix } from 'ethereumjs-util';
import * as Promise from 'bluebird';
import { web3Api } from '../../services';
import { gethStatus } from '../../event/responses';
export const randomBytesAsync = Promise.promisify(randomBytes);
export class Auth {
    constructor(key = 'session-key') {
        this._key = key;
    }
    regenSession(token) {
        let session;
        const data = localStorage.getItem(this._key);
        if (!data) {
            return false;
        }
        this._generateDecipher(stripHexPrefix(token));
        try {
            const sessionData = JSON.parse(data);
            if (!sessionData.hasOwnProperty('data')) {
                return false;
            }
            const sessionBuffer = Buffer.from(sessionData.data);
            const sessionDecrypted = Buffer.concat([this._decipher.update(sessionBuffer), this._decipher.final()]);
            session = JSON.parse(sessionDecrypted.toString());
            if (!session.hasOwnProperty('address') ||
                !session.hasOwnProperty('expiration') ||
                !session.hasOwnProperty('sig')) {
                return false;
            }
            session.expiration = new Date(session.expiration);
        }
        catch (err) {
            session = null;
            console.error(err);
        }
        this._session = session;
        return !!this._session;
    }
    _generateCipher(token) {
        this._cipher = createCipher('aes-256-ctr', token);
    }
    _generateDecipher(token) {
        this._decipher = createDecipher('aes-256-ctr', token);
    }
    login(acc, timer = 30, registering = false) {
        return randomBytesAsync(40)
            .then((buff) => {
            const token = addHexPrefix(buff.toString('hex'));
            return this._signSession(token, acc)
                .then((signedString) => {
                const expiration = new Date();
                gethStatus.akashaKey = acc;
                expiration.setMinutes(expiration.getMinutes() + timer);
                web3Api.instance.eth.defaultAccount = acc;
                this._session = {
                    expiration,
                    address: acc,
                    sig: signedString
                };
                this._generateCipher(stripHexPrefix(token));
                localStorage.setItem(this._key, JSON.stringify(Buffer.concat([this._cipher.update(Buffer.from(JSON.stringify(this._session))),
                    this._cipher.final()])));
                return { token: token, expiration, account: acc };
            });
        });
    }
    logout() {
        this._flushSession();
    }
    isLogged(token) {
        const now = new Date();
        if (!this._session || !token) {
            return Promise.resolve(false);
        }
        if (now > this._session.expiration) {
            return Promise.resolve(false);
        }
        return web3Api.instance
            .personal
            .ecRecoverAsync(token, this._session.sig)
            .then((address) => {
            return address === this._session.address;
        });
    }
    _flushSession() {
        this._session = null;
        gethStatus.akashaKey = '';
        gethStatus.shouldLogout = false;
        console.log('flushed session');
    }
    _signSession(hash, account) {
        return web3Api.instance.personal.signAsync(hash, account);
    }
    signData(data, token) {
        return this.isLogged(token)
            .then(function (logged) {
            if (!logged) {
                throw new Error('Token is not valid!');
            }
            return web3Api.instance.eth.sendTransactionAsync(data);
        });
    }
    signMessage(data, token) {
        return this.isLogged(token)
            .then(function (logged) {
            if (!logged) {
                throw new Error('Token is not valid!');
            }
            return web3Api.instance
                .personal
                .signAsync(data, web3Api.instance.eth.defaultAccount);
        });
    }
}
export default new Auth();
//# sourceMappingURL=Auth.js.map