<script setup lang="ts">
import type { CSSProperties } from 'vue';
import Projects from './components/Projects.vue';
import Screen from './components/Screen.vue';
import Window from './components/Window.vue';
import { colors, screenColors, snapX, snapY } from './constants';
import { snapF } from './utils';

const logoPanelStyle: CSSProperties = {
  top: `${snapF(window.innerHeight / 2, snapY)}px`,
  left: `${snapF(window.innerWidth / 2, snapX)}px`,
};
</script>

<template>
  <Screen :style="{ color: screenColors.blueBlack }">
    <template #nav-li>
      <li><a href="https://r3dacted42.github.io/resume" target="_blank">resume</a></li>
    </template>
    <template #windows>
      <div id="logo-panel" :style="logoPanelStyle" class="tui-panel">
        <div class="tui-panel-content">
          <pre>⠀⠀⠀⢠⣾⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣰⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢰⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⣄⣀⣀⣤⣤⣶⣾⣿⣿⣿⡷
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀
⣿⣿⣿⡇⠀⡾⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⠀⠀⠀⠀
⣿⣿⣿⣧⡀⠁⣀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠉⢹⠉⠙⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣀⠀⣀⣼⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠀⠤⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⠿⠋⢃⠈⠢⡁⠒⠄⡀⠈⠁⠀⠀⠀⠀⠀⠀⠀
⣿⣿⠟⠁⠀⠀⠈⠉⠉⠁⠀⠀⠀⠀⠈⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠀⠀⠀⠀⠀   r3dacted42</pre>
        </div>
      </div>
      <Window window-id="hi" window-title="hi :)" :initial-position="{ x: snapX * 3, y: snapY * 3 }"
        :style="{ bgColor: colors.cyan.a8 }" :can-close="false">
        <pre>hi, i'm priyansh agrahari
welcome to my portfolio!</pre>
      </Window>
      <Window window-id="cat" window-title="meow" :initial-position="{ x: snapX * 7, y: snapY * 10 }"
        :style="{ bgColor: colors.purple.a8 }" :show-pos="true" :is-minimized="true" :can-close="false">
        <pre>⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡿⢟⠿⣿⣿⣿⣿⣿⣿⣿⣿⡟⣡⣿⣷⣌⡻⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡿⢋⣴⣿⣷⣝⣿⣿⣿⣿⣿⣿⢋⣼⣿⣿⣿⣿⣿⣌⢻⣿⣿⣿⣿⣿
⣿⣿⣿⠟⣴⣿⣿⣿⣿⣭⣤⣦⣤⣴⣮⣴⣿⣿⣿⣿⣿⣿⣿⣿⣦⠹⣿⣿⣿⣿
⣿⣿⢋⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡹⣿⣿⣿
⣿⠇⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠙⣿⣿
⡿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⢹⣿
⡇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿
⡇⠛⣛⠛⠛⠛⣉⣻⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⣶⣶⠀⠀⠀⢠⣤⣿⣿⣿⢸⣿
⣷⠸⣿⣄⠀⢀⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣀⣀⣼⣿⣿⣿⠏⣾⣿
⣿⣷⣌⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⡭⢛⣛⠻⣿⣿⠟⣫⣾⣿⣿
⣿⣿⣿⣷⣦⣍⣛⠻⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⢇⣴⣿⣿⣷⢈⣴⣾⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⣾⣿⣿⡶⢠⣶⣶⣶⣶⣶⣶⣾⣿⣿⡿⢋⣼⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣧⡛⠿⠟⣰⣿⣿⣿⣿⣿⣿⣛⡛⢩⣵⣶⣿⡋⡙⠛⣋⢹⣿⣿
⣿⢿⣿⣿⣿⣿⣿⣿⣿⢰⣿⣿⣿⣿⣿⣿⣿⣿⡇⣸⣿⣿⡿⢃⣽⣿⣧⡘⢿⣿</pre>
      </Window>
      <Projects />
    </template>
  </Screen>
</template>

<style scoped>
#logo-panel {
  position: absolute;
  transform: translate(-50%, -50%);
}
</style>
