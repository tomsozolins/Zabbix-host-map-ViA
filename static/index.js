
var map = L.map('map'),
    realtime = L.realtime(
        {
        url: 'https://apex.oracle.com/pls/apex/tomsozolins/geo/geojson',
        crossOrigin: true,
        type: 'json'
    }, {
        interval: 3 * 1000,
        getFeatureId: function(f) {
            return f.properties.hostid;
        }, 
        
    },
    ).addTo(map);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

realtime.once('update', function() {
    map.fitBounds(realtime.getBounds(), {maxZoom: 10});
});

realtime.on('update', function(e) {

        popupContent = function(fId) {
            var feature = e.features[fId],
                c = feature.geometry.coordinates;
                c = 'Latitude: ' + c[1] + "<br>" + 
                    'Longitude: '  + c[0] + "<br>" + 
                    'Host type: ' + feature.properties.host_type + "<br>" +
                    'Host model: ' + feature.properties.host_model + "<br>" +
                    'Hostid: ' + feature.properties.hostid + "<br>" +
                    'Vendor: ' + feature.properties.vendor + "<br>" +
                    'Host name: ' + feature.properties.host_name + "<br>";

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