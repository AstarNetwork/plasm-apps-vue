import { ApiPromise, SubmittableResult } from '@polkadot/api';
import { SignerOptions } from '@polkadot/api/submittable/types';
import { SignerResult, SubmittableExtrinsic } from '@polkadot/api/types';
import { KeyringPair } from '@polkadot/keyring/types';
import { QueueTx, QueueTxResult } from '@/types/Status';
import type { Option } from '@polkadot/types';
import type { Multisig, Timepoint } from '@polkadot/types/interfaces';
import type { AddressProxy } from '@/types/Signer';
import { keyring } from '@polkadot/ui-keyring';
import { web3FromSource } from '@polkadot/extension-dapp';
import AccountSigner from './AccountSigner';
import { useApi } from '@/hooks';
import BN from 'bn.js';
import { cacheUnlock, extractExternal, handleTxResults } from './util';

export default function useSendTx() {
  const { api: apiRef } = useApi();

  /* submitRpc - seems deprecated */
  /*
  async function submitRpc(
    { method, section }: DefinitionRpcExt,
    values: any[]
  ): Promise<QueueTxResult> {
    try {
      const rpc = api?.value?.rpc as Record<
        string,
        Record<string, (...params: unknown[]) => Promise<unknown>>
      >;

      console.log(`api.rpc.${section}.${method} does not exist`);

      const result = await rpc[section][method](...values);

      console.log('submitRpc: result ::', result);

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

  const sendRpc = async (
    { id, rpc, values = [] }: QueueTx
  ): Promise<void> => {
    console.log('r', rpc);

    if (rpc) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { error, result, status } = await submitRpc(rpc, values);
    }
  };
  */

  async function signAndSend(
    currentItem: QueueTx,
    tx: SubmittableExtrinsic<'promise'>,
    pairOrAddress: KeyringPair | string,
    options: Partial<SignerOptions>
  ): Promise<void> {
    currentItem.txStartCb && currentItem.txStartCb();

    try {
      await tx.signAsync(pairOrAddress, options);

      console.info('sending', tx.toHex());

      const unsubscribe = await tx.send(
        handleTxResults('signAndSend', currentItem, (): void => {
          console.log('sent tx');
          unsubscribe();
        })
      );

      // const unsubscribe = await tx.signAndSend(pairOrAddress, options, handleTxResults('signAndSend', currentItem, (): void => {
      //   console.log('sent tx')
      //   unsubscribe();
      // }));
    } catch (error) {
      console.error('signAndSend: error:', error);

      currentItem.txFailedCb && currentItem.txFailedCb(error);
    }
  }

  async function wrapTx(
    api: ApiPromise,
    currentItem: QueueTx,
    { isMultiCall, multiRoot, proxyRoot, signAddress }: AddressProxy
  ): Promise<SubmittableExtrinsic<'promise'>> {
    let tx = currentItem.extrinsic as SubmittableExtrinsic<'promise'>;

    if (proxyRoot) {
      tx = api.tx.proxy.proxy(proxyRoot, null, tx);
    }

    if (multiRoot) {
      const multiModule = api.tx.multisig ? 'multisig' : 'utility';
      const info = await api.query[multiModule].multisigs<Option<Multisig>>(
        multiRoot,
        tx.method.hash
      );
      const { weight } = await tx.paymentInfo(multiRoot);
      const { threshold, who } = extractExternal(multiRoot);
      const others = who.filter((w) => w !== signAddress);
      let timepoint: Timepoint | null = null;

      if (info.isSome) {
        timepoint = info.unwrap().when;
      }

      tx = isMultiCall
        ? api.tx[multiModule].asMulti.meta.args.length === 6
          ? // We are doing toHex here since we have a Vec<u8> input
            api.tx[multiModule].asMulti(
              threshold,
              others,
              timepoint,
              tx.method.toHex(),
              false,
              weight
            )
          : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            api.tx[multiModule].asMulti(threshold, others, timepoint, tx.method)
        : api.tx[multiModule].approveAsMulti.meta.args.length === 5
        ? api.tx[multiModule].approveAsMulti(
            threshold,
            others,
            timepoint,
            tx.method.hash,
            weight
          )
        : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          api.tx[multiModule].approveAsMulti(
            threshold,
            others,
            timepoint,
            tx.method.hash
          );
    }

    return tx;
  }

  async function extractParams(
    api: ApiPromise,
    address: string,
    options: Partial<SignerOptions>
  ): Promise<['qr' | 'signing', string, Partial<SignerOptions>]> {
    const pair = keyring.getPair(address);
    console.log('pair', pair);
    const {
      meta: {
        accountOffset,
        addressOffset,
        isExternal,
        isHardware,
        isInjected,
        isProxied,
        source,
      },
    } = pair;

    if (isHardware) {
      // return ['signing', address, { ...options, signer: new LedgerSigner(api.registry, getLedger, accountOffset as number || 0, addressOffset as number || 0) }];
    } else if (isExternal && !isProxied) {
      // return ['qr', address, { ...options, signer: new QrSigner(api.registry, setQrState) }];
    } else if (isInjected) {
      // polkadot extension
      const injected = await web3FromSource(source as string);

      return ['signing', address, { ...options, signer: injected.signer }];
    }

    return [
      'signing',
      address,
      { ...options, signer: new AccountSigner(api.registry, pair) },
    ];
  }

  const onSend = async (
    currentItem: QueueTx,
    senderInfo: AddressProxy
  ): Promise<void> => {
    const apiPromise: ApiPromise = apiRef?.value as ApiPromise;

    const tip = new BN(0); // should be updated

    if (senderInfo.signAddress && apiPromise) {
      const [tx, [status, pairOrAddress, options]] = await Promise.all([
        wrapTx(apiPromise, currentItem, senderInfo),
        extractParams(apiPromise, senderInfo.signAddress, { nonce: -1, tip }),
      ]);

      await signAndSend(currentItem, tx, pairOrAddress, options);
    }
  };

  return { onSend };
}
