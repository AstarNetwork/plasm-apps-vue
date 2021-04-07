<template>
  <div></div>
</template>
<script lang="ts">
//https://github.com/polkadot-js/apps/blob/86284f815500d9edd25228db603a18983e46878d/packages/react-query/src/FormatBalance.tsx#L34
import { defineComponent } from 'vue';
// import { useApi } from '@/hooks';
import { Registry } from '@polkadot/types/types';

export default defineComponent({
  setup() {
    // const { api } = useApi();
    // getFormat(api.registry, formatIndex)
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
