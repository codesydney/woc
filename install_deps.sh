#!/bin/bash

## function installing react npm deps
react_dep() {
    rm -rf server/node_modules;
    cd web;
    echo "[WEB] installing dependencies, give this a sec";
    npm i > /dev/null 2>&1;

    echo "[WEB] instalation complete";
}

## function installing backend server npm deps
express_dep() {
    rm -rf server/node_modules;
    cd server;
    echo "[SERVER] installing dependencies";
    npm i > /dev/null 2>&1;

    echo "[SERVER] instalation complete";
}

# install react and express dependencies
react_dep &
express_dep &

wait
echo;
echo "dependencies istallation complete"