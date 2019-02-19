# swagger-compare

Provides a concise summary of api changes by making use of [x-replaced-by] and [x-remove-on]

[x-replaced-by]: https://github.com/kjjuno/swagger-extensions/blob/master/x-replaced-by.md
[x-remove-on]:   https://github.com/kjjuno/swagger-extensions/blob/master/x-remove-on.md

## Tags

[latest (Dockerfile)][Dockerfile]

[Dockerfile]: https://github.com/kjjuno/swagger-compare/blob/master/docker/Dockerfile

## Usage

```
docker run --rm kjjuno/swagger-compare [options] <baseline> <new>

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
docker run --rm kjjuno/swagger-compare https://raw.githubusercontent.com/kjjuno/swagger-compare/master/test/petstore.yaml https://raw.githubusercontent.com/kjjuno/swagger-compare/master/test/petstore-new.yaml
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
