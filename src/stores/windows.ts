import { defineStore } from 'pinia';
import { computed } from 'vue';
import type { WindowState } from '../types';
import { useStorage } from '@vueuse/core';

export const useWindowsStore = defineStore('windows', () => {
  const windows = useStorage('windows', [] as WindowState[], localStorage);
  const activeWindow = computed(() => windows.value.find(w => w.zIndex === windows.value.length));
  const maximizedWindow = computed(() => windows.value.find(w => w.isMaximized));
  const minimizedWindows = computed(() => windows.value.filter(w => w.isMinimized));

  function addWindow(state: WindowState) {
    let existingWindow = windows.value.find(w => w.id === state.id);
    if (!existingWindow) windows.value.push({
      ...state, zIndex: windows.value.length + 1,
    });
    else setActiveWindow(state.id);
  }

  function setActiveWindow(id: string) {
    const window = windows.value.find(w => w.id === id);
    if (!window) return;
    if (window.zIndex >= windows.value.length) return;
    window.zIndex = windows.value.length + 1;
    windows.value.forEach(w => w.zIndex -= 1);
  }

  function toggleMinimize(id: string) {
    const window = windows.value.find(w => w.id === id);
    if (window) {
      window.isMinimized = !window.isMinimized;
      if (window.isMinimized) {
        if (window.isMaximized) toggleMaximize(id);
      } else setActiveWindow(id);
    }
  }

  function toggleMaximize(id: string) {
    const window = windows.value.find(w => w.id === id);
    if (window) window.isMaximized = !window.isMaximized;
  }

  return {
    windows,
    activeWindow,
    maximizedWindow,
    minimizedWindows,
    addWindow,
    setActiveWindow,
    toggleMinimize,
    toggleMaximize,
  };
});