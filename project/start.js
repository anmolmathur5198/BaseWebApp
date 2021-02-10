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
app.get('/gettravel',(req,res)=>{
  // axios
  //   .get(
  //     "https://cors-anywhere.herokuapp.com/http://travelvacation.projectstatus.in/api/GetHotelsSearchData"
  //   )
  //   .then((result) => {
  //     return res.send(result.data);
  //   }).catch(err=>{
  //     console.log(err)
  //     return res.send(err)
  //   })

  var request = require("request");
  var options = {
    method: "GET",
    url: "http://travelvacation.projectstatus.in/api/GetHotelsSearchData",
    headers: {
      Cookie:
        ".AspNetCore.Session=CfDJ8Dv3J1K%2FLSlMs25E0Uj68aJZ%2B4Fp2fsUGdTqAbRtn7ahmeoR6%2Fn4oTestF06QdeBalsGmFjP7Y5Rn3fe0K%2BFOUyoM360Ed4nB2WP1%2FrGw96LIHi7WAroNSeQo5wE%2BBQ3blJRre6%2FOT%2BITbiLRAZYVSUmjQU1YWRnNTgIHXfwl9n9",
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    return res.json(JSON.parse(response.body))
  });

})
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
