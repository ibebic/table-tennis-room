#!/usr/bin/env node

'use strict';

const request = require('request');
const logSymbols = require('log-symbols');

var url = 'http://rooms.manas.hr/checkChanges';
var json = { };

  request(url, function(error, response, html) {
    if(!error) {
          var json = JSON.parse(html);
          if (json[0].fields.is_occupied === false) {
            console.log(logSymbols.success, 'Stolni je slobodan');
          }else{
            console.log(logSymbols.error, 'Stolni nije slobodan');
          }
        }
});
