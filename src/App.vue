<template>
  <div id="app">
  <router-view name="menu"></router-view>
  <router-view></router-view>
  <div class="container">
  </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
@import "./assets/all";
</style>
