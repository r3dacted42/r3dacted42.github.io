<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';
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

const barStyle = computed(() => {
    const style: CSSProperties = {
        position: windowsStore.maximizedWindow ? 'relative' : 'fixed',
        zIndex: 2001,
    };
    return style;
});

const resetPage = () => {
    localStorage.clear();
    location.reload();
};
</script>

<template>
    <div class="screen" :class="screenClass">
        <nav class="tui-nav" :style="barStyle">
            <ul class="flex-row">
                <slot name="nav-li"></slot>
                <li v-on:click="resetPage">reset</li>
            </ul>
        </nav>
        <slot name="windows"></slot>
        <div class="tui-statusbar" :style="barStyle">
            <ul class="flex-row">
                <li class="minimized" v-for="win in windowsStore.minimizedWindows" v-on:click="restoreWindow(win.id)">
                    {{ win.title }}
                </li>
                <li style="flex-grow: 1;"></li>
                <li class="tui-datetime" style="float: unset;" data-format="h:m:s a">0:00:00 PM</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.screen {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.flex-row {
    display: flex;
    flex-direction: row;
}
.minimized {
    cursor: pointer;
    background-color: gray;
    float: unset;
}
</style>