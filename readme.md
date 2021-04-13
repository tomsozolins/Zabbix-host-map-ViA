# Zabbix host visualization in Leaflet map
![Zabbix and Leaflet](zabbix_leaflet.gif)

## Requirements
- **Linux based server (minimum 1GB RAM/1vCPU, Oracle Cloud always free instance can be used - https://www.oracle.com/cloud/free/#always-free)**
- **Docker Swarm - https://docs.docker.com/engine/swarm/swarm-tutorial/create-swarm/**
- **Docker Compose**
- **Zabbix server v5.0 and up**
- **Git client**

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
- Access Leaflet map - http://127.0.0.1/
- Access GeoJSON API - http://127.0.0.1/geojson