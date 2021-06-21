<template>
  <h2 class="text-gray-400 text-3xl font-medium">Lockdrop</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMeta } from 'vue-meta';

export default defineComponent({
  setup() {
    useMeta({ title: 'Lockdrop' });
  },
});
</script>
