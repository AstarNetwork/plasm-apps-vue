<template>
  <div>
    <div class="grid lg:grid-cols-2 gap-4 mb-4">
      <Address v-model:isOpen="modalAccount" />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <TotalBalance />
      <PlmBalance v-model:isOpenTransfer="modalTransferAmount" />
    </div>

    <h2 class="text-blue-900 dark:text-white text-lg font-bold my-3">Tokens</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Token v-model:isOpenTransfer="modalTransferToken" />
      <Token v-model:isOpenTransfer="modalTransferToken" />
      <Token v-model:isOpenTransfer="modalTransferToken" />
    </div>

    <!-- Modals -->
    <ModalAccount v-if="modalAccount" v-model:isOpen="modalAccount" />
    <ModalTransferAmount v-if="modalTransferAmount" v-model:isOpen="modalTransferAmount" />
    <ModalTransferToken v-if="modalTransferToken" v-model:isOpen="modalTransferToken" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Address from '@/components/balance/Address.vue'; 
import PlmBalance from '@/components/balance/PlmBalance.vue';
import TotalBalance from '@/components/balance/TotalBalance.vue';
import Token from '@/components/balance/Token.vue';
import ModalAccount from '@/components/balance/ModalAccount.vue';
import ModalTransferAmount from '@/components/balance/ModalTransferAmount.vue';
import ModalTransferToken from '@/components/balance/ModalTransferToken.vue';

export default defineComponent({
  components: {
    Address,
    PlmBalance,
    TotalBalance,
    Token,
    ModalAccount,
    ModalTransferAmount,
    ModalTransferToken
  },
  setup() {
    const modalAccount = ref(false);
    const modalTransferAmount = ref(false);
    const modalTransferToken = ref(false);

    return {
      modalAccount,
      modalTransferAmount,
      modalTransferToken,
    };
  }
})
</script>