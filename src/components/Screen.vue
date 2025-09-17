<script setup lang="ts">
import { computed, type ComputedRef, type CSSProperties } from 'vue';
import { snapX, snapY, type ScreenColor } from '../constants';
import { useWindowsStore } from '../stores/windows';

export interface ScreenStyle {
    color?: ScreenColor,
    bordered?: boolean,
};

const props = defineProps({
    style: { type: Object as () => ScreenStyle },
});

const screenClass = `tui-screen \
${props.style?.color ?? ''} \
${props.style?.bordered ? 'bordered' : ''}`;

const windowsStore = useWindowsStore();

const onTitleClick = (id: string) => {
    const isMinimized = windowsStore.minimizedWindows.findIndex(w => w.id === id) !== -1;
    if (!isMinimized && windowsStore.activeWindow?.id !== id) {
        // not minimized, set as active
        windowsStore.setActiveWindow(id);
        return;
    }
    windowsStore.toggleMinimize(id);
}

const barStyle: ComputedRef<CSSProperties> = computed(() => ({
    position: windowsStore.maximizedWindow ? 'relative' : 'absolute',
    zIndex: windowsStore.windows.length + 1,
}));

const resetPage = () => {
    localStorage.clear();
    location.reload();
};

const screenCSSVars = {
  "--snap-x": `${snapX}px`,
  "--snap-y": `${snapY}px`,
};
</script>

<template>
    <div class="screen" :class="screenClass" :style="screenCSSVars">
        <nav class="tui-nav" :style="barStyle">
            <ul class="flex-row">
                <slot name="nav-li"></slot>
                <li v-on:click="resetPage">reset</li>
            </ul>
        </nav>
        <slot name="windows"></slot>
        <div class="tui-statusbar" :style="barStyle">
            <ul class="flex-row">
                <span class="flex-row" style="flex-grow: 1; flex-wrap: wrap;">
                    <li :class="`minimized ${windowsStore.activeWindow?.id === win.id && !win.isMinimized ? 'active' : ''}`"
                        v-for="win in windowsStore.windows" v-on:click="onTitleClick(win.id)">
                        {{ win.title }}
                    </li>
                </span>
                <li class="tui-datetime" style="float: unset;" data-format="h:m:s a">0:00:00 PM</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
:deep(*) {
  font-size: var(--snap-y);
}

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

li {
    text-wrap: nowrap;
}

.minimized {
    cursor: pointer;
    background-color: gray;
    float: unset;
}

.active {
    background-color: whitesmoke;
}
</style>