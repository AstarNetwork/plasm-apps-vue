import { onMounted, onUnmounted, ref } from 'vue';

export const useIsMountedRef = () => {
    const isMounted = ref(false);

    onMounted(() => {
        isMounted.value = true;
    });

    onUnmounted(() => {
        isMounted.value = false;
    });

    return isMounted;
};
