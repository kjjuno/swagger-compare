const assert  = require('assert');
var axios     = require('axios');
var fs        = require('fs');
var yaml      = require('js-yaml');
const swagger = require('../src/swagger-compare');

describe('compare', function() {
  it('detects no change when files are identical', function() {

    var text = fs.readFileSync('test/petstore.yaml', 'utf8');
    assert.notEqual(null, text, "could not read petstore.yaml");
    var doc = yaml.safeLoad(text);

    var expected = {
      version: '1.0.0',
      deprecated: {
        paths: {}
      }
    };

    var actual = swagger.compare(doc, doc);

    assert.deepEqual(actual, expected, "Unexpected format for summary object");
  });

  it('detect only deprecated endpoints that are not in the baseline', function() {
    var baselineText = fs.readFileSync('test/petstore.yaml', 'utf8');
    assert.notEqual(null, baselineText, "could not read petstore.yaml");

    var newText = fs.readFileSync('test/petstore-new.yaml', 'utf8');
    assert.notEqual(null, baselineText, "could not read petstore-new.yaml");

    var baselineDoc = yaml.safeLoad(baselineText);
    var newDoc = yaml.safeLoad(newText);

    var expected = {
      version: '1.0.0',
      deprecated: {
        paths: {
          '/v1/pet': {
            'post': {
              'x-replaced-by': {
                path: '/v2/pet',
                verb: 'post'
              },
              'x-remove-on': 'undefined'
            },
            'put': {
              'x-replaced-by': 'undefined',
              'x-remove-on': '3/4/2019'
            }
          },
          '/v2/pet': {
            'post': {
              'x-replaced-by': {
                path: '/v3/pet',
                verb: 'post'
              },
              'x-remove-on': '2/13/2019'
            }
          }
        }
      }
    };

    var actual = swagger.compare(baselineDoc, newDoc);

    assert.deepEqual(actual, expected, "Unexpected format for summary object");
  });
});
