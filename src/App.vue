<template>
  <div id="app">
    <myScroll>
      <router-view />
    </myScroll>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app{
  height: 100%;
}
</style>
