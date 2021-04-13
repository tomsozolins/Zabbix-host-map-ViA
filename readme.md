# Zabbix host visualization in Leaflet map
![Zabbix and Leaflet](zabbix_leaflet.gif)

## Requirements
- **Docker Swarm**
- **Docker Compose**
- **Git client**

## Clone repository
```console
root@localhost:~ # git clone https://github.com/tomsozolins/leaflet-map.git
```

## Zabbix installation
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
- Access Geojson API - http://127.0.0.1/geojson