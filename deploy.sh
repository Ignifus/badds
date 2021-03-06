#!/bin/sh

docker stack rm badds
docker build -t localhost:5000/gema/badds-panel web_panel
docker build -t localhost:5000/gema/badds web
docker build -t localhost:5000/gema/baddsdemo web_demo
docker stack deploy -c docker-compose-gema.yml badds
