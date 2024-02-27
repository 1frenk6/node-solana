#!/usr/bin/env bash

CMDS=()

BASE_COMMAND="npm run watch --workspace="

for package in $(find ./services | grep package.json); 
  do 
    SERVICENAME=$(cat $package | grep -o '"name": *"[^"]*' | grep -o '[^"]*$');
    TMP=$BASE_COMMAND$SERVICENAME
    CMDS+=(\"$TMP\")
  done


FULL_COMMAND=$(echo ${CMDS[@]})
eval "node_modules/.bin/concurrently -k $FULL_COMMAND"