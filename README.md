# swagger-compare

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

The format below is the currently proposed format to communicate this information.

> makes use of [x-replaced-by] and [x-remove-on] provide a concise summary of api changes.

[x-replaced-by]: https://github.com/kjjuno/swagger-extensions/blob/master/x-replaced-by.md
[x-remove-on]: https://github.com/kjjuno/swagger-extensions/blob/master/x-remove-on.md

```yaml
version: 2.4.5
deprecated:
  paths:
    /v1/user:
      post:
        x-replaced-by:
          path: /v2/user
          verb: post
        x-remove-on: 10/12/2019
    /v1/user/{id}:
      get:
        x-replaced-by:
          path: /v2/user/{id}
          verb: get
        x-remove-on: 10/12/2019
removed: # TODO: Represent the routes that have been removed.

broken: # TODO: Represent the ways that routes have been broken. This should
        #       include changes to definitions and sub definitions that were
        #       modified in a breaking way.
```
