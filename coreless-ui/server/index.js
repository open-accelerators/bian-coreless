const express = require("express");
const bodyParser = require('body-parser')
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
const SERVICE_HOST = process.env.CO_SERVICE_HOST || '192.168.49.2';
const SERVICE_PORT = process.env.CO_SERVICE_PORT || '31245';
const PRP_SERVICE_HOST = process.env.PRP_SERVICE_HOST || '192.168.49.2';
const PRP_SERVICE_PORT = process.env.PRP_SERVICE_PORT || '32041';

app.post('/customerOffer', function(req, res) {

    var post_data = JSON.stringify(req.body);

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

    var post_req = http.request(post_options, function(response) {
        if (response) {
          res.json({ message: 'Request: ' + req.body.procedure.customerReference + '; Response: ' + response.statusCode });
        }
    });

    post_req.on('error', error => {
      console.error(error)
      res.json({ message: 'Request: ' + req.body.procedure.customerReference + '; Response: ' + error });
    })

    post_req.write(post_data);
    post_req.end();
});

app.get('/partyRoutingProfile', function(req, res) {

  var get_options = {
      host: `${PRP_SERVICE_HOST}`,
      port: `${PRP_SERVICE_PORT}`,
      path: '/party-routing-profile/sd1/party-state',
      method: 'GET',
  };

  var get_req = http.request(get_options, function(response) {
      if (response) {
        response.setEncoding('utf8');
        response.on('data', function (body) {
          res.json({ prpData: JSON.stringify(JSON.parse(body).partyRoutingStates), error: '' });
        });
      }
  });

  get_req.on('error', error => {
    console.error(error)
    res.json({ prpData: JSON.stringify([]), error: error });
  })

  get_req.end();
});

app.put('/UpdateCustomerOffer', function(req, res) {

  var post_data = JSON.stringify(req.body);

  var post_options = {
      host: `${SERVICE_HOST}`,
      port: `${SERVICE_PORT}`,
      path: '/customer-offer/sd1/customer-offer-procedure/' + req.body.procedure.customerReference + '/update',
      method: 'PUT',
      headers: {
          'Host': `${SERVICE_HOST}`,
          'Content-Type': 'application/json',
          'Content-Length': post_data.length
      }
  };

  var post_req = http.request(post_options, function(response) {
      if (response) {
        res.json({ message: 'Request: ' + req.body.procedure.customerReference + '; Response: ' + response.statusCode });
      }
  });

  post_req.on('error', error => {
    console.error(error)
    res.json({ message: 'Request: ' + req.body.procedure.customerReference + '; Response: ' + error });
  })

  post_req.write(post_data);
  post_req.end();
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});