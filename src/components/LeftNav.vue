<template>
  <div id="left-nav">
    <div id="logo">
      <div>
        <p>Moxi Race</p>
        <p>National Park Tour!</p>
      </div>
    </div>
    <div id="zoom-to-teams" v-on:click="zoomToTeams()">
      <span class="label label-primary">Zoom to Teams</span>
    </div>
    <ul>
      <li v-for="(team, index) in teams" :class="returnSelected(team)" v-on:click="toggleSelected(team)" :style="returnBackground(team)" :key="`${index}-team`">
        {{ team.name }}
      </li>
      <li>
        <table id="credz">
          <tr>
            <td>Made with </td>
            <td><i class="material-icons">favorite</i> </td>
            <td>by JP.</td>
          </tr>
        </table>
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
        if (window.prompt('Enter Password:') === Store.dbPassword) {
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
    background: #fff;
    left: 0;
    top: 0;
    bottom: 0;
    width: 25%;
    -webkit-box-shadow: 5px 0 10px 0 rgba(0,0,0,.3);
    box-shadow: 5px 0 10px 0 rgba(0,0,0,.3);
    z-index: 100;
    overflow-y: auto;
  }
  #logo {
    position: relative;
    background: url('https://i.imgur.com/KiaxIql.jpg') no-repeat center center;
    height: 350px;
    text-align: center;
  }
  #logo div {
    position: absolute;
    top: 40%;
    width: 100%;
    color: #fff;
    font-size: 24px;
    text-shadow: 
    1px 0px 1px #ccc, 0px 1px 1px #000, 
    2px 1px 1px #ccc, 1px 2px 1px #000,
    3px 2px 1px #ccc, 2px 3px 1px #000,
    4px 3px 1px #ccc, 3px 4px 1px #000,
    5px 4px 1px #ccc, 4px 5px 1px #000,
    6px 5px 1px #ccc, 5px 6px 1px #000,
    7px 6px 1px #ccc;
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
    text-align: center;
    cursor: pointer;
  }

  #credz {
    margin: auto;
  }

  #credz td {
    padding: 0 5px;
  }
  #credz td:nth-child(2) {
    color: #f505a6;
  }
  .small {
    font-size: 10px;
    margin-bottom: 0;
    text-align: center;
  }
</style>
