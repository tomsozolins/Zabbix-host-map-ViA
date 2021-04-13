# Zabbix host visualization in Leaflet map
> Python application which pulls host data from Zabbix API, converts the data to GeoJSON and serves it as API endpoint to Leaflet based map using Realtime Leaflet plugin

## Requirements
- **Linux based server (minimum 1GB RAM/1vCPU, Oracle Cloud free instance can be used - https://www.oracle.com/cloud/free/#always-free)**
- **Docker Swarm - https://docs.docker.com/engine/swarm/swarm-tutorial/create-swarm/**
- **Docker Compose - https://docs.docker.com/compose/install/**
- **Zabbix server v5.0 and up - https://www.zabbix.com/documentation/current/manual/installation/containers**
- **Git - https://git-scm.com/download/linux**

## Architecture
<img src="https://raw.githubusercontent.com/tomsozolins/Leaflet-map/master/architecture.png" width="200" height="400">

## Clone repository
```console
root@localhost:~ # git clone https://github.com/tomsozolins/leaflet-map.git
```

## Zabbix installation (optional - existing installation can be used)
```console
root@localhost:~ # docker stack deploy --compose-file=docker-compose-zabbix.yaml zabbix_stack
```

## Leaflet map installation
```console
root@localhost:~ # docker-compose -f docker-compose-leaflet-map.yaml build
root@localhost:~ # docker stack deploy --compose-file=docker-compose-leaflet-map.yaml leaflet_stack
```

## Usage
![Zabbix and Leaflet](zabbix_leaflet.gif)
- Create hosts in Zabbix and add latitude/longitude data in host inventory
- See the hosts automatically displayed in Leaflet map - http://127.0.0.1/
- Leaflet fetches Zabbix dGeoJSON every 3 seconds from - http://127.0.0.1/geojson