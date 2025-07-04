<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { UseDraggable as Draggable } from '@vueuse/components';
import { colors } from '../utils';

const props = defineProps({
    windowTitle: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    closable: { type: Boolean },
    onClose: { type: Object as () => CallableFunction },
    windowBgColor: { type: String },
    windowFgColor: { type: String },
});

const handle = useTemplateRef<HTMLElement>('handle');
const clampFloor = (n: number) => Math.max(0, Math.floor(n));

const bgColor = props.windowBgColor ?? colors.blue.a8;
const fgColor = props.windowFgColor ?? colors.white.ff;
const windowClass = `tui-window ${bgColor} ${fgColor}-text`;
</script>

<template>
    <Draggable :class="windowClass" v-slot="{ x, y }" :initial-value="{ x: props.x, y: props.y }"
        :storage-key="props.windowTitle" storage-type="session" :handle="handle">
        <fieldset :title="props.windowTitle" class="tui-fieldset">
            <legend ref="handle">{{ props.windowTitle }}</legend>
            <button v-if="props.closable" v-on:click="" class="tui-fieldset-button">
                <span>■</span>
            </button>
            <slot></slot>
            <div class="tui-fieldset-text right">{{ clampFloor(x / 12) }}, {{ clampFloor(y / 18) }}</div>
        </fieldset>
    </Draggable>
</template>

<style lang="css" scoped>
legend {
    cursor: move;
}
</style>