import { Ref, ref, watch } from 'vue';
import BN from 'bn.js';
import { useCall } from './useCall';
import { AccountInfo } from '@polkadot/types/interfaces';

export function useBalanceOld(addressRef?: Ref<string>) {
  const balance = ref(new BN(0));

  watch(
    () => addressRef?.value,
    (address) => {
      const {
        value: accountInfoRef,
        setCallParams: setBalanceAccount,
      } = useCall('system', 'account', [address]);
      console.log('addr', address);

      watch(
        () => accountInfoRef?.value,
        (accountInfo) => {
          console.log('ac', accountInfo);
          if (accountInfo) {
            balance.value = ((accountInfo as unknown) as AccountInfo).data.free.toBn();
            console.log('b', balance.value.toString(10));
          }
        },
        { immediate: true }
      );
    },
    { immediate: true }
  );

  return { balance };
}
