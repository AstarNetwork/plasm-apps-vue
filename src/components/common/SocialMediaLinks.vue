<template>
    <div class="flex items-center">
        <!-- TODO: Links -->
        <a href="#" :class="classes.link">
            <!-- original icon -->
            <icon-base :class="classes.iconBase" viewBox="0 0 512 512" iconName="Twitter">
                <icon-twitter />
            </icon-base>
            <!-- Tooltip -->
            <span :class="classes.tooltipText"> Twitter </span>
        </a>

        <a href="#" :class="classes.link">
            <!-- original icon -->
            <icon-base :class="classes.iconBase" viewBox="0 0 448 512" iconName="Telegram">
                <icon-telegram />
            </icon-base>
            <!-- Tooltip -->
            <span :class="classes.tooltipText"> Telegram </span>
        </a>

        <a href="#" :class="classes.link">
            <!-- original icon -->
            <icon-base :class="classes.iconBase" viewBox="0 0 448 512" iconName="Discord">
                <icon-discord />
            </icon-base>
            <!-- Tooltip -->
            <span :class="classes.tooltipText"> Discord </span>
        </a>

        <a href="#" :class="classes.link">
            <!-- original icon -->
            <icon-base :class="classes.iconBase" viewBox="0 0 496 512" iconName="GitHub">
                <icon-github />
            </icon-base>

            <!-- Tooltip -->
            <span :class="classes.tooltipText"> GitHub </span>
        </a>

        <a href="#" :class="classes.link">
            <!-- Heroicon name: outline/document-text -->
            <icon-base
                :class="classes.iconBase"
                viewBox="0 0 24 24"
                stroke="currentColor"
                iconColor="none"
                iconName="Documentation"
            >
                <icon-document />
            </icon-base>
            <!-- Tooltip -->
            <span :class="classes.tooltipText"> Documentation </span>
        </a>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import IconBase from '../icons/IconBase.vue';
import IconTwitter from '../icons/IconTwitter.vue';
import IconTelegram from '../icons/IconTelegram.vue';
import IconDocument from '../icons/IconDocument.vue';
import IconGithub from '../icons/IconGithub.vue';
import IconDiscord from '../icons/IconDiscord.vue';

export default defineComponent({
    components: { IconBase, IconTwitter, IconTelegram, IconDocument, IconGithub, IconDiscord },
    setup() {
        const classes = reactive({
            link:
                'tooltip p-3 rounded-full hover:bg-gray-100 dark:hover:bg-darkGray-600 focus:z-10 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600 focus:bg-blue-50 dark:focus:bg-darkGray-900 relative',
            iconBase: 'text-blue-900 dark:text-darkGray-300 h-4 w-4',
            tooltipText:
                'pointer-events-none hidden absolute top-0 left-1/2 z-10 transform -translate-y-full -translate-x-1/2 p-2 text-xs leading-tight text-white bg-gray-800 dark:bg-darkGray-500 rounded-md shadow-lg opacity-90',
        });
        return {
            classes,
        };
    },
});
</script>
