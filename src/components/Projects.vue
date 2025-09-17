<script setup lang="ts">
import Window from './Window.vue';
import { snapX, snapY } from '../constants';
import { computed, onMounted, ref, type CSSProperties } from 'vue';
import { useStorage } from '@vueuse/core';
import type { ProjectData } from '../types';
import { marked } from 'marked';
import { useWindowsStore } from '../stores/windows';

const projects = ref<ProjectData[]>([]);
onMounted(async () => {
    projects.value = await (await fetch("/data/projects.json")).json();
});

const tableStyle: CSSProperties = {
    minWidth: `${snapX * 27}px`,
    width: '100%',
};

const windowsStore = useWindowsStore();
const openProjectIds = useStorage('openProjectIds', [] as string[], localStorage);
const openProjects = computed(() => openProjectIds.value.map(id => projects.value.find(d => d.id === id) as ProjectData)!);

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
    openProjectIds.value.splice(idx, 1);
}
</script>

<template>
    <Window v-if="projects.length > 0" window-id="projects" window-title="my projects" :can-maximize="true"
        :initial-position="{ x: snapX * 2, y: snapY * 12 }" :show-pos="true" :can-close="false">
        <table class="tui-table hovered-cyan" :style="tableStyle">
            <tbody>
                <tr v-for="project in projects">
                    <td @click="openProject(project.id)" style="cursor: pointer;">{{ project.title }}</td>
                </tr>
            </tbody>
        </table>
    </Window>
    <Window v-if="projects.length > 0" v-for="project in openProjects" :window-id="project.id"
        :window-title="project.title" :can-maximize="true" :style="project.windowStyle" :on-close="closeProject">
        <table class="tui-table full-width" border="1">
            <tbody>
                <tr>
                    <td>description</td>
                    <td>{{ project.description }}</td>
                </tr>
                <tr>
                    <td>languages</td>
                    <td>{{project.languages.reduce((p, c) => p.length > 0 ? `${p}, ${c}` : c, "")}}</td>
                </tr>
                <tr v-if="project.homepage">
                    <td>homepage</td>
                    <td><a :href="`${project.homepage}`" target="_blank">{{ project.homepage }}</a></td>
                </tr>
                <tr v-if="project.topics.length > 0">
                    <td>topics</td>
                    <td>{{project.topics.reduce((p, c) => p.length > 0 ? `${p}, ${c}` : c, "")}}</td>
                </tr>
                <tr>
                    <td>repository</td>
                    <td><a :href="`https://github.com/r3dacted42/${project.id}`" target="_blank">
                            {{ `r3dacted42/${project.id}` }}</a></td>
                </tr>
            </tbody>
        </table>
        <div v-html="marked.parse(project.readme)" class="project-readme"></div>
    </Window>
</template>

<style scoped>
.project-readme {
    min-width: 100%;
    width: 100%;
    height: 400px;
}

@media (min-width: 768px) {
    .project-readme {
        min-width: 650px;
    }
}

.project-readme :deep(img) {
    max-width: 100%;
}
</style>