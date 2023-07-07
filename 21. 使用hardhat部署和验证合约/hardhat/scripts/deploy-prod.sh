#!/bin/bash

npx hardhat compile

npx hardhat run scripts/prod/deploy.js  --network mannet