<template>
  <div>{{ formatBalance }} PLM</div>
</template>
<script lang="ts">
//https://github.com/polkadot-js/apps/blob/86284f815500d9edd25228db603a18983e46878d/packages/react-query/src/FormatBalance.tsx#L34
import { defineComponent, inject, computed, ref } from 'vue';
// import { useApi } from '@/hooks';
import BN from 'bn.js';
import * as plasmUtils from '@/helper';
import { Registry } from '@polkadot/types/types';

export default defineComponent({
  setup() {
    // const { api } = useApi();
    // getFormat(api.registry, formatIndex)

    const balance = inject('balance', ref(new BN(0)));

    const formatBalance = computed(() => {
      // FIXME: the tokenDecimal value is the current default for Plasm mainnet. We should dynamically parse this from the chain.
      const tokenDecimal = 10;
      return plasmUtils.reduceBalanceToDenom(
        balance.value.clone(),
        tokenDecimal
      );
    });

    return {
      formatBalance,
    };
  },
  methods: {
    getFormat(registry: Registry, formatIndex = 0): [number, string] {
      const decimals = registry.chainDecimals;
      const tokens = registry.chainTokens;

      return [
        formatIndex < decimals.length ? decimals[formatIndex] : decimals[0],
        formatIndex < tokens.length ? tokens[formatIndex] : tokens[1],
      ];
    },
  },
});
</script>
