<template>
  <div id="left-nav">
    <div id="logo">
      <i class="material-icons">directions_walk</i>
      <p>We're Walking</p>
    </div>
    <div id="zoom-to-teams" v-on:click="zoomToTeams()">
      <span class="label label-primary">Zoom to Teams</span>
    </div>
    <ul>
      <li v-for="team in teams" :class="returnSelected(team)" v-on:click="toggleSelected(team)" :style="returnBackground(team)">
        {{ team.name }}
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
    border-left: 5px solid #ffa500;
  }
  #zoom-to-teams {
    padding: 20px;
    margin: -64px 0 0 0;
    text-align: center;
    cursor: pointer;
  }
</style>
