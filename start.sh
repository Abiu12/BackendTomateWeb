#!/usr/bin/env bash
cd /home/app

# uninstall the current bcrypt modules
npm uninstall bcrypt

# install the bcrypt modules for the machine
npm install bcrypt


npm run start