.. swagger-compare documentation master file, created by
   sphinx-quickstart on Wed Feb 13 15:05:31 2019.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to swagger-compare's documentation!
===========================================

swagger-compare aims to make the job of communicating api changes easier.
The current phase of this project deals only with endpoints that have been
marked as deprecated. By making use of the `x-replaced-by`_ and `x-remove-on`_
swagger extensions a clear, and automated diff summary can be generated from
the baseline swagger, and the new swagger document.

.. _x-replaced-by: https://github.com/kjjuno/swagger-extensions/blob/master/x-replaced-by.md
.. _x-remove-on: https://github.com/kjjuno/swagger-extensions/blob/master/x-remove-on.md

give it a try!

.. code-block:: bash

  docker run kjjuno/swagger-compare https://raw.githubusercontent.com/kjjuno/swagger-compare/master/test/petstore.yaml https://raw.githubusercontent.com/kjjuno/swagger-compare/master/test/petstore-new.yaml

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   cli-examples
   code-examples
   swagger-extensions
   writing-documentation
