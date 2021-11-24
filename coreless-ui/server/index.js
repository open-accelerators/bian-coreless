const express = require("express");
const bodyParser = require('body-parser')
var request = require('request');
var http = require('http');

const PORT = process.env.PORT || 3001;

const app = express();

// npm install body-parser --save
app.use(bodyParser.json())

app.post('/co', function(req, res) {
    console.log(req.body.procedure.customerReference);
    res.json({ message: req.body.procedure.customerReference });

    // npm install request
    // Build the post string from an object
    var post_data = JSON.stringify(req.body);

    // An object of options to indicate where to post to
    var post_options = {
        host: '192.168.49.2',
        port: '31951',
        path: '/customer-offer/sd1/customer-offer-procedure/initiation',
        method: 'POST',
        headers: {
            'Host': '192.168.49.2',
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        if (res) {
          console.log(res.statusCode);
        //   console.log(res);
        }
    });

    // post the data
    post_req.write(post_data);
    post_req.end();
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});