<script setup lang="ts">
import Screen from './components/Screen.vue';
import Window from './components/Window.vue';
import { colors } from './constants';
</script>

<template>
  <Screen :style="{ color: 'blueBlack' }">
    <div id="construction-panel" class="tui-panel">
      <div class="tui-panel-content">
        UNDER CONSTRUCTION ^._.^
      </div>
    </div>
    <Window window-id="hi" window-title="hi :)" :initial-position="{ x: 40, y: 40 }"
      :style="{ bgColor: colors.cyan.a8 }" :can-maximize="true">
      welcome to my portfolio!<br><br>
      <div class="center">
        <a :class="`tui-button ${colors.orange.ff}`" href="https://r3dacted42.github.io/resume"
          target="_blank">resume</a>
      </div>
    </Window>
    <Window window-id="cat" window-title="meow" :initial-position="{ x: 60, y: 105 }"
      :style="{ bgColor: colors.purple.a8 }" :can-maximize="true">
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
  </Screen>
</template>

<style scoped>
#construction-panel {
  position: absolute;
  left: 50vw;
  top: 50vh;
  transform: translate(-50%, -50%);
}
</style>
