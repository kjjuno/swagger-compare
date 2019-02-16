Swagger Extensions
==================

This tool makes use of the `x-replaced-by`_ and `x-remove-on`_ swagger extensions.
Without applying these to your swagger you will only be able to detect that an
endpoint has been deprecated, but you will not be able to easily tell what should
be used instead.

x-replaced-by
-------------

The `x-replaced-by`_ extension gives extra context so that consumers
of your api will know not only which endpoints have been deprecated, but which
endpoints should be used instead.

x-remove-on
-----------

The `x-remove-on`_ extension communicated the
date when a deprecated endpoint is scheduled to be removed. This helps consumers
know when they need to have migrated to the new endpoint to avoid an outage.

.. _x-replaced-by: https://github.com/kjjuno/swagger-extensions/blob/master/x-replaced-by.md
.. _x-remove-on: https://github.com/kjjuno/swagger-extensions/blob/master/x-remove-on.md
