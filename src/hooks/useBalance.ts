import { ref, watch } from 'vue';
import { useApi } from '@/hooks';
import BN from 'bn.js';
import { useCall } from './useCall';
import { AccountInfo } from '@polkadot/types/interfaces';

export function useBalance(address?: string) {
    const { api: apiRef } = useApi();

    const balance = ref(new BN(0));

    const { value: accountInfoRef, setCallParams: setBalanceAccount } = useCall(
        'system',
        'account',
        [address],
    );

    watch(
        () => accountInfoRef?.value,
        (accountInfo) => {
            // TODO assertation
            if (accountInfo) {
                balance.value = ((accountInfo as unknown) as AccountInfo).data.free.toBn();
            }
        },
    );

    return { balance, setBalanceAccount };
}
