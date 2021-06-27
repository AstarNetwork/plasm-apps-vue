<template>
  <balance :balance="balance" :decimals="decimal" :unit="unitToken" />
</template>
<script lang="ts">
import { defineComponent, inject, ref } from 'vue';

import BN from 'bn.js';
import Balance from '@/components/common/Balance.vue';

export default defineComponent({
  components: { Balance },
  setup() {
    const decimal = inject('decimal', 10);
    const unitToken = inject('unitToken', '');
    const balance = inject('balance', ref(new BN(0)));

    return {
      unitToken,
      balance,
      decimal,
    };
  },
  methods: {},
});
</script>
