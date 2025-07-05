<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, type CSSProperties } from 'vue';
import { colors, snapX, snapY } from '../constants';
import { useDraggable, useEventListener, useStorage } from '@vueuse/core';
import { clamp } from '../utils';
import type { WindowStyle } from '../types';
import { useWindowsStore } from '../stores/windows';

const props = defineProps({
    windowId: { type: String, required: true },
    windowTitle: { type: String, required: true },
    initialPosition: { type: Object as () => { x: number, y: number }, required: true },
    minSize: { type: Object as () => { width: number, height: number } },
    canMaximize: { type: Boolean },
    style: { type: Object as () => WindowStyle },
    showPos: { type: Boolean },
});

const bgColor = props.style?.bgColor ?? colors.blue.a8;
const windowClass = `tui-window ${bgColor} \
${props.style?.fgColor ?? colors.white.ff}-text`;

const position = useStorage(`${props.windowId}-pos`, props.initialPosition, localStorage);
const minSize = ref({ width: 0, height: 0 });

const windowRef = useTemplateRef<HTMLElement>('window');
const handleRef = useTemplateRef<HTMLElement>('handle');
const windowsStore = useWindowsStore();
const state = computed(() => windowsStore.windows.find(w => w.id === props.windowId));

useEventListener(windowRef, 'pointerdown', () => {
    windowsStore.setActiveWindow(props.windowId);
});

useDraggable(windowRef, {
    handle: handleRef,
    preventDefault: true,
    onMove(cursorPos, _event) {
        if (!windowRef.value) return;
        const maxX = document.documentElement.clientWidth - windowRef.value?.clientWidth;
        const maxY = document.documentElement.clientHeight - windowRef.value?.clientHeight - 22;
        position.value = {
            x: clamp(Math.round(cursorPos.x / snapX) * snapX, 0, maxX),
            y: clamp(Math.round(cursorPos.y / snapY) * snapY, 22, maxY),
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
    } else if (windowRef.value) {
        minSize.value = {
            width: Math.round((windowRef.value.clientWidth + snapX / 3) / snapX) * snapX,
            height: Math.round((windowRef.value.clientHeight + snapY / 3) / snapY) * snapY,
        };
        if (minSize.value.width > windowRef.value.clientWidth) {
            windowRef.value.style.width = `${minSize.value.width}px`;
        }
        if (minSize.value.height > windowRef.value.clientHeight) {
            windowRef.value.style.height = `${minSize.value.height}px`;
        }
    }
});

const onMinimize = () => {
    windowsStore.toggleMinimize(props.windowId);
};
const onMaximize = () => {
    windowsStore.toggleMaximize(props.windowId);
};

const windowStyle = computed(() => {
    let style: CSSProperties = {
            position: 'absolute',
            resize: 'both',
            overflow: 'hidden',
            display: state.value?.isMinimized ? 'none' : undefined,
            left: `${position.value.x}px`,
            top: `${position.value.y}px`,
            minWidth: `${minSize.value.width}px`,
            minHeight: `${minSize.value.height}px`,
            textWrap: 'nowrap',
            zIndex: state.value?.isActive ? '1000' : undefined,
        };
    if (state.value?.isMaximized) {
        style = {
            ...style,
            position: 'relative',
            resize: 'none',
            flexGrow: 1,
            left: 0,
            top: 0,
            width: '100%',
            zIndex: '2000',
        };
    }
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
            <div v-if="showPos" class="tui-fieldset-text right">{{ position.x }}, {{ position.y }}</div>
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