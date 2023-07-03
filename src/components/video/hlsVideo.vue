<script setup lang="ts">
  // let Hls = require('hls.js');
  import Hls from 'hls.js';
  import { ref, reactive, onMounted, onUnmounted } from 'vue';
  interface State {
    hls: any,
  }
  const state: State = reactive({hls: null});
  const video = ref()
  const input = ref();


  onMounted(() => {
    console.log('mounted', state.hls)
    // show()
  })
  onUnmounted(() => {
    if (Hls && state.hls) {
      state.hls.destroy();
    }
    console.log('unmounted', state.hls)
  })
  const show = () => {
    if (Hls.isSupported()) {
      state.hls = new Hls();
      state.hls.loadSource('https://xy218x24x83x250xy.mcdn.bilivideo.cn:486/live-bvc/906647/live_26654127_bs_6494783_minihevc/index.m3u8?expires=1681378861&len=0&oi=1928798785&pt=web&qn=0&trid=100743c971c439f9409caecce3fa9c73792d&sigparams=cdn,expires,len,oi,pt,qn,trid&cdn=cn-gotcha16&sign=65dd271f03eacbff5f261eff5c2eb694&sk=e6d0886b02b09fc7eae73c9a94740c39&flvsk=13ed776a0ca222a516d62e27f0db34c5&p2p_type=1&sl=6&free_type=0&mid=317966832&sid=mcdn-ydzd-lnsy-cu-1002311&chash=0&bmt=1&sche=ban&bvchls=1&score=11&pp=rtmp&source=onetier&trace=a1&site=87f9f19da7a111f727cbac49e8f769dd&order=1');
      state.hls.attachMedia(video.value);
      state.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('加载成功')
        video.value.play();
      })
      state.hls.on(Hls.Events.ERROR, (event: any, data: any) => {
        console.log(event, data)
        console.log('加载失败')
      })
    } else {
      console.log('不支持的格式')
      return
    }
  }

  const cancelVideo = () => {
    if (Hls) {
      video.value.pause();
      state.hls.destroy();
      state.hls = null
    }
  }

</script>
<template>
  <div>
    <button @click="cancelVideo">关闭</button>
    <button @click="show">开始</button>
  </div>
  <input ref="input"/>
  <video controls autoplay muted width="600" height="450" class="video" ref="video"></video>
</template>
<style scoped></style>