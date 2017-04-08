<template>
  <div id="atlas-container">
    <div id="atlas">

    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {}
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
          this.setRoute();
          this.drawRoute();
        });

      },
      setRoute: function() {
        this.route = {
          label: 'Where we\'re walking',
          request: {
            origin: new google.maps.LatLng(47.6062095, -122.3320708),
            destination: new google.maps.LatLng(38.8942786, -77.4310992),
            travelMode: google.maps.DirectionsTravelMode.DRIVING
          },
          rendering: {
            marker: {
              icon: 'http://labs.google.com/ridefinder/images/mm_20_blue.png'
            },
            draggable: false
          }
        }
      },
      drawRoute: function() {
        const self = this;
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(this.map);
        directionsService.route({
          origin: self.route.request.origin,
          destination: self.route.request.destination,
          travelMode: self.route.request.travelMode
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
    }

  }
</script>

<style scoped>
  #atlas-container {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 80%;
    background: #f5f5f5;
  }

  #atlas {
    width: 100%;
    height: 100%;
  }
</style>
