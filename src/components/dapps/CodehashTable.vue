<template>
  <h2
    class="text-blue-900 dark:text-white text-lg font-bold mb-4 leading-tight"
  >
    Code hashes
  </h2>

  <div class="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4">
    <template v-for="(code, index) in allCode" :key="index">
      <code-item :code="code" v-on:confirmRemoval="onConfirmRemoval" />
    </template>
  </div>
  <modal-confirm-removal
    v-if="modalConfirmRemoval"
    v-model:isOpen="modalConfirmRemoval"
    v-on:forget="onForget"
    ctype="codehash"
  />
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useApi } from '@/hooks';
import { ActionTypes } from '@/store/action-types';
import CodeItem from '@/components/dapps/CodeItem.vue';
import ModalConfirmRemoval from '@/components/dapps/ModalConfirmRemoval.vue';

interface Modal {
  modalConfirmRemoval: boolean;
}

export default defineComponent({
  components: {
    CodeItem,
    ModalConfirmRemoval,
  },
  setup() {
    const { api } = useApi();

    const stateModal = reactive<Modal>({
      modalConfirmRemoval: false,
    });

    const store = useStore();
    const allCode = computed(() => store.getters.getAllCode);

    const codeHashRef = ref('');

    const loadAll = () => {
      store.dispatch(ActionTypes.LOAD_ALL_CONTRACTS, {
        api: api?.value,
      });
    };

    const onConfirmRemoval = (codeHash: string) => {
      stateModal.modalConfirmRemoval = true;

      codeHashRef.value = codeHash;
    };

    const onForget = () => {
      try {
        const _codeHash = codeHashRef.value;
        store.dispatch(ActionTypes.FORGET_CODE, {
          codeHash: _codeHash,
        });

        stateModal.modalConfirmRemoval = false;
      } catch (error) {
        console.error(error);
      }
    };

    loadAll();

    return {
      allCode,
      onConfirmRemoval,
      onForget,
      ...toRefs(stateModal),
    };
  },
});
</script>
