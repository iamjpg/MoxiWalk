<template>
  <div id="left-nav">
    <div id="logo">
      <i class="material-icons">directions_walk</i>
      <p>Moxi Race 2017</p>
    </div>
    <div id="zoom-to-teams" v-on:click="zoomToTeams()">
      <span class="label label-primary">Zoom to Teams</span>
    </div>
    <ul>
      <li v-for="team in teams" :class="returnSelected(team)" v-on:click="toggleSelected(team)" :style="returnBackground(team)">
        {{ team.name }}
      </li>
      <li v-on:click="initUpdateSteps()">
        Update Steps for Teams
      </li>
    </ul>
  </div>
</template>

<script>
  import Store from '../data/store';

  export default {
    data() {
      return Store
    },

    methods: {
      returnSelected: function(name) {
        const x = (name.selected) ? 'selected' : '';
        return x;
      },
      toggleSelected: function(team) {
        const x = (team.selected) ? false : true;
        team.selected = x;
        let teamMarkerId = team.name.toLowerCase().replace(/\W/g, '');
        let displayProp = (team.selected) ? 'block' : 'none';
        $(`#${teamMarkerId}`).css('display', displayProp);
      },
      returnBackground: function(team) {
        return `background: url('${team.backgroundIcon}') no-repeat 15px center`;
      },
      zoomToTeams: function() {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < this.markersArray.length; i++) {
         bounds.extend(this.markersArray[i].getPosition());
        }
        window.WalkingMap.fitBounds(bounds);
      },
      initUpdateSteps: function() {
        if (window.prompt('Enter Password:')) {
          $('.modal').modal('show');
        } else {
          alert('Password was incorrect.');
        }
      }
    }
  }
</script>

<style scoped>
  #left-nav {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 25%;
    background: #fff;
    -webkit-box-shadow: 5px 0 10px 0 rgba(0,0,0,.3);
    box-shadow: 5px 0 10px 0 rgba(0,0,0,.3);
    z-index: 100;
    overflow-y: auto;
  }
  #logo {
    padding: 50px 0;
    text-align: center;
  }
  #logo i {
    font-size: 50px;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    padding: 10px 30px 10px 50px;
    border-left: 5px solid #fff;
    border-bottom: 1px solid #dcdcdc;
    cursor: pointer;
  }
  li:first-child {
    border-top: 1px solid #dcdcdc;
  }
  li:hover {
    background: #f5f5f5;
  }
  li.selected {
    border-left: 5px solid #f505a6;
  }
  li:last-child {
    border-top: 1px solid #dcdcdc;
    border-right: 0;
    border-bottom: 1px solid #dcdcdc;
    border-left: 0;
    margin-top: 50px;
    padding-left: 20px;
    width: 100%;
  }
  #zoom-to-teams {
    padding: 20px;
    margin: -64px 0 0 0;
    text-align: center;
    cursor: pointer;
  }
</style>
