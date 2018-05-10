const {
  BatchRecorder,
  jsonEncoder: {JSON_V2}
} = require('zipkin');
const {HttpLogger} = require('zipkin-transport-http');

// Send spans to Zipkin asynchronously over HTTP
const zipkinUrl = process.env.ZIPKIN_URL;
const recorder = new BatchRecorder({
  logger: new HttpLogger({
    endpoint: zipkinUrl,
    jsonEncoder: JSON_V2
  })
});

module.exports.recorder = recorder;
