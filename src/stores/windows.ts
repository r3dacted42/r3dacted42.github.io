import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { WindowState } from '../types';
import { useStorage } from '@vueuse/core';

export const useWindowsStore = defineStore('windows', () => {
  const windows = ref<WindowState[]>([]);
  const persistentData = useStorage('windowsPersistentData', {
    activeWindowId: "",
    maximizedWindowId: "",
    minimizedWindowIds: [] as string[],
  }, localStorage);
  const maxZIdx = computed(() => windows.value.reduce((h, w) => (w.zIndex > h ? w.zIndex : h), 0));
  const activeWindow = computed(() => windows.value.find(w => w.zIndex === maxZIdx.value));
  const maximizedWindow = computed(() => windows.value.find(w => w.isMaximized));
  const minimizedWindows = computed(() => windows.value.filter(w => w.isMinimized));

  function addWindow(state: WindowState) {
    let existingWindow = windows.value.find(w => w.id === state.id);
    if (!existingWindow) {
      windows.value.push({
        ...state,
        isMinimized: persistentData.value.minimizedWindowIds.includes(state.id),
        isMaximized: persistentData.value.maximizedWindowId === state.id,
        zIndex: persistentData.value.activeWindowId === state.id ? maxZIdx.value : state.zIndex,
      });
    }
  }

  function setActiveWindow(id: string) {
    const activeWindow = windows.value.find(w => w.id === id);
    if (activeWindow) activeWindow.zIndex = maxZIdx.value + 1;
    persistentData.value.activeWindowId = id;
  }

  function toggleMinimize(id: string) {
    const window = windows.value.find(w => w.id === id);
    if (window) {
      window.isMinimized = !window.isMinimized;
      if (window.isMinimized) {
        persistentData.value.minimizedWindowIds.push(id);
        if (persistentData.value.activeWindowId === id) 
          persistentData.value.activeWindowId = "";
        if (window.isMaximized) toggleMaximize(id);
      } else {
        setActiveWindow(id);
        persistentData.value.minimizedWindowIds.splice(
          persistentData.value.minimizedWindowIds.findIndex(mid => mid === id), 1,
        );
      }
    }
  }

  function toggleMaximize(id: string) {
    const window = windows.value.find(w => w.id === id);
    if (window) {
      window.isMaximized = !window.isMaximized;
      if (window.isMaximized) persistentData.value.maximizedWindowId = id;
      else {
        persistentData.value.maximizedWindowId = "";
        if (!window.isMinimized) setActiveWindow(id);
      }
    }
  }

  return {
    windows,
    maxZIdx,
    activeWindow,
    maximizedWindow,
    minimizedWindows,
    addWindow,
    setActiveWindow,
    toggleMinimize,
    toggleMaximize,
  };
});