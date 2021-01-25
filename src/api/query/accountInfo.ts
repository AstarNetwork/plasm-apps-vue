import { state } from '@/store/state';
import { AccountInfo, Address } from '../models';

export async function subscribeAccountInfo(account: Address, reactive: AccountInfo) {
    const api = state.api;
    const unsub = await api.query.system.account(account, (res) => {
        const accountInfo = res.toJSON() as AccountInfo;
        reactive = accountInfo;
    });
    return unsub;
}

export async function getAccountInfo(account: Address) {
    const api = state.api;
    const accountInfo = await api.query.system.account(account);
    return accountInfo;
}
