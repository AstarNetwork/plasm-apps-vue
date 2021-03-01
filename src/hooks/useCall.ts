import { ref, onUnmounted, watch, Ref, reactive, toRefs } from 'vue';
import { useApi } from '@/hooks';
import { VoidFn } from '@polkadot/api/types';
import { useIsMountedRef } from './useIsMountedRef';
import { Codec } from '@polkadot/types/types';

interface UseCall {
    value?: Codec;
}

export function useCall(section: string, method: string, callParams: Array<any>) {
    const mountedRef = useIsMountedRef();

    const { api: apiRef } = useApi();

    const callParamsRef = ref(callParams);

    const state = reactive<UseCall>({
        value: undefined,
    });

    const setCallParams = (newCallParams: Array<any>) => {
        callParamsRef.value = newCallParams;
    };

    const unsub: Ref<VoidFn | undefined> = ref();

    watch(
        () => callParamsRef.value,
        (params) => {
            const api = apiRef?.value;
            if (mountedRef) {
                if (unsub.value) {
                    unsub.value();
                    unsub.value = undefined;
                }
                if (params && api && api.query[section] && api.query[section][method]) {
                    api.isReady.then(async () => {
                        unsub.value = await api.queryMulti(
                            [[api.query[section][method], ...params]],
                            ([result]) => {
                                state.value = result;
                            },
                        );
                    });
                }
            }
        },
        { immediate: true },
    );

    onUnmounted(() => {
        const unsubFn = unsub.value;
        if (unsubFn) {
            unsubFn();
        }
    });
    return {
        ...toRefs(state),
        setCallParams,
    };
}
