<template>
  <div>{{ formatBalance }} {{ unitToken }}</div>
</template>
<script lang="ts">
import { defineComponent, inject, computed, ref } from 'vue';

import BN from 'bn.js';
import * as plasmUtils from '@/helper';

export default defineComponent({
  setup() {
    const decimal = inject('decimal', 10);
    const unitToken = inject('unitToken', '');
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
