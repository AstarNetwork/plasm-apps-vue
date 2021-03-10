<template>
    <div class="mt-3 mb-12">
        <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mb-1 group"
        >
            <svg
                class="w-5 h-5 text-white -ml-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
            </svg>
            Create your dApp
        </button>
        <button
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full shadow-sm text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 hover:bg-blue-100 dark:hover:bg-darkGray-800 dark:hover:border-blue-300 dark:hover:text-blue-300 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mb-1 group"
        >
            <svg
                class="w-5 h-5 text-blue-500 dark:text-blue-400 -ml-1 dark:group-hover:text-blue-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
            </svg>
            Add an existing code hash
        </button>
    </div>

    <h2 class="text-blue-900 dark:text-white text-lg font-bold mb-4 leading-tight">Contract</h2>

    <div class="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4">
        <!-- <%- include('./components/dapps/_contract-item'); -%>
                    <%- include('./components/dapps/_contract-item'); -%>
                      <%- include('./components/dapps/_contract-item'); -%>
                        <%- include('./components/dapps/_contract-item'); -%>
                          <%- include('./components/dapps/_contract-item'); -%>
                            <%- include('./components/dapps/_contract-item'); -%>
                              <%- include('./components/dapps/_contract-item'); -%>
                                <%- include('./components/dapps/_contract-item'); -%> -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useApi } from '@/hooks/useApi';

export default defineComponent({
    setup() {
        const { api } = useApi();

        return {
            api,
        };
    },
});
</script>
