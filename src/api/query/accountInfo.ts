import { bnToBn } from '@polkadot/util';
import { state } from '@/store/state';
import { getters } from '@/store/getters';
import { AccountInfo, Address, Balance } from '../models';
import { Ref } from 'vue';

export async function subscribeAccountInfo(account: Address, ref: Ref<AccountInfo>) {
    const api = getters.api(state);
    if (api === undefined) {
        throw new Error();
    }
    const unsub = await api.query.system.account(account, (res) => {
        // TODO: Validation
        const accountInfo = (res.toJSON() as unknown) as AccountInfo;
        ref.value = accountInfo;
    });
    return unsub;
}

export async function getAccountInfo(account: Address) {
    const api = getters.api(state);
    if (api === undefined) {
        throw new Error();
    }
    const accountInfo = ((
        await api.query.system.account(account)
    ).toJSON() as unknown) as AccountInfo;
    return accountInfo;
}

export async function subscribeBalance(account: Address, ref: Ref<Balance>) {
    const api = getters.api(state);
    if (api === undefined) {
        throw new Error();
    }
    const unsub = await api.query.system.account(account, (res) => {
        // TODO: Validation
        const balance = res.data.free;
        ref.value = balance.toBn();
    });
    return unsub;
}

export async function getBalance(account: Address) {
    const api = getters.api(state);
    if (api === undefined) {
        throw new Error();
    }
    const accountInfo = await api.query.system.account(account);
    return accountInfo.data.free.toBn();
}
