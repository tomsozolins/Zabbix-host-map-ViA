# Zabbix host visualization in Leaflet map
![Zabbix and Leaflet](zabbix_leaflet.gif)

## Requirements
- **Linux based server (minimum 1GB RAM/1vCPU, Oracle Cloud free instance can be used - https://www.oracle.com/cloud/free/#always-free)**
- **Docker Swarm - https://docs.docker.com/engine/swarm/swarm-tutorial/create-swarm/**
- **Docker Compose - https://docs.docker.com/compose/install/**
- **Zabbix server v5.0 and up - https://www.zabbix.com/documentation/current/manual/installation/containers**
- **Git - https://git-scm.com/download/linux**

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