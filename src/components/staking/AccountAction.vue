<template>
  <div class="flex mt-3 mb-12">
    <div class="flex-initial m-1">
      <button
        type="button"
        @click="modalBond = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mb-1 group"
      >
        <icon-base
          class="w-5 h-5 text-white -ml-1"
          stroke="currentColor"
          icon-name="plus"
        >
          <icon-plus />
        </icon-base>
        Bond
      </button>
    </div>
    <div class="flex-initial m-1">
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
    </div>
  </div>

  <ModalBond
    v-if="modalBond"
    v-model:isOpen="modalBond"
    :all-accounts="allAccounts"
    :all-account-names="allAccountNames"
    :address="defaultAccount"
  />
  <ModalCreateDapps
    v-if="modalCreateDapps"
    v-model:isOpen="modalCreateDapps"
    :all-accounts="allAccounts"
    :all-account-names="allAccountNames"
    :address="defaultAccount"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch } from "vue";
import { useAccount } from "@/hooks";
import { useStore } from "vuex";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconBase from "@/components/icons/IconBase.vue";
import ModalBond from "@/components/staking/ModalBond.vue";
import ModalCreateDapps from "@/components/staking/ModalCreateDapps.vue";

interface Modal {
  modalBond: boolean;
  modalCreateDapps: boolean;
}

export default defineComponent({
  components: {
    IconPlus,
    IconBase,
    ModalBond,
    ModalCreateDapps,
  },
  setup() {
    const store = useStore();
    const stateModal = reactive<Modal>({
      modalBond: false,
      modalCreateDapps: false,
    });

    const {
      allAccounts,
      allAccountNames,
      defaultAccount,
      defaultAccountName,
    } = useAccount();

    const currentAccountIdx = computed(() => store.getters.accountIdx);

    watch(
      currentAccountIdx,
      () => {
        defaultAccount.value = allAccounts.value[currentAccountIdx.value];
        defaultAccountName.value = allAccountNames.value[currentAccountIdx.value];
      },
      { immediate: true }
    );

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
