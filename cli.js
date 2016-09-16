#!/usr/bin/env node

'use strict';

const request = require('request');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

const url = 'http://rooms.manas.hr/checkChanges';
const headers = { 'X-Requested-With': 'XMLHttpRequest' };

const ROOM_MAC = 'b8:27:eb:69:c3:d3';

const MSG_OCCUPIED = 'Stolni nije slobodan';
const MSG_AVAILABLE = 'Stolni je slobodan';

request({ url, headers }, (err, resp, body) => {
  if (err) {
    console.error(chalk.red.bold('Error:'), err.message);
    return;
  }

  let data = JSON.parse(body);
  let room = data[ROOM_MAC];

  if (!room || room.is_occupied === undefined) {
    console.error(chalk.red.bold('Error:'), 'Parsing api response failed!');
  }

  console.log(
    room.is_occupied ? logSymbols.error : logSymbols.success,
    room.is_occupied ? MSG_OCCUPIED : MSG_AVAILABLE
  );
});
