<template>
  <h2
    class="text-blue-900 dark:text-white text-lg font-bold mt-4 mb-4 leading-tight"
  >
    Contracts
  </h2>

  <div class="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4">
    <template v-for="contract in contracts" :key="contract.address.toString()">
      <contract-item
        :contract="contract"
        v-on:confirmRemoval="onConfirmRemoval"
      />
    </template>
  </div>
  <modal-confirm-removal
    v-if="modalConfirmRemoval"
    v-model:isOpen="modalConfirmRemoval"
    v-on:forget="onForget"
    ctype="contract"
  />
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from 'vue';
import ContractItem from '@/components/dapps/ContractItem.vue';
import ModalConfirmRemoval from '@/components/dapps/ModalConfirmRemoval.vue';
import { useApi, useContracts } from '@/hooks';
import { ApiPromise } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { getContractForAddress } from '@/helper/contractUtils';
import { keyring } from '@polkadot/ui-keyring';

interface Modal {
  modalConfirmRemoval: boolean;
}

export default defineComponent({
  components: {
    ContractItem,
    ModalConfirmRemoval,
  },
  setup() {
    const { api } = useApi();

    const stateModal = reactive<Modal>({
      modalConfirmRemoval: false,
    });

    const { allContracts } = useContracts();

    function filterContracts(
      api: ApiPromise,
      keyringContracts: string[] = []
    ): ContractPromise[] {
      return keyringContracts
        .map((address) => getContractForAddress(api, address.toString()))
        .filter((contract): contract is ContractPromise => !!contract);
    }

    const contracts = computed(() => {
      return filterContracts(api?.value as ApiPromise, allContracts.value);
    });

    const addrRef = ref('');

    const onConfirmRemoval = (address: string) => {
      stateModal.modalConfirmRemoval = true;

      addrRef.value = address;
    };

    const onForget = () => {
      try {
        keyring.forgetContract(addrRef.value);

        stateModal.modalConfirmRemoval = false;
      } catch (error) {
        console.error(error);
      }
    };

    return {
      contracts,
      onConfirmRemoval,
      onForget,
      ...toRefs(stateModal),
    };
  },
});
</script>
