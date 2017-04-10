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
            <div class="form-group" v-for="team in teams" :id="team.name">
              <label :for="team.name">{{team.name}}:</label>
              <input type="text" class="form-control" :id="team.name" placeholder="Enter Steps for this team.">
            </div>
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

        window.db.allDocs().then(function (result) {
          // Promise isn't supported by all browsers; you may want to use bluebird
          return Promise.all(result.rows.map(function (row) {
            return db.remove(row.id, row.value.rev);
          }));
        }).then(function () {
          $('.form-control').toArray().forEach(function(o, i) {
            var steps = {
              _id: Math.random().toString(36).substring(7),
              timestamp: new Date().toISOString(),
              title: o.id,
              totalSteps: parseInt(o.value)
            };
            window.db.put(steps, function callback(err, result) {
              if (!err) {
                console.log('Successfully posted steps!');
              } else {
                console.log(err)
              }
            });
          })

          setTimeout(function() {
            self.setResult();
          }, 1000)
        }).catch(function (err) {
          // error!
        });



      },
      setRecentSteps: function() {

        const self = this;

        // if (typeof window.db === 'undefined') { return false; }

        this.setResult();

      },
      setResult: function() {
        console.log('whoot')
        const self = this;
        window.db.query(function(doc) {
          console.log(doc)
          emit(doc);
        }).then(function(result) {
          result.rows.forEach(function(o, i) {
            self.teams.forEach(function(a, b) {
              if (a.name === o.key.title) {
                console.log("+++", self.teams[b].totalSteps, o.key.totalSteps)
                self.teams[b].totalSteps = parseInt(o.key.totalSteps);
              }
            })
          })
          self.updated = new Date();
        }).catch(function (err) {
          // you'll get an error here
        })
      }
    }
  }

</script>

<style scoped>
  #app {
    font-family: "Lucida Sans Typewriter", "Lucida Console", monaco, "Bitstream Vera Sans Mono", monospace;
  }
</style>
