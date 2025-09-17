<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, type CSSProperties, type TemplateRef } from 'vue';
import { barHeight, colorHexMap, colors, minWindowHeight, minWindowWidth, shadowW, snapX, snapY } from '../constants';
import { useDraggable, useEventListener, useStorage, type ElementSize, type Position, type RemovableRef } from '@vueuse/core';
import { clamp, snapR, snapF } from '../utils';
import type { WindowStyle } from '../types';
import { useWindowsStore } from '../stores/windows';

const props = defineProps({
    windowId: { type: String, required: true },
    windowTitle: { type: String, required: true },
    initialPosition: { type: Object as () => Position },
    canMaximize: { type: Boolean, default: true },
    isMinimized: { type: Boolean, default: false },
    canClose: { type: Boolean, default: true },
    onClose: { type: Object as () => ((windowId: string) => void) },
    style: { type: Object as () => WindowStyle },
    showPos: { type: Boolean },
});

const bgColor = props.style?.bgColor ?? colors.blue.a8;
const fgColor = props.style?.fgColor ?? colors.white.ff;
const windowClass = `tui-window window ${bgColor} ${fgColor}-text`;

const position = useStorage(`${props.windowId}-pos`, props.initialPosition ?? { x: 0, y: 0 } as Position, localStorage);
const size = useStorage(`${props.windowId}-sz`, { width: 0, height: 0 } as ElementSize, localStorage);
const contentSize = ref({ width: 0, height: 0 } as ElementSize);

const windowRef = useTemplateRef<HTMLDivElement>('window');
const dragHandleRef = useTemplateRef<HTMLDivElement>('dragHandle');
const resizeHandleRef = useTemplateRef<HTMLDivElement>('resizeHandle');
const contentRef = useTemplateRef<HTMLDivElement>('content');

const windowsStore = useWindowsStore();
const state = computed(() => windowsStore.windows.find(w => w.id === props.windowId));

const maxPosX = () => {
    let res = window.innerWidth - shadowW;
    if (windowRef.value) res -= windowRef.value.clientWidth;
    else res -= minWindowWidth;
    return snapR(res - snapX * 0.25, snapX);
};
const maxPosY = () => {
    let res = window.innerHeight - barHeight - shadowW;
    if (windowRef.value) res -= windowRef.value.clientHeight;
    else res -= minWindowHeight;
    return snapR(res - snapY * 0.25, snapY);
};
const maxWidth = () => snapR(window.innerWidth - position.value.x - shadowW - snapX * 0.25, snapX);
const maxHeight = () => snapR(window.innerHeight - position.value.y - shadowW - barHeight - snapY * 0.25, snapY);

useEventListener(windowRef, 'pointerdown', () => {
    windowsStore.setActiveWindow(props.windowId);
});

useDraggable(windowRef, {
    handle: dragHandleRef,
    capture: true,
    preventDefault: true,
    onMove(cursorPos, _) {
        position.value = {
            x: clamp(snapR(cursorPos.x, snapX), 0, maxPosX()),
            y: clamp(snapR(cursorPos.y, snapY), barHeight, maxPosY()),
        };
    },
});

useDraggable(resizeHandleRef, {
    capture: true,
    preventDefault: true,
    onMove(cursorPos, _) {
        if (!resizeHandleRef.value) return;
        const width = cursorPos.x - position.value.x + resizeHandleRef.value.clientWidth;
        const height = cursorPos.y - position.value.y + resizeHandleRef.value.clientHeight;
        size.value = {
            width: snapF(clamp(width, minWindowWidth, maxWidth()), snapX),
            height: snapF(clamp(height, minWindowHeight, maxHeight()), snapY),
        };
    },
});

function initWindow() {
    windowsStore.addWindow({
        id: props.windowId,
        title: props.windowTitle,
        zIndex: 1,
        isMinimized: false,
        isMaximized: false,
    });
    if (props.isMinimized) windowsStore.toggleMinimize(props.windowId);
    if (!props.initialPosition) {
        const nextPos = {
            x: windowsStore.lastPos.x + snapX * 3,
            y: windowsStore.lastPos.y + snapY * 3,
        } as Position;
        if (nextPos.x >= maxPosX()) nextPos.x = snapX * 3;
        if (nextPos.y >= maxPosY()) nextPos.y = snapY * 3;
        position.value = nextPos;
        windowsStore.setLastPos(nextPos);
    }
    position.value = {
        x: clamp(position.value.x, 0, maxPosX()),
        y: clamp(position.value.y, barHeight, maxPosY()),
    };
    const calcSizeRefInitValue = (
        referenceElementRef: TemplateRef<HTMLDivElement>,
        targetElementRef: TemplateRef<HTMLDivElement>,
        sizeRef: RemovableRef<ElementSize>,
        minSize?: ElementSize,
        sizeOffset?: ElementSize,
    ) => {
        if (!referenceElementRef.value || !targetElementRef.value) return;
        console.log(props.windowId, "width:", snapF(referenceElementRef.value.clientWidth
            + (sizeOffset?.width ?? 0), snapX));
        console.log(props.windowId, "height:", snapF(referenceElementRef.value.clientHeight
            + (sizeOffset?.height ?? 0), snapY));
        sizeRef.value = {
            width: clamp(snapF(referenceElementRef.value.clientWidth
                + (sizeOffset?.width ?? 0), snapX), minSize?.width, maxWidth()),
            height: clamp(snapF(referenceElementRef.value.clientHeight
                + (sizeOffset?.height ?? 0), snapY), minSize?.height, maxHeight()),
        };
        if (sizeRef.value.width > targetElementRef.value.clientWidth) {
            targetElementRef.value.style.width = `${sizeRef.value.width}px`;
        }
        if (sizeRef.value.height > targetElementRef.value.clientHeight) {
            targetElementRef.value.style.height = `${sizeRef.value.height}px`;
        }
    };
    calcSizeRefInitValue(contentRef, contentRef, contentSize);
    calcSizeRefInitValue(contentRef, windowRef, size,
        { width: minWindowWidth, height: minWindowHeight },
        { width: snapX * 5, height: snapY * 4 },
    );
}

onMounted(() => {
    if (!windowsStore.windows.some(w => w.id === props.windowId))
        initWindow();
});

const onClose = () => {
    if (props.onClose) props.onClose(props.windowId);
    windowsStore.removeWindow(props.windowId);
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
            zIndex: windowsStore.windows.length + 1,
            padding: 'unset',
        };
    }
    return style;
});

const contentCSSVars = computed((): CSSProperties => ({
    "--fg-color": colorHexMap[fgColor],
    "--bg-color": colorHexMap[bgColor],
    "--snap-y": `${snapY}px`,
}));
</script>

<template>
    <div ref="window" :id="props.windowId" :class="windowClass" :style="windowStyle">
        <div ref="dragHandle" class="dragHandle"></div>
        <fieldset class="tui-fieldset">
            <legend class="center">{{ props.windowTitle }}</legend>
            <button v-if="props.canClose" v-on:click="onClose" :class="`tui-fieldset-button left ${fgColor}-text`">
                <span class="green-255-text">■</span>
            </button>
            <button v-if="props.canMaximize" v-on:click="onMaximize" :class="`tui-fieldset-button ${fgColor}-text`">
                <span class="green-255-text">{{ state?.isMaximized ? '&darr;' : '&uarr;' }}</span>
            </button>
            <div ref="content" class="content" :style="contentCSSVars">
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
}

.window :deep(*) {
    border-color: var(--fg-color);
    color: var(--fg-color);
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

.content {
    padding: 0;
    min-width: fit-content;
    width: 100%;
    min-height: fit-content;
    height: 100%;
}

.content :deep(:is(h1, h2, h3, h4, h5, h6)) {
    margin-top: var(--snap-y);
    text-decoration: underline;
}

.content :deep(a) {
    display: inline;
    color: var(--bg-color);
    background-color: var(--fg-color);
}

.content :deep(a:hover) {
    text-decoration: underline;
}

.content :deep(:is(ul, li)) {
    margin-left: 9px;
    padding: unset;
    list-style-type: square;
}

.content :deep(code) {
    background-color: black;
    color: chartreuse;
}
</style>