<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4">
    <template v-for="(contract, index) in contracts" :key="index">
      <contract-item :contract="contract" />
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ContractItem from '@/components/dapps/ContractItem.vue';
import { useApi, useContracts } from '@/hooks';
import { ApiPromise } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { getContractForAddress } from '@/helper/contractUtils';

export default defineComponent({
  components: {
    ContractItem,
  },
  setup() {
    const { api } = useApi();

    const { allContracts } = useContracts();

    function filterContracts(
      api: ApiPromise,
      keyringContracts: string[] = []
    ): ContractPromise[] {
      return keyringContracts
        .map((address) => getContractForAddress(api, address.toString()))
        .filter((contract): contract is ContractPromise => !!contract);
    }

    const contracts = filterContracts(
      api?.value as ApiPromise,
      allContracts.value
    );

    console.log('cc', contracts);

    return {
      contracts,
    };
  },
});
</script>
