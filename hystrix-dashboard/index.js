const express = require('express');
const app = express();

app.use('/hystrix', dashboard({
    idleTimeout: 10000,  // will emit "ping if no data comes within 10 seconds,
    interval: 2000,      // interval to collect metrics
    proxy: true         // enable proxy for stream
}));

app.listen(8000);
