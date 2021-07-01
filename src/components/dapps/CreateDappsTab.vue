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
      class="inline-flex items-center ml-3 px-4 py-2 text-sm font-medium rounded-full shadow-sm text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 hover:bg-blue-100 dark:hover:bg-darkGray-800 dark:hover:border-blue-300 dark:hover:text-blue-300 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mb-1 group"
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

  <codehash-table />

  <contracts-table />

  <ModalCreateDapps
    v-if="modalCreateDapps"
    v-model:isOpen="modalCreateDapps"
    :all-accounts="allAccounts"
    :all-account-names="allAccountNames"
    :address="defaultAccount"
  />
  <ModalCodeHash
    v-if="modalCodeHash"
    v-model:isOpen="modalCodeHash"
    :address="defaultAccount"
  />
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
import { useAccount, useApi } from '@/hooks';
import { useStore } from 'vuex';
import { useMeta } from 'vue-meta';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconBase from '@/components/icons/IconBase.vue';
import ModalCreateDapps from '@/components/dapps/ModalCreateDapps.vue';
import ModalCodeHash from '@/components/dapps/ModalCodeHash.vue';
import CodehashTable from '@/components/dapps/CodehashTable.vue';
import ContractsTable from '@/components/dapps/ContractsTable.vue';

interface Modal {
  modalCreateDapps: boolean;
  modalCodeHash: boolean;
}

export default defineComponent({
  components: {
    IconPlus,
    IconBase,
    ModalCreateDapps,
    ModalCodeHash,
    CodehashTable,
    ContractsTable,
  },
  setup() {
    useMeta({ title: 'Dapps-Create dApps' });

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

    // it should be refactored
    const { api } = useApi();

    const registry = api?.value?.registry;

    const decimals = registry?.chainDecimals;
    const tokens = registry?.chainTokens;
    const decimal = (decimals || [])[0];
    const unitToken = (tokens || [])[0];
    provide('decimal', decimal);
    provide('unitToken', unitToken);

    return {
      allAccounts,
      allAccountNames,
      defaultAccount,
      currentAccountIdx,
      ...toRefs(stateModal),
    };
  },
});
</script>
