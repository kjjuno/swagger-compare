const JsDiff = require('diff');

module.exports.hello = function() {
  return 'welcome to swagger-compare. This project is currently being developed. Come join the fun! https://github.com/kjjuno/swagger-compare';
}

function getSummary(doc) {
  var summary = {};

  Object.keys(doc.paths).sort().forEach(path => {
    Object.keys(doc.paths[path]).sort().forEach(verb => {
      var endpoint = doc.paths[path][verb];

      if (endpoint.deprecated) {
        var replacedBy = endpoint['x-replaced-by'] || 'undefined';
        var removeOn = endpoint['x-remove-on'] || 'undefined';

        summary.deprecated = summary.deprecated || {};
        summary.deprecated.paths = summary.deprecated.paths || {};
        var endpointSummary = {};
        summary.deprecated.paths[path] = endpointSummary;

        endpointSummary['x-replaced-by'] = replacedBy;
        endpointSummary['x-remove-on'] = removeOn;
      }
    });
  });

  return summary;
}

function isChanged(diff) {
  var changed = false;
  for (var i = 0; i < diff.length; i++) {
    if (diff[i].added || diff[i].removed) {
      changed = true;
      break;
    }
  }

  return changed;
}

function compare(baselineDoc, newDoc) {
  var baselineSummary = getSummary(baselineDoc);
  var newSummary = getSummary(newDoc);

  newDoc.info = newDoc.info || {};

  var diffSummary = {
    version: newDoc.info.version
  };
  Object.keys(baselineSummary.deprecated.paths).forEach(path => {
    // paths that exist in both files, but are different will be included
    // This is likely to happen if the x-replaced-by or x-remove-on attributes
    // are applied or modified.
    if (newSummary.deprecated.paths[path]) {

      var diff = JsDiff.diffJson(baselineSummary.deprecated.paths[path], newSummary.deprecated.paths[path]);

      if (isChanged(diff)) {
        diffSummary.deprecated = diffSummary.deprecated || {};
        diffSummary.deprecated.paths = diffSummary.deprecated.paths || {};
        diffSummary.deprecated.paths[path] = newSummary.deprecated.paths[path];
      }
    }
  });

  // paths that were not marked deprecated in the baseline, but are now
  // marked deprecated in the new file will be included in the summary.
  Object.keys(newSummary.deprecated.paths).forEach(path => {
    if (!baselineSummary.deprecated.paths[path]) {
      diffSummary.deprecated = diffSummary.deprecated || {};
      diffSummary.deprecated.paths = diffSummary.deprecated.paths || {};
      diffSummary.deprecated.paths[path] = newSummary.deprecated.paths[path];
    }
  });

  return diffSummary;
}

module.exports.compare = compare;
