import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { WindowState } from '../types';
import { useStorage } from '@vueuse/core';

export const useWindowsStore = defineStore('windows', () => {
  const windows = ref<WindowState[]>([]);
  const lastActiveWindowId = useStorage('lastActiveWindowId', "", localStorage);
  const activeWindow = computed(() => windows.value.find(w => w.isActive));
  const maximizedWindow = computed(() => windows.value.find(w => w.isMaximized));
  const minimizedWindows = computed(() => windows.value.filter(w => w.isMinimized));

  function addWindow(state: WindowState) {
    let existingWindow = windows.value.find(w => w.id === state.id);
    if (!existingWindow) {
      windows.value.push(state);
    }
  }

  function setActiveWindow(id: string) {
    windows.value.forEach(w => w.isActive = false);
    const activeWindow = windows.value.find(w => w.id === id);
    if (activeWindow) activeWindow.isActive = true;
    lastActiveWindowId.value = id;
  }

  function toggleMinimize(id: string) {
    const window = windows.value.find(w => w.id === id);
    if (window) {
      window.isMinimized = !window.isMinimized;
      if (window.isMaximized) toggleMaximize(id);
      if (!window.isMinimized) setActiveWindow(id);
    }
  }

  function toggleMaximize(id: string) {
    const window = windows.value.find(w => w.id === id);
    if (window) {
      window.isMaximized = !window.isMaximized;
      if (!window.isMaximized) setActiveWindow(id);
    }
  }

  return {
    windows,
    lastActiveWindowId,
    activeWindow,
    maximizedWindow,
    minimizedWindows,
    addWindow,
    setActiveWindow,
    toggleMinimize,
    toggleMaximize,
  };
});