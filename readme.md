# Zabbix host visualization in Leaflet map
> Python application which pulls host data from Zabbix API, converts the data to GeoJSON and serves it as API endpoint to Leaflet based map using Realtime Leaflet plugin

## Requirements
- **Linux based server (minimum 1GB RAM/1vCPU, Oracle Cloud free instance can be used - https://www.oracle.com/cloud/free/#always-free)**
- **Docker Swarm - https://docs.docker.com/engine/swarm/swarm-tutorial/create-swarm/**
- **Docker Compose - https://docs.docker.com/compose/install/**
- **Zabbix server v5.0 and up - https://www.zabbix.com/documentation/current/manual/installation/containers**
- **Git - https://git-scm.com/download/linux**

## Architecture
<img src="https://raw.githubusercontent.com/tomsozolins/Zabbix-host-map/master/architecture.png" width="500" height="655">

## Data flow diagram
<img src="https://raw.githubusercontent.com/tomsozolins/Zabbix-host-map/master/data_flow.png" width="500" height="533">

## How it works
- When application is started Flask web service is started. It serves two endpoinds - Leaflet map and Geojson API.
- When Leaflet map is accessed via browser, the page fetches GeoJSON API endpoint every 3 seconds to get the latest data. GeoJSON fetching is done using Leaflet Realtime plugin - https://github.com/perliedman/leaflet-realtime. This plugin provides the ability to update Leaflet map data without refreshing the page. This makes the map feel like it's working realtime.
- Additionally Leaflet map is provided with 3 Tile layers to choose from - Regular Open Street base tile, Stadia_OSMBright tile - http://leaflet-extras.github.io/leaflet-providers/preview/ and WMS based tile Latvia Administrative Teritories 2021 - https://geolatvija.lv/geo/p/658
- When any of the Geo points are clicked, a popup is showing table data about the Zabbix host. The data is gathered using Zabbix API.


# Installation
## Clone repository
```console
root@localhost:~ # git clone https://github.com/tomsozolins/zabbix-host-map.git
```

## Zabbix installation (optional - existing installation can be used)
- Change secret values in .MYSQL files
```console
root@localhost:~ # docker stack deploy --compose-file=docker-compose-zabbix.yaml zabbix_stack
```

## Leaflet map installation
- Change secret values in .ZABBIX files
```console
root@localhost:~ # docker-compose -f docker-compose-zabbix-host-map.yaml build
root@localhost:~ # docker stack deploy --compose-file=docker-compose-zabbix-host-map.yaml zabbix_host_map_stack
```

# Usage
![Zabbix and Leaflet](zabbix_leaflet.gif)
- Create hosts in Zabbix and add latitude/longitude data in host inventory
- See the hosts automatically displayed in Leaflet map - http://127.0.0.1:5000/
