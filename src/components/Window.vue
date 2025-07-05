<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';
import { colors, snapX, snapY } from '../constants';
import { useStorage } from '@vueuse/core';
import { clampRound } from '../utils';
import type { WindowStyle } from '../types';
import { useWindowsStore } from '../stores/windows';

const props = defineProps({
    windowId: { type: String, required: true },
    windowTitle: { type: String, required: true },
    initialPosition: { type: Object as () => { x: number, y: number }, required: true },
    initialSize: { type: Object as () => { width: number, height: number } },
    canMaximize: { type: Boolean },
    style: { type: Object as () => WindowStyle },
});

const bgColor = props.style?.bgColor ?? colors.blue.a8;
const windowClass = `tui-window window ${bgColor} \
${props.style?.fgColor ?? colors.white.ff}-text`;

const position = useStorage(`${props.windowId}-pos`, props.initialPosition, localStorage);
// const size = useStorage(`${props.windowId}-size`, props.initialSize ?? { width: 0, height: 0 }, localStorage);

const window = useTemplateRef<HTMLElement>('window');
const handle = useTemplateRef<HTMLElement>('handle');
const dragOffset = ref<{ x: number, y: number }>();
const windowsStore = useWindowsStore();
const state = computed(() => windowsStore.windows.find(w => w.id === props.windowId));

const onWindowPointerDown = () => {
    windowsStore.setActiveWindow(props.windowId);
};
const onDragPointerDown = (ev: PointerEvent) => {
    dragOffset.value = { x: ev.offsetX, y: ev.offsetY };
    document.documentElement.style.userSelect = 'none';
};
const onDragPointerMove = (ev: PointerEvent) => {
    if (!dragOffset.value) return;
    position.value = {
        x: clampRound((ev.pageX - dragOffset.value.x) / snapX) * snapX,
        y: clampRound((ev.pageY - dragOffset.value.y) / snapY) * snapY,
    };
};
const onDragPointerUp = () => {
    dragOffset.value = undefined;
    document.documentElement.style.userSelect = 'unset';
};

onMounted(() => {
    // register drag behaviour
    handle.value?.addEventListener('pointerdown', onDragPointerDown);
    document.addEventListener('pointermove', onDragPointerMove);
    document.addEventListener('pointerup', onDragPointerUp);
    // register window state
    windowsStore.addWindow({
        id: props.windowId,
        title: props.windowTitle,
        isActive: false,
        isMinimized: false,
    });
    window.value?.addEventListener('pointerdown', onWindowPointerDown);
});

onUnmounted(() => {
    handle.value?.removeEventListener('pointerdown', onDragPointerDown);
    document.removeEventListener('pointermove', onDragPointerMove);
    document.removeEventListener('pointerup', onDragPointerUp);
    window.value?.removeEventListener('pointerdown', onWindowPointerDown);
});

const onMinimize = () => {
    windowsStore.toggleMinimize(props.windowId);
};

const isMaximized = ref(false);
const onMaximize = () => {
    isMaximized.value = !isMaximized.value;
};

const windowStyle = computed(() => {
    if (isMaximized.value) {
        return {
            left: '0px',
            top: '0px',
            height: '100%',
            width: '100%',
            zIndex: '2000',
        };
    }
    return {
        display: state.value?.isMinimized ? 'none' : undefined,
        left: `${position.value.x}px`,
        top: `${position.value.y}px`,
        zIndex: state.value?.isActive ? '1000' : undefined,
    };
});
</script>

<template>
    <div ref="window" :id="props.windowId" :class="windowClass" :style="windowStyle">
        <div ref="handle" class="handle"></div>
        <fieldset class="tui-fieldset">
            <legend class="center">{{ props.windowTitle }}</legend>
            <button v-on:click="onMinimize" class="tui-fieldset-button left">
                <span class="green-255-text">■</span>
            </button>
            <button v-if="props.canMaximize" v-on:click="onMaximize" class="tui-fieldset-button">
                <span class="green-255-text">{{ isMaximized ? '&darr;' : '&uarr;' }}</span>
            </button>
            <slot></slot>
            <div class="tui-fieldset-text right">{{ position.x }}, {{ position.y }}</div>
        </fieldset>
    </div>
</template>

<style lang="css" scoped>
.window {
    position: absolute;
}
.handle {
    cursor: move;
    position: absolute;
    top: 0px;
    left: 18px;
    right: 18px;
    height: 22px;
}
fieldset {
    height: 100%;
}
</style>