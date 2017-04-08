<template>
  <div id="app">
    <LeftNav />
    <Atlas />
  </div>
</template>

<script>

  import LeftNav from './components/LeftNav';
  import Atlas from './components/Atlas';

  export default {
    name: 'app',
    components: {
      LeftNav,
      Atlas
    }
  }

</script>

<style scoped>
  #app {
    font-family: "Lucida Sans Typewriter", "Lucida Console", monaco, "Bitstream Vera Sans Mono", monospace;
  }
</style>
