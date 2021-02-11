import { usePolkadotContainerContext } from '@/api';

/**
 * Access the global polkadot API state that is provided by the provider component from a nested parent
 */
export const useAccount = () => {
    const { currentAccount, currentBalance, setCurrentAccount } = usePolkadotContainerContext();

    return { currentAccount, currentBalance, setCurrentAccount };
};
