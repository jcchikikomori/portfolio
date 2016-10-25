	// Set map through var
	var long = 121.092648;
	var lat = 14.586028;
	var api_token = 'pk.eyJ1IjoiamNjdWx0aW1hMTIzIiwiYSI6ImNpaG83YmwyNzBya2t2ZmtsZm9sbmJrNG8ifQ.XU68Bms5rZkYLVjYW0SZng';
	// var map = L.map('map').setView([long, lat], 18);
	var map = new L.map('map', {
		center: [lat, long],
		zoom: 15,
		// singleTile: true
	});

	// Map tile and api
	L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
		// attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		// maxZoom: 18,
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Powered by Leaflet',
		accessToken: api_token // IMPORTANT: Access Token
	}).addTo(map);

	// Add other things
	var marker = L.marker([lat, long]).addTo(map); // marker to default location

	// Add a circle
	var circle = L.circle([14.5866861, 121.0867879], 200, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
	}).addTo(map);

	// Add a polygon
	var polygon = L.polygon([
    [14.584, 121.0908623],
    [14.585, 121.099119],
    [14.587, 121.099806]
	]).addTo(map);

	// Show popup when the objects clicked
	// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
	marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
	circle.bindPopup("I am a circle.");
	polygon.bindPopup("I am a polygon.");

	// Standalone popup in particular latitude (uncomment & try for yourself)
	var popup = L.popup()
	.setLatLng([long, lat])
	.setLatLng([14.588236, 121.096313])
	.setContent("Welcome to mapping demo. You may see the source code for more detailed representation.")
	.openOn(map);
