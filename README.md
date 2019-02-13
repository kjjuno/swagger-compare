# swagger-compare

makes use of [x-replaced-by] and [x-remove-on] provide a concise summary of api changes.

| Platform      | Badges                                                                                              |
| :------------ | :-------------------------------------------------------------------------------------------------- |
| License       | [![License MIT][license-badge]][mit-license]                                                        |
| Circle CI     | [![CircleCI][circleci-build-badge]][circleci-dashboard]                                             |
| Code Coverage | [![Code Coverage][codecov-badge]][codecov-dashboard]                                                |
| NPM           | [![npm version][npm-version-badge]][npm-page] [![npm downloads][npm-downloads-badge]][npm-page]     |

[circleci-build-badge]: https://circleci.com/gh/kjjuno/swagger-compare.svg?style=shield
[circleci-dashboard]:   https://circleci.com/gh/kjjuno/swagger-compare
[codecov-badge]:        https://img.shields.io/codecov/c/github/kjjuno/swagger-compare/master.svg?style=flat
[codecov-dashboard]:    https://codecov.io/gh/kjjuno/swagger-compare
[license-badge]:        https://img.shields.io/npm/l/swagger-compare.svg?style=flat
[mit-license]:          https://opensource.org/licenses/MIT
[npm-version-badge]:    https://badge.fury.io/js/swagger-compare.svg
[npm-downloads-badge]:  https://img.shields.io/npm/dt/swagger-compare.svg?style=flat
[npm-page]:             https://www.npmjs.com/package/swagger-compare

This tool is currently in the design phase. The goal is to provide a clear and concise way to communicate api changes.
Ideally this will fit easily within a slack or Teams channel.

version [0.1.0] will use the following format to communicate api changes.

The primary concern here is communicating that an endpoint has been deprecated.
Other concerns, such as what has been removed, added, or any breaking changes
to non-deprecated endpoints are out of scope at this time and will be revisted at another date.

[0.1.0]: https://github.com/kjjuno/swagger-compare/milestone/1



[x-replaced-by]: https://github.com/kjjuno/swagger-extensions/blob/master/x-replaced-by.md
[x-remove-on]: https://github.com/kjjuno/swagger-extensions/blob/master/x-remove-on.md

```yaml
version: 2.4.5                          # the latest version of the swagger document
deprecated:
  paths:
    /v1/user:
      post:
        x-replaced-by:                  # 'undefined' if not provided
          path: /v2/user                # 'undefined' if not provided
          verb: post                    # 'undefined' if not provided
        x-remove-on: 10/12/2019         # 'undefined' if not provided
    /v1/user/{id}:
      get:
        x-replaced-by:
          path: /v2/user/{id}
          verb: get
        x-remove-on: 10/12/2019
```
