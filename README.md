# Badds

## Overview
Software solution for ads across Web and Android platforms.

## Structure
Contains a Java Client with its demo, as well as a Python Client with the demo.
Also contains the full Badds website, with the control panel developed in React.

## Running
* Install docker.
* Install docker-compose.
* Run `cp preset.env .env`
* Add environment variables to .env accordingly.
* Run `docker-compose -p badds up --build`
* App will run in localhost:8080.

## Running in GEMA
* Clone the code in GEMA-enabled serer
* Add environment variables to .env accordingly.
* Run `./deploy.sh`
