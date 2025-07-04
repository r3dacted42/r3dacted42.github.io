<script setup lang="ts">
import Window from './components/Window.vue';
import { colors } from './utils';
</script>

<template>
  <div id="main-screen" class="tui-screen tui-bg-blue-black bordered">
    <div id="construction-panel" class="tui-panel">
      <div class="tui-panel-content">
        UNDER CONSTRUCTION
      </div>
    </div>
    <Window windowTitle="hi :)" :x="40" :y="40" :windowBgColor="colors.cyan.a8">
      welcome to my portfolio!<br><br>
      <div class="center">
        <a :class="`tui-button ${colors.orange.ff}`" href="https://r3dacted42.github.io/resume" target="_blank">resume</a>
      </div>
    </Window>
  </div>
</template>

<style scoped>
#main-screen {
  height: 100%;
}

#construction-panel {
  position: absolute;
  left: 50vw;
  top: 50vh;
  transform: translate(-50%, -50%);
}
</style>
