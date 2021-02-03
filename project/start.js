var express = require('express');
var app = express();
var axios = require('axios')
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

// views is directory for all template files
app.set('views', __dirname + '/html');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post("/secure", function (request, response) {
 
  console.log('checkingDtaa',request.body)
  response.send({success:true,data:'Working'});
});

app.get('/webhook', function(req,res){
  var data = {
    result:[{firstname:'Anmol',lastname:'maaa'}]
  }
  axios.post('',data).then((result)=>{
    console.log(result)
    return res.send({success:true,data:'Completed'})
  }).catch((err)=>{
    console.log(err)
    return res.send({success:false,err})
  })
})
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


// This file is what handles incoming requests and
// serves files to the browser, or executes server-side code
