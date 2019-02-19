const express = require('express');
const app = express();
const axios = require('axios');

app.enable('trust proxy');
app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function (req, res) {
  var q = req.query.place;
  var days = req.query.value;
  var url1 = 'https://api.apixu.com/v1/forecast.json?key='+process.env.KEY+'&q='+q+'&days='+days+'';
  var url2 = 'https://api.apixu.com/v1/search.json?key='+process.env.KEY+'&q='+q+'';
  axios.all([
    axios.get(url1),
    axios.get(url2)
  ]).then(axios.spread((res1, res2) => {
    res1.data.areas = res2.data;
    console.log(res1.data)
    res.json(res1.data)
  })).catch(error => {
    console.log(error);
  });
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
