import { onMounted, onUnmounted, ref } from 'vue';

export const useIsMountedRef = () => {
    const isMounted = ref(false);

    // todo: add context check for the current component

    onMounted(() => {
        isMounted.value = true;
    });

    onUnmounted(() => {
        isMounted.value = false;
    });

    return isMounted;
};
