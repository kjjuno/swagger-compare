code examples
=============

swagger-compare is available to install from npm_. To use it in your project
install the module and save it to your package.json file.


.. code-block:: bash

  npm install --save swagger-compare

.. _npm: https://www.npmjs.com/package/swagger-compare

Quick Start
-----------

.. code-block:: javascript

  // require libraries to load a swagger spec
  const fs      = require('fs');
  const yaml    = require('js-yaml');
  const swagger = require('swagger-compare');

  // read swagger spec as text from the file system.
  var baselineText = fs.readFileSync(baselineFile, 'utf8');
  var newText = fs.readFileSync(newFile, 'utf8');

  // parse text into an object representation of the swagger spec
  var baselineDoc = yaml.safeLoad(baselineText);
  var newDoc = yaml.safeLoad(newText);

  // compare the two swagger specs.
  var summary = swagger.compare(baselineDoc, newDoc);

  // display the diff summary to the console
  console.log(yaml.safeDump(summary));


Take a look at :doc:`swagger-extensions <swagger-extensions>` to learn more about the x-replaced-by and x-remove-on extensions.
