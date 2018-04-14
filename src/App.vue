<template>
  <div id="app">
    <LeftNav />
    <Atlas />
    <loader />
  </div>
</template>

<script>
  import Loader from './components/Loader';
  import LeftNav from './components/LeftNav';
  import Atlas from './components/Atlas';
  import Store from './data/store';
  import * as Env from './const/env';

  export default {
    name: 'app',
    data() {
      return Store
    },
    mounted() {
      this.setRecentSteps();
    },
    components: {
      Loader,
      LeftNav,
      Atlas
    },
    methods: {
      addSteps: function() {

        const self = this;

        $('.modal').modal('hide');

        $.ajax({
          url: `${Env.API_BASE_URL}/add_steps`,
          method: 'POST',
          data: $('#steps-form').serialize(),
          success: function(res) {
            res.forEach((o, i) => {
              Store.teams[i].totalSteps = o.team_steps
            })
            $('.were-walking-marker').remove();
            self.updated = new Date();
          },
          error: function(x,y,z) {
            console.log(x,y,z)
          }
        })


      },
      setRecentSteps: function() {

        const self = this;

        this.setResult();

      },
      setResult: function(zoom=false) {
        const self = this;
        // Set results here
      }
    }
  }

</script>

<style scoped>
  #app {
    font-family: "Lucida Sans Typewriter", "Lucida Console", monaco, "Bitstream Vera Sans Mono", monospace;
  }
</style>
