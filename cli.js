#!/usr/bin/env node

'use strict';

const request = require('request');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const getProp = require('dot-prop').get;

const apiUrl = 'http://rooms.manas.hr/checkChanges';

const MSG_OCCUPIED = 'Stolni nije slobodan';
const MSG_AVAILABLE = 'Stolni je slobodan';

request(apiUrl, (err, resp, body) => {
  if (err) {
    console.error(chalk.red.bold('Error:'), err.message);
    return;
  }

  let data = JSON.parse(body);
  let isOccupied = getProp(data, '0.fields.is_occupied');
  if (isOccupied === undefined) {
    console.error(chalk.red.bold('Error:'), 'Parsing api response failed!');
  }

  console.log(
    isOccupied ? logSymbols.error : logSymbols.success,
    isOccupied ? MSG_OCCUPIED : MSG_AVAILABLE
  );
});
