import sys
from contextlib import suppress

from flask import Flask, render_template
from geojson import Feature, FeatureCollection, Point, feature
from geojson.feature import FeatureCollection
from loguru import logger
from pyzabbix import ZabbixAPI

logger.remove()
logger.add(sys.stdout, format="{time} {level} {message}", level="INFO", enqueue=True)

try:
    with open('/var/run/secrets/ZABBIX_ENDPOINT') as f: zabbix_endpoint = f.read()
    with open('/var/run/secrets/ZABBIX_USER') as f: zabbix_user = f.read()
    with open('/var/run/secrets/ZABBIX_PASS') as f: zabbix_pass = f.read()
except:
    # For development environment
    with open('./.ZABBIX_ENDPOINT') as f: zabbix_endpoint = f.read()
    with open('./.ZABBIX_USER') as f: zabbix_user = f.read()
    with open('./.ZABBIX_PASS') as f: zabbix_pass = f.read()


def get_zabbix_data():
    # Zabbix API
    zapi = ZabbixAPI(zabbix_endpoint)
    zapi.login(zabbix_user, zabbix_pass)

    logger.info(f'{zapi.__class__.__name__} - getting host data')
    zabbix_data = zapi.host.get(output="extend", selectInventory=True)
    return zabbix_data


def get_geojson():

    zabbix_data = get_zabbix_data()
    feature_collection = ''
    # initial geojson feature list
    feature_list = []
    logger.info(f'Building GeoJSON data')
    # iterate all hosts and create geo points
    for host in zabbix_data:
        # gather geojson data if host coordinates exist
        if 'location_lat' and 'location_lon' in host['inventory']:
            with suppress(Exception):
                location_lat = float(host['inventory']['location_lat'])
            
            with suppress(Exception):
                location_lon = float(host['inventory']['location_lon'])

            with suppress(Exception):
                host_name =  host['host']

            with suppress(Exception):
                hostid = int(host['hostid'])

            with suppress(Exception):
                model = host['inventory']['model']

            with suppress(Exception):
                vendor = host['inventory']['vendor']

            with suppress(Exception):
                host_type = host['inventory']['type']
            
            properties_dict = {
            'host_name': host_name, 
            'hostid': hostid,
            'model': model,
            'vendor': vendor,
            'host_type': host_type
            }

            new_feature = Feature(geometry=Point((location_lon, location_lat)), properties=properties_dict)
            feature_list.append(new_feature)
            feature_collection = FeatureCollection(feature_list)
    
    return feature_collection

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/geojson")
def fetch_geojson():
    return get_geojson()

if __name__ == "__main__":
    app.run(host='0.0.0.0')
    

