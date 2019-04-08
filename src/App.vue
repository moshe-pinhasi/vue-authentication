<template>
  <div id="app">
    <div id="nav">
      <Header></Header>
      <hr />
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  name: 'App',
  components: {
    Header
  },
  created() {}
};
</script>

<style lang="scss"></style>
