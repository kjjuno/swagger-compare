const JsDiff = require('diff');

function getSummary(doc) {
  var summary = {
    deprecated: {
      paths: {}
    }
  };

  Object.keys(doc.paths).sort().forEach(path => {
    Object.keys(doc.paths[path]).sort().forEach(verb => {
      var endpoint = doc.paths[path][verb];

      if (endpoint.deprecated) {
        var replacedBy = endpoint['x-replaced-by'] || 'undefined';
        var removeOn = endpoint['x-remove-on'] || 'undefined';

        var endpointSummary = {};
        summary.deprecated.paths[path] = summary.deprecated.paths[path] || {};
        summary.deprecated.paths[path][verb] = endpointSummary;

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
  try {
    var baselineSummary = getSummary(baselineDoc);
    var newSummary = getSummary(newDoc);

    newDoc.info = newDoc.info || {};

    var diffSummary = {
      version: newDoc.info.version,
      deprecated: {
        paths: {}
      }
    };

    Object.keys(baselineSummary.deprecated.paths).forEach(path => {
      // paths that exist in both files, but are different will be included
      // This is likely to happen if the x-replaced-by or x-remove-on attributes
      // are applied or modified.
      if (newSummary.deprecated.paths[path]) {

        var diff = JsDiff.diffJson(baselineSummary.deprecated.paths[path], newSummary.deprecated.paths[path]);

        if (isChanged(diff)) {
          diffSummary.deprecated.paths[path] = newSummary.deprecated.paths[path];
        }
      }
    });

    // paths that were not marked deprecated in the baseline, but are now
    // marked deprecated in the new file will be included in the summary.
    Object.keys(newSummary.deprecated.paths).forEach(path => {
      if (!baselineSummary.deprecated.paths[path]) {
        diffSummary.deprecated.paths[path] = newSummary.deprecated.paths[path];
      }
    });

    return diffSummary;
  }
  catch (e) {
    console.log('invalid file format');
    return null;
  }
}

module.exports.compare = compare;
