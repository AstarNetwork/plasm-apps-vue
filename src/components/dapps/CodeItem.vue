<template>
  <div
    class="bg-white dark:bg-darkGray-800 overflow-hidden shadow rounded-lg p-5"
  >
    <p
      class="text-blue-900 dark:text-darkGray-100 text-lg font-bold leading-tight mb-3"
    >
      {{ code.json.name }}
    </p>

    <div class="grid grid-cols-1 gap-2 my-4">
      <div>
        <div class="text-xs text-gray-500 dark:text-darkGray-400">
          Code hash
        </div>
        <div class="flex justify-between items-center">
          <div class="text-xs text-blue-900 dark:text-darkGray-100">
            {{ shortenCodeHash }}
          </div>
          <button
            type="button"
            class="tooltip p-3 rounded-full hover:bg-gray-100 dark:hover:bg-darkGray-600 focus:z-10 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600 focus:bg-blue-50 dark:focus:bg-darkGray-900 relative group -mr-2 -my-3"
            @click="copyAddress"
          >
            <icon-document-duplicate />
            <span
              class="pointer-events-none hidden absolute top-0 left-1/2 z-10 transform -translate-y-full -translate-x-1/2 p-2 text-xs leading-tight text-white bg-gray-800 dark:bg-darkGray-500 rounded-md shadow-lg"
            >
              Copy
            </span>
          </button>
          <input
            type="hidden"
            id="hiddenCodehash"
            :value="code.json.codeHash"
          />
        </div>
      </div>
      <div>
        <div class="text-xs text-gray-500 dark:text-darkGray-400">
          Code bundle name
        </div>
        <div class="text-xs text-blue-900 dark:text-darkGray-100">
          {{ code.json.name }}
        </div>
      </div>
      <div>
        <div class="text-xs text-gray-500 dark:text-darkGray-400">
          Contract ABI
        </div>
        <div class="text-xs text-blue-900 dark:text-darkGray-100">
          {{ shortenAbi }}
        </div>
      </div>
    </div>

    <div class="text-right">
      <button
        type="button"
        class="inline-flex items-center rounded-full border border-gray-300 dark:border-darkGray-500 px-3 py-2 bg-white dark:bg-darkGray-800 text-xs font-medium hover:bg-gray-100 dark:hover:bg-darkGray-700 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600 text-gray-500 dark:text-darkGray-400"
        @click="onForget"
      >
        Forget
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue';
import { useStore } from 'vuex';
import { ActionTypes } from '@/store/action-types';
import IconDocumentDuplicate from '@/components/icons/IconDocumentDuplicate.vue';
import type { CodeStored } from '@/store/modules/contracts/state';

export default defineComponent({
  components: {
    IconDocumentDuplicate,
  },
  props: {
    code: {
      type: Object as () => CodeStored,
      required: true,
    },
  },
  setup(props) {
    const { code } = toRefs(props);

    console.log('aff', code.value);

    const shortenCodeHash = computed(() => {
      const codeHash = code.value.json.codeHash;
      return codeHash
        ? `${codeHash.slice(0, 6)}${'.'.repeat(6)}${codeHash.slice(-6)}`
        : '';
    });

    const shortenAbi = computed(() => {
      const abi = code.value.json.abi;
      return abi ? `${abi.slice(0, 24)}...` : '';
    });

    const store = useStore();

    const onForget = () => {
      // should changed into custom modal.
      const fConfirm = confirm(
        'You are about to remove this code from your list of available code hashes. Once completed, should you need to access it again, you will have to manually add the code hash again. This operation does not remove the uploaded code WASM and ABI from the chain, nor any deployed contracts. The forget operation only limits your access to the code on this browser.'
      );

      if (fConfirm) {
        try {
          const _codeHash = code.value.json.codeHash;
          store.dispatch(ActionTypes.FORGET_CODE, {
            codeHash: _codeHash,
          });

          // should be changed.
          location.reload();
        } catch (error) {
          console.error(error);
        }
      }
    };

    const showAlert = () => {
      store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
        msg: 'Copy codeHash success!!',
        alertType: 'success',
      });
    };

    return {
      shortenCodeHash,
      shortenAbi,
      showAlert,
      onForget,
    };
  },
  methods: {
    copyAddress() {
      var copyAddr = document.querySelector(
        '#hiddenCodehash'
      ) as HTMLInputElement;
      copyAddr.setAttribute('type', 'text');
      copyAddr.select();
      document.execCommand('copy');
      copyAddr.setAttribute('type', 'hidden');
      window.getSelection()?.removeAllRanges();

      this.showAlert();
    },
  },
});
</script>
