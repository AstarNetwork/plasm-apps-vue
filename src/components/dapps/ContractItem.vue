<template>
  <div class="bg-white dark:bg-darkGray-800 shadow rounded-lg p-5">
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
        <icon-document-duplicate />
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
        <div class="text-xs text-gray-500 dark:text-darkGray-400">Messages</div>
        <div class="text-xs text-blue-900 dark:text-darkGray-100">
          <message
            v-for="message in messages"
            :message="message"
            :key="message.identifier"
          />
        </div>
      </div>
    </div>

    <div class="text-right">
      <button
        type="button"
        class="inline-flex items-center rounded-full border border-blue-300 dark:border-darkBlue-500 px-3 py-2 bg-white dark:bg-darkBlue-800 text-xs font-medium hover:bg-blue-100 dark:hover:bg-darkBlue-700 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-darkBlue-600 text-gray-500 dark:text-darkBlue-400 mr-2"
        @click="copyABI"
      >
        Copy ABI
      </button>
      <input type="hidden" id="hiddenAbi" :value="abi" />
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
import { ref, defineComponent, toRefs, computed } from 'vue';
import { useStore } from 'vuex';
import { useMessages } from '@/hooks';
import { ActionTypes } from '@/store/action-types';
import IconBase from '@/components/icons/IconBase.vue';
import IconAccountSample from '@/components/icons/IconAccountSample.vue';
import IconDocumentDuplicate from '@/components/icons/IconDocumentDuplicate.vue';
import Message from '@/components/dapps/Message.vue';
import { ContractPromise } from '@polkadot/api-contract';

export default defineComponent({
  components: {
    IconBase,
    IconAccountSample,
    IconDocumentDuplicate,
    Message,
  },
  props: {
    contract: {
      type: Object as () => ContractPromise,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { contract } = toRefs(props);

    const address = contract.value.address.toString();

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

    const store = useStore();

    const downloadURI = (uri: string, name: string) => {
      var link = document.createElement('a');
      link.download = name;
      link.href = uri;
      link.click();
    };

    const abiRef = ref(contract.value.abi);
    const { messages } = useMessages(abiRef);

    const abi = JSON.stringify(contract.value.abi.json);

    const onExport = () => {
      const abiData = 'text/json;charset=utf-8,' + encodeURIComponent(abi);
      downloadURI(abiData, 'metadata.json');
    };

    const onForget = () => {
      emit('confirmRemoval', contract.value.address.toString());
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
      abi,
      messages,
      onExport,
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
    copyABI() {
      this.copy('#hiddenAbi', 'Copy ABI success!!');
    },
  },
});
</script>
