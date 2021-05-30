import {
  QueueTx,
  QueueTxMessageSetStatus,
  QueueTxResult,
} from '@/types/Status';

import { ApiPromise } from '@polkadot/api';
import { DefinitionRpcExt } from '@polkadot/types/types';
import { assert, isFunction, loggerFormat } from '@polkadot/util';
import { useApi } from '@/hooks';
import { defineComponent, reactive, toRefs, computed, watch } from 'vue';

async function submitRpc(
  api: ApiPromise,
  { method, section }: DefinitionRpcExt,
  values: any[]
): Promise<QueueTxResult> {
  try {
    const rpc = api.rpc as Record<
      string,
      Record<string, (...params: unknown[]) => Promise<unknown>>
    >;

    assert(
      isFunction(rpc[section] && rpc[section][method]),
      `api.rpc.${section}.${method} does not exist`
    );

    const result = await rpc[section][method](...values);

    console.log('submitRpc: result ::', loggerFormat(result));

    return {
      result,
      status: 'sent',
    };
  } catch (error) {
    console.error(error);

    return {
      error: error as Error,
      status: 'error',
    };
  }
}

async function sendRpc(
  api: ApiPromise,
  { id, rpc, values = [] }: QueueTx
): Promise<void> {
  if (rpc) {
    // queueSetTxStatus(id, 'sending');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { error, result, status } = await submitRpc(api, rpc, values);

    // queueSetTxStatus(id, status, result, error);
  }
}

export default function usePendingTx(signature?: string, tx?: QueueTx) {
  const { api } = useApi();

  const item = reactive({
    currentItem: null,
    requestAddress: null,
  });

  const onSendRpc = (): void => {
    if (api?.value && tx) {
      sendRpc(api?.value.clone(), tx).catch(console.error);
    }
  };

  return {
    onSendRpc,
  };
}
