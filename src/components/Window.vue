<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, type CSSProperties, type TemplateRef } from 'vue';
import { barHeight, colors, minWindowHeight, minWindowWidth, shadowW, snapX, snapY } from '../constants';
import { useDraggable, useEventListener, useStorage, type RemovableRef } from '@vueuse/core';
import { clamp } from '../utils';
import type { WindowStyle } from '../types';
import { useWindowsStore } from '../stores/windows';

const props = defineProps({
    windowId: { type: String, required: true },
    windowTitle: { type: String, required: true },
    initialPosition: { type: Object as () => { x: number, y: number }, required: true },
    canMaximize: { type: Boolean },
    style: { type: Object as () => WindowStyle },
    showPos: { type: Boolean },
});

const bgColor = props.style?.bgColor ?? colors.blue.a8;
const windowClass = `tui-window window ${bgColor} \
${props.style?.fgColor ?? colors.white.ff}-text`;

const position = useStorage(`${props.windowId}-pos`, props.initialPosition, localStorage);
const size = useStorage(`${props.windowId}-sz`, { width: 0, height: 0 }, localStorage);
const contentSize = ref({ width: 0, height: 0 });

const windowRef = useTemplateRef<HTMLDivElement>('window');
const dragHandleRef = useTemplateRef<HTMLDivElement>('dragHandle');
const resizeHandleRef = useTemplateRef<HTMLDivElement>('resizeHandle');
const contentRef = useTemplateRef<HTMLDivElement>('content');

const windowsStore = useWindowsStore();
const state = computed(() => windowsStore.windows.find(w => w.id === props.windowId));

const maxX = computed(() => {
    let res = document.documentElement.clientWidth - shadowW;
    if (windowRef.value) res -= windowRef.value.clientWidth;
    return (Math.round((res - snapX * 0.25) / snapX) * snapX);
});
const maxY = computed(() => {
    let res = document.documentElement.clientHeight - barHeight - shadowW;
    if (windowRef.value) res -= windowRef.value.clientHeight;
    return (Math.round((res - snapY * 0.25) / snapY) * snapY);
});

useEventListener(windowRef, ['touchstart', 'pointerdown'], () => {
    windowsStore.setActiveWindow(props.windowId);
});

useDraggable(windowRef, {
    handle: dragHandleRef,
    preventDefault: true,
    onMove(cursorPos, _) {
        position.value = {
            x: clamp(Math.round(cursorPos.x / snapX) * snapX, 0, maxX.value),
            y: clamp(Math.round(cursorPos.y / snapY) * snapY, barHeight, maxY.value),
        };
    },
});

useDraggable(resizeHandleRef, {
    preventDefault: true,
    onMove(cursorPos, _) {
        if (!resizeHandleRef.value) return;
        const width = cursorPos.x - position.value.x + resizeHandleRef.value.clientWidth;
        const height = cursorPos.y - position.value.y + resizeHandleRef.value.clientHeight;
        const maxWidth = maxX.value - position.value.x;
        const maxHeight = maxY.value - position.value.y;
        size.value = {
            width: clamp(Math.round(width / snapX) * snapX, minWindowWidth, maxWidth),
            height: clamp(Math.round(height / snapY) * snapY, minWindowHeight, maxHeight),
        };
    },
});

onMounted(() => {
    windowsStore.addWindow({
        id: props.windowId,
        title: props.windowTitle,
        zIndex: 1,
        isMinimized: false,
        isMaximized: false,
    });
    position.value = {
        x: clamp(position.value.x, 0, maxX.value),
        y: clamp(position.value.y, barHeight, maxY.value),
    };
    const calcSizeRefInitValue = (
        referenceElementRef: TemplateRef<HTMLDivElement>,
        targetElementRef: TemplateRef<HTMLDivElement>,
        sizeRef: RemovableRef<{ width: number, height: number }>,
        sizeOffset?: { width: number, height: number },
    ) => {
        if (!referenceElementRef.value || !targetElementRef.value) return;
        sizeRef.value = {
            width: clamp(Math.floor((referenceElementRef.value.clientWidth) / snapX) * snapX,
                minWindowWidth,
                document.documentElement.clientWidth - shadowW),
            height: clamp(Math.floor((referenceElementRef.value.clientHeight) / snapY) * snapY,
                minWindowHeight,
                document.documentElement.clientHeight - barHeight - shadowW),
        };
        if (sizeRef.value.width > targetElementRef.value.clientWidth) {
            targetElementRef.value.style.width = `${sizeRef.value.width + (sizeOffset ? sizeOffset.width : 0)}px`;
        }
        if (sizeRef.value.height > targetElementRef.value.clientHeight) {
            targetElementRef.value.style.height = `${sizeRef.value.height + (sizeOffset ? sizeOffset.height : 0)}px`;
        }
    };
    calcSizeRefInitValue(contentRef, contentRef, contentSize);
    if (size.value.width == 0 || size.value.height == 0) {
        calcSizeRefInitValue(contentRef, windowRef, size, { width: 18 * 4, height: 22 * 2 });
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
        display: state.value?.isMinimized ? 'none' : undefined,
        left: `${position.value.x}px`,
        top: `${position.value.y}px`,
        width: `${size.value.width}px`,
        height: `${size.value.height}px`,
        zIndex: state.value?.zIndex,
    };
    if (state.value?.isMaximized) {
        style = {
            ...style,
            position: 'relative',
            flexGrow: 1,
            left: 0,
            top: 0,
            width: '100%',
            zIndex: windowsStore.maxZIdx + 1,
            padding: 'unset',
        };
    }
    return style;
});
</script>

<template>
    <div ref="window" :id="props.windowId" :class="windowClass" :style="windowStyle">
        <div ref="dragHandle" class="dragHandle"></div>
        <fieldset class="tui-fieldset">
            <legend class="center">{{ props.windowTitle }}</legend>
            <button v-on:click="onMinimize" class="tui-fieldset-button left">
                <span class="green-255-text">■</span>
            </button>
            <button v-if="props.canMaximize" v-on:click="onMaximize" class="tui-fieldset-button">
                <span class="green-255-text">{{ state?.isMaximized ? '&darr;' : '&uarr;' }}</span>
            </button>
            <div ref="content" class="content">
                <slot></slot>
            </div>
            <div v-if="showPos" class="tui-fieldset-text right">{{ position.x }}, {{ position.y }}</div>
        </fieldset>
        <div ref="resizeHandle" class="resizeHandle"></div>
    </div>
</template>

<style lang="css" scoped>
.window {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.dragHandle {
    cursor: move;
    touch-action: none;
    position: absolute;
    top: 0px;
    left: 18px;
    right: 18px;
    height: 22px;
    /* background-color: #00000042; */
}

.resizeHandle {
    cursor: nwse-resize;
    touch-action: none;
    position: absolute;
    bottom: 0px;
    right: 0px;
    height: 32px;
    width: 22px;
    /* background-color: #00000042; */
}

fieldset {
    min-width: unset;
    height: 100%;
    overflow: auto;
}
</style>