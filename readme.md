# Zabbix host visualization in Leaflet map
![Zabbix and Leaflet](zabbix_leaflet.gif)

## Requirements
- **Docker Swarm**

## Zabbix installation
```console
root@localhost:~ $ docker stack deploy --compose-file=docker-compose-zabbix.yaml zabbix_stack
```

## Leaflet map installation
```console
root@localhost:~ $ docker-compose -f docker-compose-leaflet-map.yaml build
root@localhost:~ $ docker stack deploy --compose-file=docker-compose-leaflet-map.yaml leaflet_stack
```

## Usage
