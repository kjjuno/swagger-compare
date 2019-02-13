#!/usr/bin/env node

var axios = require('axios');
var fs = require('fs');
var yaml = require('js-yaml');
var swagger = require('./swagger-compare');
var help = require('./help');

if (process.argv.length < 4) {
  help.show();
  return;
}

async function loadFile(file) {
  if (file.startsWith('http')) {
    var ret = await axios.get(file);
    return ret.data;
  }

  var text = fs.readFileSync(file, 'utf8');
  return yaml.safeLoad(text);
}

async function main(args) {
  var file1 = args[0];
  var file2 = args[1];

  var doc1 = await loadFile(file1);
  var doc2 = await loadFile(file2);

  var summary = swagger.compare(doc1, doc2);
  console.log(yaml.safeDump(summary));
}

main(process.argv.slice(2));
