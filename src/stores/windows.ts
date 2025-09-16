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
    if (window.isMinimized) toggleMinimize(id);
    if (window.zIndex >= windows.value.length) return;
    windows.value.forEach(w => { if (w.zIndex > window.zIndex) w.zIndex-- });
    window.zIndex = windows.value.length;
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
  
  function removeWindow(id: string) {
    const window = windows.value.find(w => w.id === id);
    const windowIdx = windows.value.findIndex(w => w.id === id);
    if (windowIdx && window) {
      windows.value.forEach(w => { if (w.zIndex > window.zIndex) w.zIndex-- });
      windows.value.splice(windowIdx, 1);
    }
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
    removeWindow,
  };
});