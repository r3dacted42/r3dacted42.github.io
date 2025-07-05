<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, type CSSProperties } from 'vue';
import { colors, snapX, snapY } from '../constants';
import { useDraggable, useEventListener, useStorage } from '@vueuse/core';
import { clampRound } from '../utils';
import type { WindowStyle } from '../types';
import { useWindowsStore } from '../stores/windows';

const props = defineProps({
    windowId: { type: String, required: true },
    windowTitle: { type: String, required: true },
    initialPosition: { type: Object as () => { x: number, y: number }, required: true },
    minSize: { type: Object as () => { width: number, height: number } },
    canMaximize: { type: Boolean },
    style: { type: Object as () => WindowStyle },
});

const bgColor = props.style?.bgColor ?? colors.blue.a8;
const windowClass = `tui-window ${bgColor} \
${props.style?.fgColor ?? colors.white.ff}-text`;

const position = useStorage(`${props.windowId}-pos`, props.initialPosition, localStorage);
const minSize = ref({ width: 0, height: 0 });

const window = useTemplateRef<HTMLElement>('window');
const handle = useTemplateRef<HTMLElement>('handle');
const windowsStore = useWindowsStore();
const state = computed(() => windowsStore.windows.find(w => w.id === props.windowId));

useEventListener(window, 'pointerdown', () => {
    windowsStore.setActiveWindow(props.windowId);
});

useDraggable(window, {
    handle: handle,
    preventDefault: true,
    onMove(cursorPos, _event) {
        position.value = {
            x: clampRound(cursorPos.x / snapX) * snapX,
            y: clampRound(cursorPos.y / snapY) * snapY,
        };
    },
});

onMounted(() => {
    windowsStore.addWindow({
        id: props.windowId,
        title: props.windowTitle,
        isActive: false,
        isMinimized: false,
        isMaximized: false,
    });
    if (props.minSize) {
        minSize.value = props.minSize;
    } else if (window.value) {
        minSize.value = {
            width: window.value.clientWidth,
            height: window.value.clientHeight,
        };
    }
});

const onMinimize = () => {
    windowsStore.toggleMinimize(props.windowId);
};
const onMaximize = () => {
    windowsStore.toggleMaximize(props.windowId);
};

const windowStyle = computed(() => {
    console.log(minSize.value);
    const style: CSSProperties = state.value?.isMaximized
        ? {
            position: 'relative',
            resize: 'none',
            flexGrow: 1,
            zIndex: '2000',
        }
        : {
            position: 'absolute',
            resize: 'both',
            display: state.value?.isMinimized ? 'none' : undefined,
            left: `${position.value.x}px`,
            top: `${position.value.y}px`,
            minWidth: minSize.value.width,
            minHeight: minSize.value.height,
            zIndex: state.value?.isActive ? '1000' : undefined,
        };
    return style;
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
                <span class="green-255-text">{{ state?.isMaximized ? '&darr;' : '&uarr;' }}</span>
            </button>
            <slot></slot>
            <div class="tui-fieldset-text right">{{ position.x }}, {{ position.y }}</div>
        </fieldset>
    </div>
</template>

<style lang="css" scoped>
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