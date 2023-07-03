<!-- https://juejin.cn/post/7142876546489909285 -->
<script setup lang="ts">
interface RouteImp {
  name: string,
  path: string,
}
const props = defineProps<{ routes: Array<RouteImp> }>()

console.log('routes', props.routes)
</script>

<template>
  <div class="menu-box">
    <ul>
      <!-- <a v-for="(route, index) in routes" :key="index" :href="route.path">
        <li :style="`--i:${routes.length - index};`">
          {{ route.name }}
        </li>
      </a> -->

      <li v-for="(route, index) in routes" :key="index" :style="`--i:${routes.length - index};`">
        <a :href="route.path">
          {{ route.name }}
        </a>
      </li>
    </ul>
    <!-- <a href="#/">Home</a> |
        <a href="#/about">about</a> |
        <a href="#/random-color">RandomColor</a> -->
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.menu-box {
  display: flex;
  justify-content: flex-end;
  padding-top: 73px;
  /* min-height: 100%; */
  /* background: #2a3241; */
  /* width: 240px; */
  font-family: sans-serif;
}

ul {
  position: relative;
  transform: skewY(-15deg);
}

li {
  position: relative;
  list-style: none;
  width: 200px;
  background: #3e3f46;
  padding: 15px;
  z-index: var(--i);
  transition: .5s;
}

li::before {
  content: '';
  position: absolute;
  top: 0;
  left: -40px;
  width: 40px;
  height: 100%;
  background: #35383e;
  transform-origin: right;
  transform: skewY(45deg);
  transition: .5s;
}

li::after {
  content: '';
  position: absolute;
  top: -40px;
  left: 0;
  width: 100%;
  height: 40px;
  background: #35383e;
  transform-origin: bottom;
  transform: skewX(45deg);
  transition: .5s;
}

li:hover {
  background: #33a3ee;
  transform: translate(50px);
}

li:hover::before {
  background: #2982b9;
}

li:hover::after {
  background: #1f5378;
}

li:last-child::after {
  box-shadow: -100px 100px 20px rgba(0, 0, 0, .25);
}

a {
  text-decoration: none;
  color: #ccc;
  display: block;
  text-transform: uppercase;
  letter-spacing: .05em;
  transition: .5s;
}

a:hover {
  color: #fff;
}
</style>
