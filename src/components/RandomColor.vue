<script setup lang="ts">
import { ref } from 'vue'
import { compColor, hexToComplimentary, complementryHexColor } from '../utils/color'
let color = ref('#FFFFFF')
let fontColor = ref('#000000')
let font1Color = ref('#000000')
let font2Color = ref('#000000')
let font3Color = ref('#000000')
// let color = '#FFFFFF'

const randomColorFun = () => {
  color.value = `#${Math.random().toString(16).substring(2, 8).toUpperCase()}`
  fontColor.value = colorReverse(color.value)
  console.log(color, fontColor, `0x${color.value.substring(1, 3)}`, `0x${color.value.substring(3, 5)}` , `0x${color.value.substring(5, 7  )}` )
  const a = compColor({ r: `0x${color.value.substring(1, 3)}`, g: `0x${color.value.substring(3, 5)}`, b: `0x${color.value.substring(5, 7  )}` })
  function toHex (ten: any) {
    return ten.toString(16).length === 1 ? `0${ten.toString(16)}` : ten.toString(16);
  }
  font1Color.value = `#${toHex(a.r)}${toHex(a.g)}${toHex(a.b)}`
  console.log(font1Color.value)
  console.log(hexToComplimentary(color.value))
  font2Color.value = hexToComplimentary(color.value)
  console.log(complementryHexColor(color.value))
  font3Color.value = complementryHexColor(color.value)
}

/**
 * 16进制色值获取反色设置方法
 * @param  {String} oldColor 为16进制色值的字符串（例：'#000000'）
 * @return {String} 返回反色的色值（例：'#ffffff'）
 */
const colorReverse = (oldColor: string) => {
  let newColor: any = '0x' + oldColor.replace(/#/g, '');
  let str: string = '000000' + (0xFFFFFF - newColor).toString(16);
  return '#' + str.substring(str.length - 6, str.length);
}
</script>

<template>
  <span>我是背景色({{ color }})</span>
  <div class="color-box" :style="`background-color: ${color};`">
    <br />
    <span :style="`color: ${fontColor}`">我是背景色的反色({{ fontColor }})</span>
    <br />
    <br />
    <span :style="`color: ${font1Color}`">我是背景色的补色1({{ font1Color }})</span>
    <br />
    <br />
    <span :style="`color: ${font2Color}`">我是背景色的补色2({{ font2Color }})</span>
    <br />
    <br />
    <span :style="`color: ${font3Color}`">我是背景色的补色3({{ font3Color }})</span>
    <br />
  </div>

  <button type="button" @click="randomColorFun">随机颜色</button>
</template>

<style scoped>
.color-box {
  width: 100%;
  height: 200px;

}
</style>