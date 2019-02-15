#!/usr/bin/env node

var colors  = require('colors');
var http    = require('http');
var https   = require('https');
var fs      = require('fs');
var yaml    = require('js-yaml');
var tui     = require('./tui');
var swagger = require('./swagger-compare');

var args = process.argv.slice(2);


async function loadFile(file) {
  var text = null;
  try {
    if (file.startsWith('https')) {
      var promise = new Promise((resolve, reject) => {
        https.get(file, function(res) {
          var text = '';
          res.on('data', d => {
            text += d.toString();
          });
          res.on('end', () => {
            resolve(text);
          });
        }).on('error', e => {
          reject(e);
        });
      });
      text = await promise;
    }
    else if (file.startsWith('http')) {
      var promise = new Promise((resolve, reject) => {
        http.get(file, function(res) {
          var text = '';
          res.on('data', d => {
            text += d.toString();
          });
          res.on('end', () => {
            resolve(text);
          });
        }).on('error', e => {
          reject(e);
        });
      });
      text = await promise;
    }
    else {
      text = fs.readFileSync(file, 'utf8');
    }

    return yaml.safeLoad(text);
  } catch (e) {
    console.log(e.message['red']);
    process.exit(1);
  }
}

async function main(args) {
  var options = tui.parseArgs(args);

  var doc1 = await loadFile(options.baseline);
  var doc2 = await loadFile(options.new);

  var summary = swagger.compare(doc1, doc2);

  if (!summary) {
    process.exit(1);
  }

  switch (options.format) {
    case 'yaml':
      console.log(yaml.safeDump(summary));
      break;
    case 'json':
      console.log(JSON.stringify(summary, undefined, 2));
      break;
    default:
      console.log(`unknown output format: ${options.format}`);
      process.exit(1);
  }
}

main(args);
