<template>
  <div id="app">
    <LeftNav />
    <Atlas />
    <div class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Enter Values in Steps</h4>
          </div>
          <div class="modal-body">
            <form id="steps-form">
              <div class="form-group" v-for="(team, index) in teams" :id="team.name">
                <label :for="team.name">{{team.name}}:</label>
                <input type="text" v-bind:name="(index+1)" class="form-control team_steps" :id="team.name" :model="team.totalSteps" :value="team.totalSteps" placeholder="Enter Steps for this team.">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" v-on:click="addSteps">Save changes</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div>
</template>

<script>

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
