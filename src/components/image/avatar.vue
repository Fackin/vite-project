<script setup lang="ts">
// https://juejin.cn/post/7236213437800955959?utm_source=gold_browser_extension
  import { ref, reactive, onMounted, onUnmounted } from 'vue';
  interface State {
  }
  const state: State = reactive({hls: null});


  onMounted(() => {
    console.log('mounted')
    // show()
  })
  onUnmounted(() => {
    console.log('unmounted')
  })

</script>
<template>
  <div class="body-box">
    <div class="profilephoto">
      <svg width="250" height="250">
        <rect class="borderMove">
        </rect>
        <image x="0px" y="0px" width="248px" height="248px" xlink:href="../../assets/image/photo.png" />
      </svg>
    </div>
  </div>
</template>
<style scoped>
/* .body-box {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2e3032;
  height: 100vh;
} */
.profilephoto {
  cursor: pointer;
  position: relative;
}
.borderMove {
  width: 250px;
  height: 250px;
  stroke: #fd7000;
  stroke-width:6px;
  stroke-dashoffset:-200; 
  transition: 1s ease;
  stroke-dasharray: 100 400;
  fill: none;
}
.profilephoto:hover .borderMove {
  stroke-dasharray: 50 0;
  stroke: #ed234c;
  stroke-dashoffset:0; 
  stroke-width:4px;
}
</style>