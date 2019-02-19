# swagger-compare

Provides a concise summary of api changes by making use of [x-replaced-by] and [x-remove-on]

[x-replaced-by]: https://github.com/kjjuno/swagger-extensions/blob/master/x-replaced-by.md
[x-remove-on]:   https://github.com/kjjuno/swagger-extensions/blob/master/x-remove-on.md

| Platform      | Badges                                                                                              |
| :------------ | :-------------------------------------------------------------------------------------------------- |
| License       | [![GitHub license][license-badge]][license-url]                                                     |
| Circle CI     | [![CircleCI][circleci-build-badge]][circleci-dashboard]                                             |
| Code Coverage | [![Code Coverage][codecov-badge]][codecov-dashboard]                                                |
| Documantation | [![Documentation Status][rtd-build-badge]][rtd-latest]                                              |
| NPM           | [![npm version][npm-version-badge]][npm-page] [![npm downloads][npm-downloads-badge]][npm-page]     |
| Docker        | [![Docker Size][docker-size-badge]][docker-page] [![Docker Pulls][docker-pulls-badge]][docker-page] |

[circleci-build-badge]: https://circleci.com/gh/kjjuno/swagger-compare.svg?style=shield
[circleci-dashboard]:   https://circleci.com/gh/kjjuno/swagger-compare
[rtd-build-badge]:      https://readthedocs.org/projects/swagger-compare/badge/?version=latest
[rtd-latest]:           https://swagger-compare.readthedocs.io/en/latest/
[codecov-badge]:        https://img.shields.io/codecov/c/github/kjjuno/swagger-compare/master.svg?style=flat
[codecov-dashboard]:    https://codecov.io/gh/kjjuno/swagger-compare
[license-badge]:        https://img.shields.io/github/license/kjjuno/swagger-compare.svg
[license-url]:          https://github.com/kjjuno/swagger-compare/blob/master/LICENSE
[npm-version-badge]:    https://badge.fury.io/js/swagger-compare.svg
[npm-downloads-badge]:  https://img.shields.io/npm/dt/swagger-compare.svg?style=flat
[npm-page]:             https://www.npmjs.com/package/swagger-compare
[docker-size-badge]:    https://img.shields.io/microbadger/image-size/kjjuno/swagger-compare.svg?style=flat
[docker-pulls-badge]:   https://img.shields.io/docker/pulls/kjjuno/swagger-compare.svg?style=flat
[docker-page]:          https://hub.docker.com/r/kjjuno/swagger-compare

## Installation

### npm

```
npm install -g swagger-compare
```

### Docker

```
docker pull kjjuno/swagger-compare
```

## Usage

```
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
```

## Example
```
swagger-compare https://raw.githubusercontent.com/kjjuno/swagger-compare/master/test/petstore.yaml https://raw.githubusercontent.com/kjjuno/swagger-compare/master/test/petstore-new.yaml
```

```yaml
version: 1.0.0
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
```
