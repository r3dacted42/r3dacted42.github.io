<script setup lang="ts">
import Window from './Window.vue';
import { snapX, snapY } from '../constants';
import projectsData from '../assets/projectsData.json';
import { computed, type CSSProperties } from 'vue';
import { useStorage } from '@vueuse/core';
import type { ProjectData } from '../types';
import { marked } from 'marked';
import { useWindowsStore } from '../stores/windows';

const tableStyle: CSSProperties = {
    minWidth: `${snapX * 21}px`,
    width: '100%',
};

const windowsStore = useWindowsStore();
const openProjectIds = useStorage('openProjectIds', [] as string[], localStorage);
const openProjects = computed(() => openProjectIds.value.map(id => projectsData.find(d => d.id === id) as ProjectData)!);

function openProject(projectId: string) {
    if (openProjectIds.value.findIndex(id => id === projectId) !== -1) {
        windowsStore.setActiveWindow(projectId);
        return;
    }
    openProjectIds.value.push(projectId);
}

function closeProject(projectId: string) {
    const idx = openProjectIds.value.findIndex(id => id === projectId);
    if (idx === -1) return;
    windowsStore.removeWindow(projectId);
    openProjectIds.value.splice(idx, 1);
}
</script>

<template>
    <Window window-id="projects" window-title="my projects" :can-maximize="true"
        :initial-position="{ x: snapX * 2, y: snapY * 12 }" :show-pos="true">
        <table class="tui-table hovered-cyan" :style="tableStyle">
            <tbody>
                <tr v-for="project in projectsData">
                    <td @click="openProject(project.id)">{{ project.title }}</td>
                    <td @click="closeProject(project.id)">X</td>
                </tr>
            </tbody>
        </table>
    </Window>
    <Window v-for="project in openProjects" :window-id="project.id" :window-title="project.title" :can-maximize="true"
        :initial-position="{ x: snapX * 5, y: snapY * 12 }" :style="project.windowStyle">
        <div v-html="marked.parse(project.readme)" class="project-readme"></div>
    </Window>
</template>

<style>
.project-readme {
    min-width: 512px;
    width: 100%;
    height: 512px;
}

.project-readme img {
    max-width: calc(min(100%, 65vw));
}

.project-readme :is(h1, h2, h3, h4, h5, h6) {
    text-decoration: underline;
}
</style>