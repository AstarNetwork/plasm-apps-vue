<template>
  <div>
    <div class="grid lg:grid-cols-2 gap-4 mb-4">
      <Address
        :address="defaultAccount"
        :address-name="defaultAccountName"
        v-model:isOpen="modalAccount"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <TotalBalance />
      <PlmBalance v-model:isOpenTransfer="modalTransferAmount" />
    </div>

    <h2 class="text-blue-900 dark:text-white text-lg font-bold my-3">Tokens</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Token v-model:isOpenTransfer="modalTransferToken" />
      <!-- <Token v-model:isOpenTransfer="modalTransferToken" />
      <Token v-model:isOpenTransfer="modalTransferToken" /> -->
    </div>

    <!-- Modals -->
    <ModalAccount
      v-if="modalAccount"
      v-model:isOpen="modalAccount"
      :account-idx="currentAccountIdx"
      :all-accounts="allAccounts"
      :all-account-names="allAccountNames"
    />
    <ModalTransferAmount
      v-if="modalTransferAmount"
      v-model:isOpen="modalTransferAmount"
      v-on:completeTransfer="completeTransfer"
      :all-accounts="allAccounts"
      :all-account-names="allAccountNames"
      :account-idx="currentAccountIdx"
      :address="defaultAccount"
      :address-name="defaultAccountName"
      :balance="balance"
    />
    <ModalTransferToken
      v-if="modalTransferToken"
      v-model:isOpen="modalTransferToken"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  watch,
  provide,
} from 'vue';
import { useAccount, useBalance, useApi } from '@/hooks';
import { useStore } from 'vuex';
import Address from '@/components/balance/Address.vue';
import PlmBalance from '@/components/balance/PlmBalance.vue';
import TotalBalance from '@/components/balance/TotalBalance.vue';
import Token from '@/components/balance/Token.vue';
import ModalAccount from '@/components/balance/ModalAccount.vue';
import ModalTransferAmount from '@/components/balance/ModalTransferAmount.vue';
import ModalTransferToken from '@/components/balance/ModalTransferToken.vue';

interface Modal {
  modalAccount: boolean;
  modalTransferAmount: boolean;
  modalTransferToken: boolean;
}

export default defineComponent({
  components: {
    Address,
    PlmBalance,
    TotalBalance,
    Token,
    ModalAccount,
    ModalTransferAmount,
    ModalTransferToken,
  },
  setup() {
    const stateModal = reactive<Modal>({
      modalAccount: false,
      modalTransferAmount: false,
      modalTransferToken: false,
    });

    const {
      allAccounts,
      allAccountNames,
      defaultAccount,
      defaultAccountName,
    } = useAccount();
    // const defaultAccount = ref(
    //   'Wh2nf6F5ZNJguoQu22Z361xo6VFqX1Y2BuQMcJBSJxERh5E'
    // );

    const { api } = useApi();

    const registry = api?.value?.registry;

    const decimals = registry?.chainDecimals;
    const tokens = registry?.chainTokens;
    const decimal = (decimals || [])[0];
    const unitToken = (tokens || [])[0];
    provide('decimal', decimal);
    provide('unitToken', unitToken);

    const store = useStore();

    const { balance } = useBalance(defaultAccount);
    provide('balance', balance);

    const currentAccountIdx = computed(() => store.getters.accountIdx);

    const completeTransfer = () => {
      const { balance: balanceRef } = useBalance(defaultAccount);

      watch(balanceRef, () => {
        balance.value = balanceRef.value;
      });
    };

    watch(
      currentAccountIdx,
      () => {
        defaultAccount.value = allAccounts.value[currentAccountIdx.value];
        defaultAccountName.value =
          allAccountNames.value[currentAccountIdx.value];
      },
      { immediate: true }
    );

    return {
      ...toRefs(stateModal),
      balance,
      allAccounts,
      allAccountNames,
      defaultAccount,
      defaultAccountName,
      currentAccountIdx,
      completeTransfer,
    };
  },
});
</script>
