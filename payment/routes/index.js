const hydraExpress = require('hydra-express');
const express = hydraExpress.getExpress();
const router = express.Router();
const hystrixSSEStream = require('hystrixjs').hystrixSSEStream;

const HTTP_OK = 200;

/**
* @description Create payment
* @param {function} route handler
*/
router.post('/create', function(req, res){
  hydraExpress.sendResponse(HTTP_OK, res, {
    result: {
      message: "Create payment successfully!"
    }
  });
});

/**
* @description Get payment info
* @param {function} route handler
*/
router.get('/get/:id', function(req, res){
  let id = req.params.id || 0;

  hydraExpress.sendResponse(HTTP_OK, res, {
    result : {
      message: "Get payment with id= " + id
    }
  });
});

/**
* @description Get hystrix data
* @param {function} route handler
*/
router.get('/hystrix.stream', function(req, res) {
    res.append('Content-Type', 'text/event-stream;charset=UTF-8');
    res.append('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
    res.append('Pragma', 'no-cache');
    res.append('Connection', 'keep-alive');
    return hystrixSSEStream.toObservable().subscribe(
        function onNext(sseData) {
            res.write('data: ' + sseData + '\n\n');
        },
        function onError(error) {
            console.log(error);
        },
        function onComplete() {
            return res.end();
        }
    );
});

module.exports = router;
