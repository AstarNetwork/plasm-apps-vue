import { Ref, ref, watch, watchEffect } from 'vue';
import { useApi } from '@/hooks';
import BN from 'bn.js';
import { useCall } from './useCall';
import { AccountInfo } from '@polkadot/types/interfaces';

export function useBalance(addressRef?: Ref<string>) {
  const { api: apiRef } = useApi();

  const balance = ref(new BN(0));

  watch(
    () => addressRef?.value,
    (address) => {
      const {
        value: accountInfoRef,
        setCallParams: setBalanceAccount,
      } = useCall('system', 'account', [address]);

      watch(
        () => accountInfoRef?.value,
        (accountInfo) => {
          if (accountInfo) {
            balance.value = ((accountInfo as unknown) as AccountInfo).data.free.toBn();
            console.log('b', balance.value);
          }
        },
        { immediate: true }
      );
    },
    { immediate: true }
  )


  return { balance };
}
