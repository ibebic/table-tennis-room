#!/usr/bin/env node

'use strict';

const request = require('request');
const chalk = require('chalk');
const { error, success } = require('log-symbols');
const argv = require('minimist')(process.argv.slice(2));

const url = 'http://rooms.manas.hr/checkChanges';
const headers = { 'X-Requested-With': 'XMLHttpRequest' };

const ROOM_MAC = 'b8:27:eb:69:c3:d3';

const MSG_OCCUPIED = 'Stolni nije slobodan';
const MSG_AVAILABLE = 'Stolni je slobodan';

const isVerbose = argv.v || argv.verbose;

request({ url, headers }, (err, resp, body) => {
  if (err) {
    console.error(chalk.red.bold('Error:'), err.message);
    return;
  }

  const data = JSON.parse(body);
  const room = data[ROOM_MAC];

  if (!room || room.is_occupied === undefined) {
    console.error(chalk.red.bold('Error:'), 'Parsing api response failed!');
    return;
  }

  const symbol = room.is_occupied ? error : success;
  const message = room.is_occupied ? MSG_OCCUPIED : MSG_AVAILABLE;
  const info = isVerbose && room.updated_at ? ` (last update: ${room.updated_at})` : '';
  console.log(symbol, message, info);
});
