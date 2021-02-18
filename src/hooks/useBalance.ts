import { ref, onUnmounted, onMounted, watchEffect, Ref } from 'vue';
import { useApi } from '@/hooks';
import BN from 'bn.js';
import { UnsubscribePromise } from '@polkadot/api/types';
import { ApiPromise } from '@polkadot/api';

export function useBalance(api: ApiPromise | null, address?: string) {
    const balance = ref(new BN(0));
    const balanceAccount = ref(address);
    const setBalanceAccount = (address: string) => {
        balanceAccount.value = address;
    };
    const unsub: Ref<null | UnsubscribePromise> = ref(null);

    watchEffect(() => {
        console.log('watchEffect triggered');
        const balanceAccountValue = balanceAccount.value;
        console.log(balanceAccountValue);
        if (balanceAccountValue && api) {
            console.log(api.isReady);
            unsub.value = api.query.system.account(balanceAccountValue, (result) => {
                balance.value = result.data.free.toBn();
            });
        }
    });

    onUnmounted(() => {
        console.log('onUnmounted');
        (async function () {
            await unsub.value?.then();
        });
    });
    return { balance, setBalanceAccount };
}
