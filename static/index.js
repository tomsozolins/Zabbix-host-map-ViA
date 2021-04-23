var map = L.map('map'),
    realtime = L.realtime(
        {
        url: 'http://130.61.38.99:5000/geojson',
        crossOrigin: true,
        type: 'json'
    }, 
    {
        interval: 3 * 1000,
        getFeatureId: function(f) {
            return f.properties.hostid;
        },
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions)
            }
        }).addTo(map);

map.setView([56.946285, 24.105078], 10)
L.control.scale().addTo(map);

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#6495ED",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var basemaps = {
    Teritories: L.tileLayer.wms('https://dpps.viss.gov.lv/DPPS.REQ/URN_IVIS_100001_ISS-VIDM-WMS_ATR_02022021-v1-0/guest/URN_IVIS_100273_LIC-EB3E6FD85096D1489BACDA09E746CFC3?', {
        layers: '0',
        version: '1.3.0',
        transparent: 'true',
        format: 'image/png',
        opacity: 0.5
    }),
    // API key created in https://stadiamaps.com/
    Stadia_OSMBright: L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png?api_key=26a9f45c-2063-44ee-afe8-dfd95eca2d78', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }),
    Basemap: L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }),
};

L.control.layers(basemaps).addTo(map);

basemaps.Teritories.addTo(map);


realtime.on('update', function(e) {

        popupContent = function(fId) {
            var feature = e.features[fId],
                c = feature.geometry.coordinates;
                c = '<table class="styled-table"><tr><td>Latitude</td><td>' + c[1] + '</td></tr>' + 
                    '<tr><td>Longitude</td><td>' + c[0] + '</td></tr>' +
                    '<tr><td>Host type</td><td>' + feature.properties.host_type + '</td></tr>' +
                    '<tr><td>Host model</td><td>' + feature.properties.model + '</td></tr>' +
                    '<tr><td>Hostid</td><td>' + feature.properties.hostid + '</td></tr>' +
                    '<tr><td>Vendor</td><td>' + feature.properties.vendor + '</td></tr>' +
                    '<tr><td>Host name</td><td>' + feature.properties.host_name + '</td></tr></table>';

                return c
        },
        bindFeaturePopup = function(fId) {
            realtime.getLayer(fId).bindPopup(popupContent(fId));
        },
        updateFeaturePopup = function(fId) {
            realtime.getLayer(fId).getPopup().setContent(popupContent(fId));
        };

    Object.keys(e.enter).forEach(bindFeaturePopup);
    Object.keys(e.update).forEach(updateFeaturePopup);
});