import { usePolkadotContainerContext } from '@/api';

export const useApi = () => {
    const { api } = usePolkadotContainerContext();

    return { api };
};
