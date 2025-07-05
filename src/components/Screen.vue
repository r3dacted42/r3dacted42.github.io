<script setup lang="ts">
import { screenColors, type ScreenColors } from '../constants';
import { useWindowsStore } from '../stores/windows';

export interface ScreenStyle {
    color?: keyof ScreenColors,
    bordered?: boolean,
};

const props = defineProps({
    style: { type: Object as () => ScreenStyle },
});

const screenClass = `tui-screen \
${props.style?.color ? screenColors[props.style?.color] : ''} \
${props.style?.bordered ? 'bordered' : ''}`;

const windowsStore = useWindowsStore();

const restoreWindow = (id: string) => {
    windowsStore.toggleMinimize(id);
}
</script>

<template>
    <div class="screen" :class="screenClass">
        <slot></slot>
        <div class="tui-statusbar">
            <ul>
                <li class="minimized" v-for="win in windowsStore.minimizedWindows" v-on:click="restoreWindow(win.id)">
                    {{ win.title }}
                </li>
                <li class="tui-datetime" data-format="h:m:s a">0:00:00 PM</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.screen {
    height: 100%;
}
.minimized {
    cursor: pointer;
    user-select: none;
    background-color: gray;
}
</style>