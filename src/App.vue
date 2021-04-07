<template>
  <Suspense>
    <template #default>
      <api-loader>
        <component :is="layout">
          <router-view />
        </component>
      </api-loader>
    </template>
    <template #fallback>
      <spinner />
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { MutationTypes } from '@/store/mutation-types';
import { useRouter } from 'vue-router';
import ApiLoader from '@/hooks/providers/ApiLoader.vue';
import Spinner from '@/components/Spinner.vue';

const defaultLayout = 'default';

export default defineComponent({
  name: 'App',
  setup() {
    const { currentRoute } = useRouter();

    const layout = computed(
      () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
    );

    const store = useStore();
    const networkIdx = localStorage.getItem('networkIdx');
    if (networkIdx) {
      store.commit(MutationTypes.SET_CURRENT_NETWORK_IDX, parseInt(networkIdx));
    }

    return {
      layout,
    };
  },
  components: {
    ApiLoader,
    Spinner,
  },
});
</script>

<style>
::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background: #cbd5e0;
}

::-webkit-scrollbar-thumb {
  background: #718096;
}

::-webkit-scrollbar-thumb:hover {
  background: #2d3748;
}

.bg-black-alt {
  background: #191919;
}
.text-black-alt {
  color: #191919;
}
.border-black-alt {
  border-color: #191919;
}
</style>
