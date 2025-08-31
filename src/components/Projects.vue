<script setup lang="ts">
import Window from './Window.vue';
import { snapX, snapY } from '../constants';
import projectsData from '../assets/projectsData.json';
import type { CSSProperties } from 'vue';

const tableStyle: CSSProperties = { 
    minWidth: `${snapX * 21}px`, 
    width: '100%',
};
</script>

<template>
    <Window window-id="projects" window-title="my projects" :can-maximize="true"
        :initial-position="{ x: snapX * 2, y: snapY * 12 }" :show-pos="true">
        <table class="tui-table hovered-cyan" :style="tableStyle">
            <tbody>
                <tr v-for="project in projectsData">
                    <td>{{ project.title }}</td>
                </tr>
            </tbody>
        </table>
    </Window>
</template>