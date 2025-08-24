<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, type CSSProperties } from 'vue';
import { colors, shadowW, snapX, snapY } from '../constants';
import { useDraggable, useEventListener, useResizeObserver, useStorage } from '@vueuse/core';
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
const windowClass = `tui-window window ${bgColor} \
${props.style?.fgColor ?? colors.white.ff}-text`;

const position = useStorage(`${props.windowId}-pos`, props.initialPosition, localStorage);
const minSize = ref({ width: 0, height: 0 });
const size = useStorage(`${props.windowId}-sz`, props.minSize ?? {
    width: 0,
    height: 0,
}, localStorage);

const windowResizerRef = useTemplateRef<HTMLDivElement>('windowResizer');
const isBeingResized = ref(false);
const windowRef = useTemplateRef<HTMLDivElement>('window');
const handleRef = useTemplateRef<HTMLDivElement>('handle');
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

useResizeObserver(windowResizerRef, (entries) => {
    if (state.value?.isMaximized || !isBeingResized.value) return;
    const windowResizer = entries[0];
    const { width, height } = windowResizer.contentRect;
    if (!state.value?.isActive) windowsStore.setActiveWindow(props.windowId);
    size.value = {
        width: Math.floor((width + 0.1) / snapX) * snapX,
        height: Math.floor((height + 0.1) / snapY) * snapY,
    };
});


useEventListener(windowResizerRef, 'pointerdown', (_) => {
    isBeingResized.value = true;
});
useEventListener(windowResizerRef, 'pointerup', (_) => {
    isBeingResized.value = false;
    if (!windowResizerRef.value) return;
    windowResizerRef.value.style.width = `${size.value.width + shadowW}px`;
    windowResizerRef.value.style.height = `${size.value.height + shadowW}px`;
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
        if (size.value.width == 0 || size.value.height == 0)
            size.value = minSize.value;
    } else if (windowRef.value) {
        minSize.value = {
            width: Math.floor((windowRef.value.clientWidth + snapX * 0.75) / snapX) * snapX,
            height: Math.floor((windowRef.value.clientHeight + snapY * 0.75) / snapY) * snapY,
        };
        if (size.value.width == 0 || size.value.height == 0)
            size.value = minSize.value;
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

const windowResizerStyle = computed(() => {
    let style: CSSProperties = {
        display: state.value?.isMinimized ? 'none' : undefined,
        left: `${position.value.x}px`,
        top: `${position.value.y}px`,
        minWidth: `${minSize.value.width + shadowW}px`,
        minHeight: `${minSize.value.height + shadowW}px`,
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
            padding: 'unset',
        };
    }
    return style;
});

const windowStyle = computed(() => {
    let style: CSSProperties = {
        display: state.value?.isMinimized ? 'none' : undefined,
        width: windowResizerRef.value ? `${size.value.width}px` : undefined,
        height: windowResizerRef.value ? `${size.value.height}px` : undefined,
        zIndex: state.value?.isActive ? '1000' : undefined,
    };
    if (state.value?.isMaximized) {
        style = {
            ...style,
            width: '100%',
            height: '100%',
            zIndex: '2000',
        };
    }
    return style;
});
</script>

<template>
    <div ref="windowResizer" :id="props.windowId + 'Resizer'" class="windowResizer" :style="windowResizerStyle">
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
                <div class="content">
                    <slot></slot>
                </div>
                <div v-if="showPos" class="tui-fieldset-text right">{{ position.x }}, {{ position.y }}</div>
            </fieldset>
        </div>
    </div>
</template>

<style lang="css" scoped>
.windowResizer {
    position: absolute;
    overflow: hidden;
    resize: both;
    padding-bottom: 10px;
    padding-right: 10px;
}

.window {
    display: flex;
    flex-direction: column;
    align-items: stretch;
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
    width: 100%;
}

.content {
    overflow: auto;
}
</style>