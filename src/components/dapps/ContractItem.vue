<template>
  <div
    class="bg-white dark:bg-darkGray-800 overflow-hidden shadow rounded-lg p-5"
  >
    <div class="flex items-center -mx-5 px-4">
      <div
        class="h-8 w-8 rounded-full overflow-hidden border border-gray-100 mr-2"
      >
        <icon-base class="h-full w-full" viewBox="0 0 64 64">
          <icon-account-sample />
        </icon-base>
      </div>
      <div class="">
        <p
          class="text-blue-900 dark:text-darkGray-100 font-semibold leading-tight text-sm"
        >
          {{ contract.abi.json.contract.name }}
        </p>
        <p
          class="text-xs text-gray-500 dark:text-darkGray-400 font-normal leading-tight"
        >
          {{ shortenAddress }}
        </p>
      </div>
      <button
        type="button"
        class="ml-auto tooltip p-3 rounded-full hover:bg-gray-100 dark:hover:bg-darkGray-600 focus:z-10 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600 focus:bg-blue-50 dark:focus:bg-darkGray-900 relative group -mr-1"
        @click="copyAddress"
      >
        <svg
          class="text-blue-900 dark:text-darkGray-300 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
          />
        </svg>
        <!-- Tooltip -->
        <span
          class="pointer-events-none hidden absolute top-0 left-1/2 z-10 transform -translate-y-full -translate-x-1/2 p-2 text-xs leading-tight text-white bg-gray-800 dark:bg-darkGray-500 rounded-md shadow-lg"
        >
          Copy
        </span>
      </button>
      <input type="hidden" id="hiddenAddr" :value="address" />
    </div>

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
            @click="copyCodeHash"
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
            id="hiddenCodeHash"
            :value="contract.abi.json.source.hash"
          />
        </div>
      </div>
      <div>
        <div class="text-xs text-gray-500 dark:text-darkGray-400">
          Code bundle name
        </div>
        <div class="text-xs text-blue-900 dark:text-darkGray-100">
          {{ contract.abi.json.contract.name }}
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

    <div class="grid grid-cols-1 gap-2 my-2">
      <button
        type="button"
        class="items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 group"
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
import IconBase from '@/components/icons/IconBase.vue';
import IconAccountSample from '@/components/icons/IconAccountSample.vue';
import IconDocumentDuplicate from '@/components/icons/IconDocumentDuplicate.vue';
import { ContractPromise } from '@polkadot/api-contract';
import { keyring } from '@polkadot/ui-keyring';

export default defineComponent({
  components: {
    IconBase,
    IconAccountSample,
    IconDocumentDuplicate,
  },
  props: {
    contract: {
      type: Object as () => ContractPromise,
      required: true,
    },
  },
  setup(props) {
    const { contract } = toRefs(props);

    console.log('dfd', contract.value);

    const address = contract.value.address.toHex();

    const shortenAddress = computed(() => {
      return address
        ? `${address.slice(0, 6)}${'.'.repeat(6)}${address.slice(-6)}`
        : '';
    });

    const shortenCodeHash = computed(() => {
      // @ts-ignore
      const codeHash = contract.value.abi.json.source.hash;
      return codeHash
        ? `${codeHash.slice(0, 6)}${'.'.repeat(6)}${codeHash.slice(-6)}`
        : '';
    });

    const shortenAbi = computed(() => {
      // @ts-ignore
      const abi = JSON.stringify(contract.value.abi.json);
      return abi ? `${abi.slice(0, 24)}...` : '';
    });

    const store = useStore();

    const onForget = () => {
      const fConfirm = confirm(
        'You are about to remove this contract from your list of available contracts. The forget operation only limits your access to the contract on this browser.'
      );

      if (fConfirm) {
        try {
          keyring.forgetContract(contract.value.address.toString());

          // should be changed.
          location.reload();
        } catch (error) {
          console.error(error);
        }
      }
    };

    const showAlert = (msg: string) => {
      store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
        msg,
        alertType: 'success',
      });
    };

    return {
      address,
      shortenAddress,
      shortenCodeHash,
      shortenAbi,
      onForget,
      showAlert,
    };
  },
  methods: {
    copy(elementStr: string, alertMsg: string) {
      var copyAddr = document.querySelector(elementStr) as HTMLInputElement;
      copyAddr.setAttribute('type', 'text');
      copyAddr.select();
      document.execCommand('copy');
      copyAddr.setAttribute('type', 'hidden');
      window.getSelection()?.removeAllRanges();

      this.showAlert(alertMsg);
    },
    copyAddress() {
      this.copy('#hiddenAddr', 'Copy address success!!');
    },
    copyCodeHash() {
      this.copy('#hiddenCodeHash', 'Copy codehash success!!');
    },
  },
});
</script>
