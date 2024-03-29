<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `${content} | Astar Apps Portal` : `Astar Apps Portal`
    }}</template>
  </metainfo>

  <component :is="layout">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <Suspense>
              <template #default>
                <api-loader>
                  <component :is="Component"></component>
                </api-loader>
              </template>
              <template #fallback>
                <modal-loading />
              </template>
            </Suspense>
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </component>

  <modal-loading v-if="isLoading" />

  <transition name="fade">
    <alert-box v-show="showAlertMsg" :msg="alertMsg" :alert-type="alertType" />
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { MutationTypes } from '@/store/mutation-types';
import { useRouter } from 'vue-router';
import { useMeta } from 'vue-meta';
import { providerEndpoints } from '@/config/chainEndpoints';
import { opengraphMeta } from '@/config/opengraph';
import ApiLoader from '@/hooks/providers/ApiLoader.vue';
import Spinner from '@/components/common/Spinner.vue';
import ModalLoading from '@/components/common/ModalLoading.vue';
import AlertBox from '@/components/common/AlertBox.vue';

const defaultLayout = 'default';

export default defineComponent({
  name: 'App',
  components: {
    ApiLoader,
    Spinner,
    ModalLoading,
    AlertBox,
  },
  setup() {
    const { currentRoute } = useRouter();

    const layout = computed(
      () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
    );

    const store = useStore();

    const isLoading = computed(() => store.getters.isLoading);
    const showAlertMsg = computed(() => store.getters.showAlert.showAlertMsg);
    const alertMsg = computed(() => store.getters.showAlert.alertMsg);
    const alertType = computed(() => store.getters.showAlert.alertType);

    const networkIdx = localStorage.getItem('networkIdx');
    const customEndpoint = localStorage.getItem('customEndpoint');
    if (networkIdx) {
      store.commit(MutationTypes.SET_CURRENT_NETWORK_IDX, parseInt(networkIdx));
    }
    if (customEndpoint) {
      store.commit(MutationTypes.SET_CURRENT_CUSTOM_ENDPOINT, customEndpoint);
    }

    if (networkIdx) {
      const favicon = providerEndpoints[parseInt(networkIdx)].favicon;

      useMeta({
        title: '',
        htmlAttrs: { lang: 'en', amp: true },
        link: [
          {
            rel: 'icon',
            href: favicon,
          },
        ],
        meta: opengraphMeta,
      });
    }

    return {
      layout,
      isLoading,
      showAlertMsg,
      alertMsg,
      alertType,
    };
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
