export default {

  createAndAppendDiv: function(options={}) {

    let map = options.mapInstance;

    // Projection variables.
		var projection = map.getProjection();
		var topRight = projection.fromLatLngToPoint(map.getBounds().getNorthEast());
		var bottomLeft = projection.fromLatLngToPoint(map.getBounds().getSouthWest());
		var scale = Math.pow(2,map.getZoom());

    var point = projection.fromLatLngToPoint(
			new google.maps.LatLng(options.lat,options.lng)
		);

		// Get the x/y based on the scale.
		var posLeft = (point.x - bottomLeft.x) * scale;
		var posTop = (point.y - topRight.y) * scale;

    var div = document.createElement('div');
    div.style.position = "absolute";
    div.style.background = `#f5f5f5 url('${options.backgroundIcon}') no-repeat center center`;
    div.id = options.divId.toLowerCase().replace(/\W/g, '');
		div.className = options.className || 'were-walking-marker';
    div.style.top = (posTop - 15) + "px";
		div.style.left = (posLeft - 15) + "px";
    div.setAttribute('data-toggle', 'popover');
    div.setAttribute('title', options.teamName);
    div.setAttribute('data-placement', 'top');
    div.setAttribute('data-content', options.content || `This team has walked ${Math.round((parseInt(options.totalMiles) / 2112))} miles.`);
    document.getElementById(`${options.mapContainer}`).appendChild(div);
  }

}
