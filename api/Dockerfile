FROM resin/rpi-raspbian:jessie

RUN apt-get update && apt-get install -y \
  python \
  python-pip \
  python-rpi.gpio

RUN pip install flask tornado configparser

COPY *.py /api/
COPY properties.ini /api/

EXPOSE 80

CMD sleep 2 && python /api/ApiServer.py /api/properties.ini
