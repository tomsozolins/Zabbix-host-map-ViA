from pyzabbix import ZabbixAPI
from contextlib import suppress
import random

with ZabbixAPI('http://<zabbix IP>/') as zapi:
    zapi.login('Admin', 'zabbix')
    with suppress(Exception):
        zapi.do_request(
            "hostgroup.create",
            { 
                "name": "geomap" 
            })
    for i in range(1,501):
        zapi.do_request(
        "host.create",
        {
        "host": "host" + str(i),
        "groups": [
            {
                "groupid": "19"
            }
        ],
        "inventory_mode": 0,
        "inventory": {
            "type": "type" + str(i),
            "model": "model" + str(i),
            "vendor": "vendor" + str(i),
            "location_lat": "56." + str(random.randint(80000,99999)),
            "location_lon": "24." + str(random.randint(00000,19999))
        }})
        print('created geo point')

