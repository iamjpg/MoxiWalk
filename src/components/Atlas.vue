<template>
  <div id="atlas-container">
    <div id="atlas">

    </div>
  </div>
</template>

<script>

  import Store from '../data/store';
  import Helpers from '../contrib/helpers';

  export default {

    data() {
      return Store
    },

    mounted() {
      requestAnimationFrame(() => {
        this.initMap();
      })
    },

    methods: {
      initMap: function() {
        const self = this;
        const google = window.google;

        // Set the map
        self.map = new google.maps.Map(document.getElementById('atlas'), {
          center: {
            lat: 39.14,
            lng: -98.1,
          },
          zoom: 4,
        });

        // Global map instance.
        window.WalkingMap = this.map;

        // Once listener for what is effectively map loaded.
        google.maps.event.addListenerOnce(window.WalkingMap, 'idle', () => {
          this.drawRoute();
          this.setEvents();
        });

      },
      setEvents: function() {
        google.maps.event.addListener(window.WalkingMap, 'idle', () => {
          this.placeProgressOnMap();
        });
        google.maps.event.addListener(window.WalkingMap, 'bounds_changed', () => {
          $('.were-walking-marker').remove();
        });
      },
      drawRoute: function() {
        const self = this;
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(this.map);
        directionsService.route({
          origin: new google.maps.LatLng(47.6062095, -122.3320708),
          destination: new google.maps.LatLng(38.8942786, -77.4310992),
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        }, function(response, status) {
          // directionsDisplay.setDirections(response);
          self.routePath = new google.maps.Polyline({
            path: [],
            strokeColor: '#ffa500',
            strokeWeight: 6
          })
          var bounds = new google.maps.LatLngBounds();
          var legs = response.routes[0].legs;
          for (let i = 0; i < legs.length; i++) {
            var steps = legs[i].steps;
            for (let j = 0; j < steps.length; j++) {
              var nextSegment = steps[j].path;
              for (let k = 0; k < nextSegment.length; k++) {
                self.routePath.getPath().push(nextSegment[k]);
                bounds.extend(nextSegment[k]);
              }
            }
          }

          self.routePath.setMap(self.map);
          self.map.fitBounds(bounds);
          self.placeProgressOnMap();
        });
      },
      convertStepsToMiles: function(steps) {
        return parseInt(steps) / 2112;
      },
      placeProgressOnMap: function() {
        const self = this;

        self.mileWayPoints = [];

        const origin = new google.maps.LatLng(47.6062095, -122.3320708);

        this.routePath.getPath().getArray().forEach((o, i) => {
          self.mileWayPoints.push(self.getDistance(origin, o))
        });

        this.teams.forEach((o, i) => {
          let index = self.getClosestWayPointIndex(self.mileWayPoints, self.convertStepsToMiles(o.totalSteps))
          self.placeMarker(index, i);
        })
        // window.foo = this.mileWayPoints;
      },
      getDistance: function(p1, p2) {
        var rad = function(x) {
          return x * Math.PI / 180;
        };
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.lat() - p1.lat());
        var dLong = rad(p2.lng() - p1.lng());
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
          Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        var m = d * 0.000621371192
        return m; // returns the distance in miles
      },
      getClosestWayPointIndex: function(array, target) {
        var tuples = _.map(array, function(val) {
          return [val, Math.abs(val - target)];
        });
        var result = _.reduce(tuples, function(memo, val) {
          return (memo[1] < val[1]) ? memo : val;
        }, [-1, 999])[0];

        return _.indexOf(array, result);
      },
      placeMarker: function(pointIndex, teamIndex) {
        const self = this;
        var marker = new google.maps.Marker({
          position: { lat: self.routePath.getPath().getArray()[pointIndex].lat(), lng: self.routePath.getPath().getArray()[pointIndex].lng() },
        });
        Helpers.createAndAppendDiv({
          lat: self.routePath.getPath().getArray()[pointIndex].lat(),
          lng: self.routePath.getPath().getArray()[pointIndex].lng(),
          mapInstance: self.map,
          divId: self.teams[teamIndex].name,
          backgroundIcon: self.teams[teamIndex].backgroundIcon,
          mapContainer: 'atlas'
        });
        this.markersArray.push(marker);
      }
    }

  }
</script>

<style>
  #atlas-container {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 75%;
  }

  #atlas {
    width: 100%;
    height: 100%;
  }

  .were-walking-marker {
    width: 34px;
    height: 34px;
    border-radius: 34px;
    padding: 10px;
    border: 3px solid #dcdcdc;
  }
</style>
