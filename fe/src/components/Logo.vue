<script setup>
const { size } = defineProps({
  size: {
    required: false,
    type: Number,
    default: 30
  }
})
</script>

<template>
  <span class="logo" :style="{ fontSize: `${size}px` }">
    <router-link to="/" class="logo-content">Sách Vạn Năng</router-link>
  </span>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

.logo {
  font-family: 'Dancing Script', cursive;
  font-weight: 700;

  &-content,
  &-content:hover {
    text-decoration: none;
    color: #000;
    text-wrap: nowrap;
    white-space: nowrap;
    -webkit-text-stroke: 1px #fff;
  }
}
</style>
