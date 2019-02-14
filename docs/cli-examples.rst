cli examples
============

swagger-compare is available to install from npm_


.. code-block:: bash

  npm install -g swagger-compare

swagger-compare is also available on `Docker Hub`_


.. code-block:: bash

  docker pull kjjuno/swagger-compare

.. _npm: https://www.npmjs.com/package/swagger-compare
.. _Docker Hub: https://hub.docker.com/r/kjjuno/swagger-compare

Quick Start
-----------

Let's say you have an api hosted at https://my-api/swagger/v1/sagger.json

You have a build server that has just build something from your ``master`` branch
and now you want to compare the new swagger to the deployed swagger.

Add this line to your build script:

.. code-block:: bash

  swagger-compare https://my-api/swagger/v1/sagger.json ./wwwroot/v1/swagger.json

You should get the following type of output

.. code-block:: yaml

  version: 1.4.2
  deprecated:
    paths:
      /v1/pet:
        post:
          x-replaced-by:
            path: /v2/pet
            verb: post
          x-remove-on: undefined
        put:
          x-replaced-by: undefined
          x-remove-on: 3/4/2019
      /v2/pet:
        post:
          x-replaced-by:
            path: /v3/pet
            verb: post
          x-remove-on: 2/13/2019

Take a look at :doc:`swagger-extensions <swagger-extensions>` to learn more about the x-replaced-by and x-remove-on extensions.

Usage
-----

.. code-block:: bash

  swagger-compare [options] <baseline> <new>
  {version}

  arguments:
    baseline         path or url to baseline swagger document
    new              path or url to new swagger document

  options:
    -f,--format      default: yaml. Must be on of [yaml|json]
    --help           display this help page
    --version        display the version of swagger-compare

  Any paths marked as deprecated that show up only in the <new>
  document will be included in the report.
