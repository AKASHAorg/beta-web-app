import { randomBytes } from 'crypto';
import { addHexPrefix, bufferToHex, ecrecover, fromRpcSig, hashPersonalMessage, pubToAddress, toBuffer, unpad } from 'ethereumjs-util';
import contracts from '../../contracts/index';
import * as Promise from 'bluebird';
import { web3Api } from '../../services';

export const randomBytesAsync = Promise.promisify(randomBytes);

export class Auth {
    private _session: { address: string, expiration: Date, vrs: { v: string, r: string, s: string } };
    private _task;

    /**
     *
     * @param acc
     * @param pass
     * @param timer
     * @param registering
     * @returns {any}
     */
    public login(acc: string, timer: number = 1, registering = false) {

        return contracts.instance
            .registry
            .getByAddress(acc)
            .then((address: string) => {
                if (!unpad(address) && !registering) {
                    throw new Error(`eth key: ${acc} has no profile attached`);
                }
                // return gethHelper.hasKey(acc);
                return true;
            })
            .then(() => {
                return randomBytesAsync(40);
            })
            .then((buff: Buffer) => {
                const token = addHexPrefix(buff.toString('hex'));
                return this._signSession(token, acc)
                    .then((signedString: string) => {
                        const expiration = new Date();
                        const clientToken = hashPersonalMessage(buff);
                        expiration.setMinutes(expiration.getMinutes() + timer);
                        web3Api.instance.eth.defaultAccount = acc;
                        this._session = {
                            expiration,
                            address: acc,
                            vrs: fromRpcSig(signedString)
                        };
                        this._task = setTimeout(() => this._flushSession(), 1000 * 60 * timer);
                        return { token: addHexPrefix(clientToken.toString('hex')), expiration, account: acc };
                    });
            });
    }

    public logout() {
        this._flushSession();

    }

    /**
     *
     * @param token
     * @returns {boolean}
     */
    public isLogged(token: any) {
        let pubKey: string;
        let ethAddr: Buffer;
        const now = new Date();
        // console.log(token);
        if (!this._session || !token) {
            return false;
        }

        if (now > this._session.expiration) {
            return false;
        }
        const { v, r, s } = this._session.vrs;
        try {
            pubKey = bufferToHex(ecrecover(toBuffer(token), v, r, s));
            ethAddr = pubToAddress(pubKey);
            // console.log(bufferToHex(ethAddr), this._session.address);
            return bufferToHex(ethAddr) === this._session.address;
        } catch (err) {
            return false;
        }

    }

    /**
     *
     * @private
     */
    private _flushSession() {
        this._session = null;
        clearTimeout(this._task);
        console.log('flushed session');
    }

    /**
     *
     * @param hash
     * @param account
     * @param password
     * @returns {any}
     * @private
     */
    private _signSession(hash: string, account: string) {
        // metamask bug
        // @todo: first param should be hash when solved
        return web3Api.instance.personal.signAsync(account, account);
    }

    /**
     *
     * @param data
     * @param token
     * @returns {any}
     */
    public signData(data: {}, token: string) {
        return web3Api.instance.eth.sendTransactionAsync(data);
    }
}

export default new Auth();