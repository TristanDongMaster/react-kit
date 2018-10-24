var express = require('express')
var mockService = require('../mockService')
var app = express()
var cp = require('child_process')
var port = 9000
var PATHS = require('./PATHS');
var compression = require('compression')

app.use(compression());
app.use(express.static(PATHS.ROOT  + '/dist/build'));

app.get("/myapi", function (req, res) {
  var json = {
    "data": {
      "respCode": "00000000",
      "respMsg": "处理成功",
      "value": 1 //1-签约成功，0签约失败，2-已经签约
    }
  }
  setTimeout(function () {
    res.send(json)
  }, 100)
})

app.get("/api/*", function (req, res) {
  console.log(req.originalUrl)
  var data = mockService(req.originalUrl)
  setTimeout(function () {
    res.send(data)
  }, 100)
})


app.get("/", function(req, res) {
  res.sendFile(PATHS.ROOT  + '/dist/build/index.html')
})
app.get("/*", function(req, res) {
  res.sendFile(PATHS.ROOT + '/dist/build/index.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/home in your browser.", port, port)
    cp.exec('open http://localhost:9000/pages/home')   
  }
})
