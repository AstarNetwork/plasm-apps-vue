<template>
  <div
    class="bg-white dark:bg-darkGray-800 overflow-hidden shadow rounded-lg p-5"
  >
    <div class="w-44 h-16 flex items-center mx-auto my-3">
      <img
        src="@/assets/img/image-placeholder.png"
        class="w-full h-full object-scale-down"
        alt="ProjectName"
      />
    </div>

    <p
      class="text-blue-900 dark:text-darkGray-100 text-lg font-bold leading-tight mb-1"
    >
      <!-- {{ code.json.name }} -->
    </p>

    <div class="text-xs mb-0.5">
      <a
        href="#"
        class="text-blue-500 dark:text-blue-400 hover:text-gray-700 dark:hover:text-gray-300 mr-2"
      >
        #DeFi
      </a>
      <a
        href="#"
        class="text-blue-500 dark:text-blue-400 hover:text-gray-700 dark:hover:text-gray-300 mr-2"
      >
        #Games
      </a>
    </div>

    <p class="mb-3 text-xs">
      <a
        class="text-gray-500 dark:text-darkGray-400 underline"
        href="https://example.com"
        >https://example.com</a
      >
    </p>

    <div
      class="flex items-center border-t border-gray-200 dark:border-darkGray-600 -mx-5 pt-4 px-4"
    >
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
          AddressName
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
            <!-- {{ shortenCodeHash }} -->
          </div>
        </div>
      </div>
      <div>
        <div class="text-xs text-gray-500 dark:text-darkGray-400">
          Code bundle name
        </div>
        <div class="text-xs text-blue-900 dark:text-darkGray-100">
          <!-- {{ code.json.name }} -->
        </div>
      </div>
      <div>
        <div class="text-xs text-gray-500 dark:text-darkGray-400">
          Contract ABI
        </div>
        <div class="text-xs text-blue-900 dark:text-darkGray-100">
          <!-- {{ shortenAbi }} -->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue';
import { useStore } from 'vuex';
import { ActionTypes } from '@/store/action-types';
import IconBase from '@/components/icons/IconBase.vue';
import IconAccountSample from '@/components/icons/IconAccountSample.vue';
// import IconDocumentDuplicate from '@/components/icons/IconDocumentDuplicate.vue';
import { ContractPromise } from '@polkadot/api-contract';

export default defineComponent({
  components: {
    IconBase,
    IconAccountSample,
    // IconDocumentDuplicate,
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
    console.log('addrN', address);

    const shortenAddress = computed(() => {
      return address
        ? `${address.slice(0, 6)}${'.'.repeat(6)}${address.slice(-6)}`
        : '';
    });

    // const shortenCodeHash = computed(() => {
    //   const codeHash = code.value.json.codeHash;
    //   return codeHash
    //     ? `${codeHash.slice(0, 6)}${'.'.repeat(6)}${codeHash.slice(-6)}`
    //     : '';
    // });

    // const shortenAbi = computed(() => {
    //   const abi = code.value.json.abi;
    //   return abi ? `${abi.slice(0, 24)}...` : '';
    // });

    const store = useStore();

    const showAlert = () => {
      store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
        msg: 'Copy codeHash success!!',
        alertType: 'success',
      });
    };

    return {
      address,
      shortenAddress,
      // shortenCodeHash,
      // shortenAbi,
      showAlert,
    };
  },
  methods: {
    copyAddress() {
      var copyAddr = document.querySelector('#hiddenAddr') as HTMLInputElement;
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
