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
const CO_SERVICE_HOST = process.env.CO_SERVICE_HOST || 'example-customer-offer-camelk-rest-ishishov-olm.apps.ocp-dev01.lab.eng.tlv2.redhat.com';
const CO_SERVICE_PORT = process.env.CO_SERVICE_PORT || '80';
const CO_REPORT_SERVICE_HOST = process.env.CO_REPORT_SERVICE_HOST || 'customer-offer-reporting-ishishov-olm.apps.ocp-dev01.lab.eng.tlv2.redhat.com';
const CO_REPORT_SERVICE_PORT = process.env.CO_REPORT_SERVICE_PORT || '80';

app.post('/initiateCustomerOffer', function(req, res) {

    var post_data = JSON.stringify(req.body);

    var post_options = {
        host: `${CO_SERVICE_HOST}`,
        port: `${CO_SERVICE_PORT}`,
        path: '/CustomerOffer/Initiate',
        method: 'POST',
        headers: {
            'Host': `${CO_SERVICE_HOST}`,
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    var post_req = http.request(post_options, function(response) {
      if (response) {
        response.setEncoding('utf8');
        response.on('data', function (body) {
          let status = response.statusCode == 200 ? JSON.parse(body).CustomerOfferProcedure.CustomerOfferProcessingTaskResult : response.statusCode;
          res.json({ message: 'Request: ' + req.body.CustomerOfferProcedure.CustomerReference + '; Response: ' +  status});
        });
      }
    });

    post_req.on('error', error => {
      console.error(error)
      res.json({ message: 'Request: ' + req.body.CustomerOfferProcedure.CustomerReference + '; Response: ' + error });
    })

    post_req.write(post_data);
    post_req.end();
});

app.get('/getCustomerOffers', function(req, res) {

  var get_options = {
      host: `${CO_REPORT_SERVICE_HOST}`,
      port: `${CO_REPORT_SERVICE_PORT}`,
      path: '/customer-offer/reports/procedures',
      method: 'GET',
  };

  var get_req = http.request(get_options, function(response) {
    if (response) {
      response.setEncoding('utf8');
      response.on('data', function (body) {
        res.json({ coData: body, error: '' });
      });
    }
  });

  get_req.on('error', error => {
    console.error(error)
    res.json({ coData: JSON.stringify([]), error: error });
  })

  get_req.end();
});

app.put('/UpdateCustomerOffer', function(req, res) {

  var post_data = JSON.stringify(req.body);

  var post_options = {
      host: `${CO_SERVICE_HOST}`,
      port: `${CO_SERVICE_PORT}`,
      path: '/CustomerOffer/' + req.headers.id + '/Update',
      method: 'PUT',
      headers: {
          'Host': `${CO_SERVICE_HOST}`,
          'Content-Type': 'application/json',
          'Content-Length': post_data.length
      }
  };

  var post_req = http.request(post_options, function(response) {
    if (response) {
      response.setEncoding('utf8');
      response.on('data', function (body) {
        res.json({ coData: body, error: '' });
      });
    }
  });

  post_req.on('error', error => {
    console.error(error)
    res.json({ coData: JSON.stringify([]), error: error });
  })

  post_req.write(post_data);
  post_req.end();
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});