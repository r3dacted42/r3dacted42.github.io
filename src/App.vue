<script setup lang="ts">
import Projects from './components/Projects.vue';
import Screen from './components/Screen.vue';
import Window from './components/Window.vue';
import { colors, snapX, snapY } from './constants';
</script>

<template>
  <Screen :style="{ color: 'blueBlack' }">
    <template #nav-li>
      <li><a href="https://r3dacted42.github.io/resume" target="_blank">resume</a></li>
    </template>
    <template #windows>
      <div id="logo-panel" class="tui-panel">
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
⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠀⠀⠀⠀⠀  r3dacted42</pre>
        </div>
      </div>
      <Window window-id="hi" window-title="hi :)" :initial-position="{ x: snapX * 3, y: snapY * 3 }"
        :style="{ bgColor: colors.cyan.a8 }" :can-maximize="true">
        <pre>hi, i'm priyansh agrahari
welcome to my portfolio!</pre>
      </Window>
      <Window window-id="cat" window-title="meow" :initial-position="{ x: snapX * 7, y: snapY * 10 }"
        :style="{ bgColor: colors.purple.a8 }" :can-maximize="true" :show-pos="true" :is-minimized="true">
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
  left: 50vw;
  top: 50vh;
  transform: translate(-50%, -50%);
}
</style>
