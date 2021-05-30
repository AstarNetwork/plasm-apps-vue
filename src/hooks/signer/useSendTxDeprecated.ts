import { ApiPromise } from '@polkadot/api';
import { SignerOptions } from '@polkadot/api/submittable/types';
import { SignerResult, SubmittableExtrinsic } from '@polkadot/api/types';
import { KeyringPair } from '@polkadot/keyring/types';
import { QueueTx, QueueTxMessageSetStatus } from '@/types/Status';
import { useApi } from '@/hooks';

export default function useSendTx(source: any, requestAddress: string) {
  async function signAndSend(
    currentItem: QueueTx,
    tx: SubmittableExtrinsic<'promise'>,
    pairOrAddress: KeyringPair | string,
    options: Partial<SignerOptions>
  ): Promise<void> {
    // currentItem.txStartCb && currentItem.txStartCb();

    try {
      const unsubscribe = await tx.signAndSend(
        pairOrAddress,
        options,
        (): void => {
          unsubscribe();
        }
      );
    } catch (error) {
      console.error('signAndSend: error:', error);
    }
  }

  async function wrapTx(
    api: ApiPromise,
    currentItem: QueueTx,
    { isMultiCall, multiRoot, proxyRoot, signAddress }: AddressProxy
  ): Promise<SubmittableExtrinsic<'promise'>> {
    const tx = currentItem.extrinsic as SubmittableExtrinsic<'promise'>;

    return tx;
  }

  const onSend = () => {
    if (source?.extrinsic && source.signAddress) {
      const { api } = useApi();

      // const [tx, [status, pairOrAddress, options]] = await Promise.all([
      //   // wrapTx(api, source, senderInfo),
      //   // extractParams(senderInfo.signAddress, { tip }, setQrState)
      // ]);

      // await signAndSend(queueSetTxStatus, currentItem, tx, pairOrAddress, options);
    }
  };

  return { onSend };
}
