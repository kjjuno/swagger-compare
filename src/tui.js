var package = require('../package.json');

function parseArgs(args) {
  var state = {
    errors: [],
    positional: []
  };

  var options = {
    baseline: null,
    new: null,
    format: 'yaml',
    showVersion: false,
    showHelp: false
  };

  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg.startsWith('-')) {
      switch (arg) {
        case '-f':
        case '--format':
          i++;
          var value = args[i];
          options.format = value || null;
          break;
        case '--version':
          options.showVersion = true;
          break;
        case '--help':
          options.showHelp = true;
          break;
        default:
          state.errors.push(`Unknown argument: ${arg}`);
      }
    } else {
      state.positional.push(arg);
    }
  }

  if (options.showHelp) {
    showHelp(false);
  }

  if (options.showVersion) {
    console.log(package.version);
    process.exit();
  }

  switch (options.format) {
    case 'json':
    case 'yaml':
      // these are the only allowed values.
      break;
    default:
    state.errors.push('--format be one of [json|yaml]');
      options.showHelp = true;
      break;
  }

  switch (state.positional.length) {
    case 0:
      state.errors.push('expected <baseline> and <new> but got neither');
      break;
    case 1:
      state.errors.push('expected <baseline> and <new> but only got <baseline>');
      break;
    case 2:
      options.baseline = state.positional[0];
      options.new = state.positional[1];
      break;
    default:
      state.errors.push(`unknown arguments: ${state.positional.slice(2)}`);
      break;
  }

  if (state.errors.length > 0) {
    console.log("Invalid Input!"['red']);
    state.errors.forEach(error => {
      console.log(`  ${error}`['red']);
    });
    options.showHelp = true;
  }

  if (options.showHelp) {
    showHelp(state.errors.length > 0);
    return;
  }
  return options;
}

function showHelp(isError) {
  isError = isError || false;
  console.log();
  console.log("swagger-compare [options] <baseline> <new>");
  console.log(package.version);
  console.log();
  console.log("arguments:")
  console.log("  baseline         path or url to baseline swagger document");
  console.log("  new              path or url to new swagger document");
  console.log();
  console.log("options:")
  console.log("  -f,--format      default: yaml. Must be on of [yaml|json]");
  console.log("  --help           display this help page");
  console.log("  --version        display the version of swagger-compare");
  console.log();
  console.log("Any paths marked as deprecated that show up only in the <new>")
  console.log("document will be included in the report.")

  process.exit(isError ? 1 : 0);
}

module.exports.parseArgs = parseArgs;
module.exports.showHelp = showHelp;
