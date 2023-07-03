<script setup lang="ts">
import Home from './components/Home.vue'
import HelloWorld from './components/HelloWorld.vue'
import RandomColor from './components/RandomColor.vue';
import HlsVideo from './components/video/hlsVideo.vue';
import Menu from './components/menu/index.vue'
import Avatar from './components/image/avatar.vue'
import { computed, ref } from 'vue';
const routes: any = {
  '/': Home,
  '/about': HelloWorld,
  '/random-color': RandomColor,
  '/hls-video': HlsVideo,
  '/avatar': Avatar,
}
const routesTabs: any = [{
  name: 'Home',
  path: '#/',
}, {
  name: 'HelloWorld',
  path: '#/about',
}, {
  name: 'RandomColor',
  path: '#/random-color',
}, {
  name: 'HlsVideo',
  path: '#/hls-video'
}, {
  name: 'Avatar',
  path: '#/avatar'
}]
const currentPath = ref(window.location.hash);
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  console.log(currentPath.value.slice(1), 'currentPath')
  return routes[currentPath.value.slice(1) || '/'] || Home;
})
</script>

<template>
  <!-- <div>
      <a href="#/">Home</a> |
      <a href="#/about">about</a> |
      <a href="#/random-color">RandomColor</a>
    </div> -->
  <div class="app">
    <div></div>
    <div class="aside">
      <Menu :routes="routesTabs" ></Menu>
    </div>
    <div class="header"></div>
    <div class="content">
      <component :is="currentView" :msg="'sss'" />
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  /* align-items: center; */
}
.aside {
  width: 260px;
  /* background: #2a3241; */

  /* 禁止选中文字图片 */
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.aside-header {
  width: 100%;
  margin: 0 auto;
  /* transform: skewY(-15deg); */
  padding: 20px 0;
}
.aside-header img {
  width: 100px;
  height: 100px;
}
.content {
  padding: 20px;
  flex: 1;
}
</style>
