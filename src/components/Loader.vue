<template>
<div id="loader-container">
  <div id="spinner"></div>
  <div id="loader-message">
    We're hearding cats, here. Seriously though, we're waiting on 20 waypoints to return from Google for this race. It will load eventually, I promise.
  </div>
</div>
</template>

<script>
  import { Spinner } from 'spin.js';
  import Store from '../data/store';

  export default {
    name: 'loader',
    data() {
      return Store
    },
    mounted() {
      this.showLoader();
    },
    watch: {
      'loader': function() {
        if (!this.loader) {
          $('#loader-container').hide();
        }
      }
    },
    methods: {
      showLoader: function() {
        let target = document.getElementById('spinner');
        let spinner = new Spinner({
          lines: 10, // The number of lines to draw
          length: 20, // The length of each line
          width: 5, // The line thickness
          radius: 50, // The radius of the inner circle
          scale: 1, // Scales overall size of the spinner
          corners: 1, // Corner roundness (0..1)
          color: '#ffffff', // CSS color or array of colors
          fadeColor: 'transparent', // CSS color or array of colors
          opacity: 0.25, // Opacity of the lines
          rotate: 0, // The rotation offset
          direction: 1, // 1: clockwise, -1: counterclockwise
          speed: 1, // Rounds per second
          trail: 60, // Afterglow percentage
          fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          className: 'spinner', // The CSS class to assign to the spinner
          top: '50%', // Top position relative to parent
          left: '50%', // Left position relative to parent
          shadow: 'none', // Box-shadow for the lines
          position: 'absolute' // Element positioning
        }).spin(target);
      }
    }
  }

</script>

<style scoped>
#loader-container {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 75%;
  z-index: 100;
  display: block;
  background: rgba(0,0,0,0.8)
}
#loader-message {
  color: #fff;
  position: relative;
  top: 60%;
  z-index: 11;
  width: 50%;
  margin: auto;
}
</style>
