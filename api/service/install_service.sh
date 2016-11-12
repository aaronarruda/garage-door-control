#!/bin/bash

# Supports Raspbian Jessie.
# *Run as root.

rm /etc/systemd/system/garage-door-control-api.service
cp garage-door-control-api.service /etc/systemd/system/.

systemctl daemon-reload
systemctl start garage-door-control-api