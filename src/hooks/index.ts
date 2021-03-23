import { App } from '@vue/runtime-core';

export * from './useAccount';
export * from './useApi';
export * from './useBalance';
export * from './useSidebar';

interface Runtime {
  app?: App;
}

const runtime: Runtime = {};

export default function install(app: App) {
  app.mixin({
    created() {
      if (typeof this.$options.setup === 'function') {
        runtime.app = app;
      }
    },
  });
}
