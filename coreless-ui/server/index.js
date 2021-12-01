const express = require("express");
// npm install body-parser --save
const bodyParser = require('body-parser')
// npm install request
var request = require('request');
var http = require('http');

const path = __dirname + '/../frontend/build/';

const app = express();
app.use(express.static(path));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

var corsOptions = {
  origin: "http://localhost:3000"
};

const PORT = process.env.PORT || 8080;
const SERVICE_HOST = process.env.SERVICE_HOST || '192.168.49.2';
const SERVICE_PORT = process.env.SERVICE_PORT || '32384';

app.post('/co', function(req, res) {
    console.log(req.body.procedure.customerReference);

    // Build the post string from an object
    var post_data = JSON.stringify(req.body);

    // An object of options to indicate where to post to
    var post_options = {
        host: `${SERVICE_HOST}`,
        port: `${SERVICE_PORT}`,
        path: '/customer-offer/sd1/customer-offer-procedure/initiation',
        method: 'POST',
        headers: {
            'Host': `${SERVICE_HOST}`,
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function(response) {
        if (response) {
          console.log(response.statusCode);
          res.json({ message: 'Request: ' + req.body.procedure.customerReference + '; Response: ' + response.statusCode });
        }
    });
    post_req.on('error', error => {
      console.error(error)
      res.json({ message: 'Request: ' + req.body.procedure.customerReference + '; Response: ' + error });
    })

    // post the data
    post_req.write(post_data);
    post_req.end();
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});