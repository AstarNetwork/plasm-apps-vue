import { state } from '@/store/state';
import { getters } from '@/store/getters';
import { AccountInfo, Address, Balance } from '@/api/models';
import { onUnmounted, Ref } from 'vue';

export async function subscribeAccountInfo(
  account: Address,
  ref: Ref<AccountInfo>
) {
  const api = getters.api(state);
  const unsub = await api.query.system.account(account, (res) => {
    // TODO: Validation
    const accountInfo = (res.toJSON() as unknown) as AccountInfo;
    ref.value = accountInfo;
  });
  return unsub;
}

export async function getAccountInfo(account: Address) {
  const api = getters.api(state);
  const accountInfo = ((
    await api.query.system.account(account)
  ).toJSON() as unknown) as AccountInfo;
  return accountInfo;
}

export async function getBalance(account: Address) {
  const api = getters.api(state);
  const accountInfo = await api.query.system.account(account);
  return accountInfo.data.free.toBn();
}

export function subscribeBalance(account: Address, balance: Ref<Balance>) {
  const api = getters.api(state);
  const unsub = api.query.system.account(account, (res) => {
    // TODO: Validation
    balance.value = res.data.free.toBn();
  });
  onUnmounted(() => {
    if (unsub) {
      unsub.then();
    }
  });
}
