<template>
    <!-- Old file: https://github.com/PlasmNetwork/plasm-apps-vue/blob/df2d11b790a5e1400947c4f47997ca26e4ae9dc3/src/components/Sidebar.vue -->
    <sidebar-mobile />
    <sidebar-desktop />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SidebarMobile from './common/SidebarMobile.vue';
import SidebarDesktop from './common/SidebarDesktop.vue';

export default defineComponent({
    components: { SidebarMobile, SidebarDesktop },
});
</script>
