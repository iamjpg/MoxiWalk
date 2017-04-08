<template>
  <div id="left-nav">
    <div id="logo">
      <i class="material-icons">directions_walk</i>
      <p>We're Walking</p>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  #left-nav {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 20%;
    background: #e5e5e5;
  }
  #logo {
    padding: 50px 0;
    text-align: center;
  }
  #logo i {
    font-size: 50px;
  }
</style>
