<template>
  <div class="mt-3 mb-12">
    <button
      type="button"
      @click="modalCreateDapps = true"
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mb-1 group"
    >
      <icon-base
        class="w-5 h-5 text-white -ml-1"
        stroke="currentColor"
        icon-name="plus"
      >
        <icon-plus />
      </icon-base>
      Create your dApp
    </button>
    <button
      type="button"
      @click="modalCodeHash = true"
      class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full shadow-sm text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 hover:bg-blue-100 dark:hover:bg-darkGray-800 dark:hover:border-blue-300 dark:hover:text-blue-300 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mb-1 group"
    >
      <icon-base
        class="w-5 h-5 text-blue-500 dark:text-blue-400 -ml-1 dark:group-hover:text-blue-300"
        icon-name="plus"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <icon-plus />
      </icon-base>
      Add an existing code hash
    </button>
  </div>

  <h2
    class="text-blue-900 dark:text-white text-lg font-bold mb-4 leading-tight"
  >
    Contract
  </h2>

  <div class="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4">
    <contract-item />
    <contract-item />
    <contract-item />
    <contract-item />
    <contract-item />
    <contract-item />
    <contract-item />
    <contract-item />
  </div>

  <ModalCreateDapps
    v-if="modalCreateDapps"
    v-model:isOpen="modalCreateDapps"
    :all-accounts="allAccounts"
    :all-account-names="allAccountNames"
    :address="defaultAccount"
  />
  <ModalCodeHash v-if="modalCodeHash" v-model:isOpen="modalCodeHash" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch } from 'vue';
import { useAccount, useApi } from '@/hooks';
import { useStore } from 'vuex';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconBase from '@/components/icons/IconBase.vue';
import ContractItem from '@/components/dapps/ContractItem.vue';
import ModalCreateDapps from '@/components/dapps/ModalCreateDapps.vue';
import ModalCodeHash from '@/components/dapps/ModalCodeHash.vue';

interface Modal {
  modalCreateDapps: boolean;
  modalCodeHash: boolean;
}

export default defineComponent({
  components: {
    IconPlus,
    IconBase,
    ContractItem,
    ModalCreateDapps,
    ModalCodeHash,
  },
  setup() {
    const { api } = useApi();
    const stateModal = reactive<Modal>({
      modalCreateDapps: false,
      modalCodeHash: false,
    });

    const {
      allAccounts,
      allAccountNames,
      defaultAccount,
      defaultAccountName,
    } = useAccount();

    const store = useStore();

    const currentAccountIdx = computed(() => store.getters.accountIdx);

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
      api,
      allAccounts,
      allAccountNames,
      defaultAccount,
      currentAccountIdx,
      ...toRefs(stateModal),
    };
  },
});
</script>
