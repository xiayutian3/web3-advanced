#!/bin/bash

npx hardhat compile

npx hardhat run scripts/dev/deploy.js  --network bsctest
