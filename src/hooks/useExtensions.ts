// should implement by following this.
//https://github.com/polkadot-js/apps/blob/2d97581b173231db9b3f8dce08a5ac64b18316fa/packages/page-settings/src/useExtensions.ts

// import type { ApiPromise } from '@polkadot/api';
import type {
  InjectedExtension,
  InjectedMetadataKnown,
  MetadataDef,
} from '@polkadot/extension-inject/types';

import { ref } from 'vue';
import { useApi } from '@/hooks';
// import store from 'store';

interface ExtensionKnown {
  extension: InjectedExtension;
  known: InjectedMetadataKnown[];
  update: (def: MetadataDef) => Promise<boolean>;
}

export function useExtensions() {
  const { api } = useApi();

  const all = ref<ExtensionKnown[] | undefined>(undefined);
  const trigger = ref(0);

  // continue to implement this
}
