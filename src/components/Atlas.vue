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

    watch: {
      'updated': function() {
        this.placeProgressOnMap();
      }
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
          this.setStartEndMarkers();
          this.placeProgressOnMap();
        });
        google.maps.event.addListener(window.WalkingMap, 'bounds_changed', () => {
          $('#left-nav li').not('#left-nav li:last').addClass('selected');
          $('.were-walking-marker, .start-end-marker').remove();
          $('.popover').remove();
        });
      },
      drawRoute: function() {
        const self = this;
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(this.map);
        this.legs = [];
        this.routePath = new google.maps.Polyline({
          path: [],
          strokeColor: '#f505a6',
          strokeWeight: 2
        });

        let count = 0;
        let googleInterval = setInterval(() => {
          directionsService.route({
            origin: new google.maps.LatLng(this.routes[count][0].lat, this.routes[count][0].lng),
            destination: new google.maps.LatLng(this.routes[count][1].lat, this.routes[count][1].lng),
            travelMode: google.maps.DirectionsTravelMode.WALKING
          }, function(response, status) {
            //console.log(response)
            response.routes[0].legs.forEach((a, b) => {
              self.legs.push(a)
            })
          });
          count = count + 1;
          //console.log(count, this.routes.length)
          if (count >= this.routes.length) {
            clearInterval(googleInterval);
            this.loader = false;
            setTimeout(() => { this.finishRoute(); }, 500);
          }
        }, 800);
      },
      finishRoute: function () {
        let self = this;
        let bounds = new google.maps.LatLngBounds();
        let legs = this.legs;
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
        this.routePath.setMap(self.map);
        this.map.fitBounds(bounds);
        const polyLengthInMeters = google.maps.geometry.spherical.computeLength(this.routePath.getPath().getArray());
        this.polyLengthInMiles = Math.round(polyLengthInMeters * 0.00062137);
      },
      convertStepsToMiles: function(steps) {
        return parseInt(steps) / 2112;
      },
      placeProgressOnMap: function() {
        const self = this;

        if (!this.routePath) {
          return false;
        }

        $('.were-walking-marker').remove();

        self.mileWayPoints = window.mileWayPoints = [];

        let origin = new google.maps.LatLng(47.6032365, -122.33675619999997);
        let distance = 0;

        self.mileWayPoints.push(self.getDistance(origin, {
          lat: function() {
            return 47.6032365
          },
          lng: function() {
            return -122.33675619999997
          }
        }))

        this.routePath.getPath().getArray().forEach((o, i) => {
          let tmp_distance = self.getDistance(origin, o);
          distance = tmp_distance + self.mileWayPoints[self.mileWayPoints.length-1]
          self.mileWayPoints.push(distance)
          origin = new google.maps.LatLng(o.lat(), o.lng());
        });

        this.teams.forEach((o, i) => {
          if (i === 2) {
            self.getClosestPoint(parseFloat(self.teams[i].totalSteps * 0.8), i);
          } else {
            self.getClosestPoint(parseFloat(self.teams[i].totalSteps), i);
          }
        })
      },
      getClosestPoint: function(totalMiles, teamIndex) {
        const self = this;
        $(this.mileWayPoints).each((i, o) => {
          if (parseInt(totalMiles) >= (parseInt(o) - 5) && parseInt(totalMiles) <= (parseInt(o) + 5)) {
            self.placeMarker(i, teamIndex);
            return false;
          }
        })
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
        if (!this.routePath.getPath().getArray()[pointIndex]) {
          return false;
        }
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
          mapContainer: 'atlas',
          teamName: self.teams[teamIndex].name,
          totalMiles: (teamIndex === 2) ? parseFloat(self.teams[teamIndex].totalSteps * 0.8).toFixed(2) : parseFloat(self.teams[teamIndex].totalSteps.toFixed(2))
        });
        this.markersArray.push(marker);
        this.setPopoverEvents();
      },
      setPopoverEvents: function() {
        $('.were-walking-marker, .start-end-marker').popover();
        $('.were-walking-marker, .start-end-marker').on('click', function (e) {
          $('.were-walking-marker, .start-end-marker').not(this).popover('hide');
        });
      },
      setStartEndMarkers: function() {
        const self = this;
        var startMarker = new google.maps.Marker({
          position: { lat: 47.603323768014164, lng: -122.3365107178688 },
        });
        var endMarker = new google.maps.Marker({
          position: { lat: 38.8942786, lng: -77.4310992 },
        });
        Helpers.createAndAppendDiv({
          lat: 47.603323768014164,
          lng: -122.3365107178688,
          mapInstance: self.map,
          divId: 'startMarker',
          backgroundIcon: '',
          mapContainer: 'atlas',
          teamName: 'Start',
          content: '815 Western Ave',
          className: 'start-end-marker'
        });
        Helpers.createAndAppendDiv({
          lat: 36.1069652,
          lng: -112.1129972,
          mapInstance: self.map,
          divId: 'endMarker',
          backgroundIcon: '',
          mapContainer: 'atlas',
          teamName: 'End',
          content: 'Grand Canyon National Park - 2,399 Miles!',
          className: 'start-end-marker'
        });
        this.markersStartEndArray.push(startMarker);
        this.markersStartEndArray.push(endMarker);
        this.setPopoverEvents();
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
    padding: 15px;
    border: 3px solid #dcdcdc;
    z-index: 20000;
    cursor: pointer;
    -webkit-box-shadow: 0px 3px 3px 3px rgba(0,0,0,.3);
    box-shadow: 0px 3px 3px 3px rgba(0,0,0,.3);
  }

  .were-walking-marker:hover {
    z-index: 20001;
  }

  .popover {
    z-index: 20002 !important;
  }

  .start-end-marker {
    width: 20px;
    height: 20px;
    border: 6px solid #f5f5f5;
    background: #05a6f5 !important;
    border-radius: 20px;
    z-index: 19999;
    cursor: pointer;
    -webkit-box-shadow: 0px 3px 3px 3px rgba(0,0,0,.3);
    box-shadow: 0px 3px 3px 3px rgba(0,0,0,.3);
  }
</style>
