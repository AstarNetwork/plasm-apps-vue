<template>
  <div>{{ formatBalance }} {{ unitToken }}</div>
</template>
<script lang="ts">
import { defineComponent, inject, computed, ref } from 'vue';
import { useApi } from '@/hooks';
import BN from 'bn.js';
import * as plasmUtils from '@/helper';

export default defineComponent({
  setup() {
    const { api } = useApi();

    const registry = api?.value?.registry;

    const decimals = registry?.chainDecimals;
    const tokens = registry?.chainTokens;
    const decimal = (decimals || [])[0];
    const unitToken = (tokens || [])[0];

    const balance = inject('balance', ref(new BN(0)));

    const formatBalance = computed(() => {
      const tokenDecimal = decimal;
      return plasmUtils.reduceBalanceToDenom(
        balance.value.clone(),
        tokenDecimal
      );
    });

    return {
      formatBalance,
      unitToken,
    };
  },
  methods: {},
});
</script>
