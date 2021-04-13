FROM python:3.9-slim-buster

ADD zabbix_host_map.py .

RUN pip install --no-cache-dir pyzabbix
RUN pip install --no-cache-dir flask
RUN pip install --no-cache-dir loguru
RUN pip install --no-cache-dir geojson

CMD [ "python", "./zabbix_host_map.py"]