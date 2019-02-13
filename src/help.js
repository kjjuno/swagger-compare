var package = require('../package.json');

function show() {
  console.log("swagger-compare <baseline> <new>");
  console.log(package.version);
  console.log();
  console.log("  baseline         path or url to baseline swagger document");
  console.log("  new              path or url to new swagger document");
  console.log();
  console.log("Any paths marked as deprecated that show up only in the <new>")
  console.log("document will be included in the report.")
}

module.exports.show = show;
