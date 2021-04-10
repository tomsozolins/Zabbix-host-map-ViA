Zabbix server installation
# docker stack deploy --compose-file=docker-compose-zabbix.yaml zabbix_stack
-------------------------
Leaflet map installation

# docker-compose -f docker-compose-leaflet-map.yaml build
# docker stack deploy --compose-file=docker-compose-leaflet-map.yaml leaflet_stack

Access Leaflet map - http://<ip-addr>/
Access Geojson API - http://<ip-addr>/geojson
