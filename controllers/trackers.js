    var express = require('express');
    var router = express.Router();
    var http = require('http');
    var mongoose = require('mongoose');
    var Tracker = require('../models/Tracker');
    
    router.get('/', (req,res)=>{
      var url = ""
      if (req.params.term){
        url = `http://data.orghunter.com/v1/charitysearch?user_key=94b1dfd656c2c617995117f635f7b986&searchTerm=${term}`;
      }
      else{
       url = "http://data.orghunter.com/v1/charitysearch?user_key=94b1dfd656c2c617995117f635f7b986";
      }
      console.log('get url = ' + url)
      console.log(req.body);
      http.get(url,function(resp){
        let data = '';
      resp.on('data', function(d){
        data += d
      });

      resp.on('end', () => {

        let charities = JSON.parse(data)["data"];
        res.render('charity-index', {charities:charities})
      });
      
    }).on("error", function(e){
      console.log("Got error: " + e.message);
        });
      


    });

    // index: search all charity coresponding to the name 
    router.get('/search/:name', (req,res)=>{
      let term = req.params.name;
      let url = `http://data.orghunter.com/v1/charitysearch?user_key=94b1dfd656c2c617995117f635f7b986&searchTerm=${term}`;
  
      http.get(url,function(resp){
        let data = '';
      resp.on('data', function(d){
        data += d
      });

      resp.on('end', () => {

        let charities = JSON.parse(data)["data"];
        res.render('charity-index', {charities:charities})
      });
      
    }).on("error", function(e){
      console.log("Got error: " + e.message);
        });
      

    });

    // show: Method to show a single charity + tracker
    router.get('/:id', (req,res)=>{
     // var charities = getCharity(req.params.id);
     var charityId = req.params.id

     Tracker.find({charityId:charityId})
      .then(tracks => {
        // get the charity by with id
        console.log(charityId);
        let url = `http://data.orghunter.com/v1/charitysearch?user_key=94b1dfd656c2c617995117f635f7b986&ein=${charityId}`;

  console.log("start find charity");
  http.get(url,function(resp){
    let data = '';
  resp.on('data', function(d){
    data += d
  });

  resp.on('end', () => {
    
    char = JSON.parse(data).data;
    console.log(char);
    console.log("after printing charity object")
    charity = char[0];
    console.log('single charity');
    console.log(charity);
    res.render('charity-show',{tracks,charity})
  });
  
}).on("error", function(e){
  console.log("Got error: " + e.message);
});




      }).catch(error => {
        res.status(400).send({
          error: error
        });
      });


    });

    // New: create new charity tracker
    router.get('/new', (req, res) => {
      console.log(req.params.charityId);
        res.render('charity-new', { movieId: req.params.charityId });
      });
      

    // create: Method to create new charity
    router.post('/', (req,res)=>{
      console.log(req.body);
      Tracker.create(req.body).then((track)=>{
        console.log(track);
        res.redirect(`/${track.charityId}`);
      })


    });

    function getCharity(){
      let url = "http://data.orghunter.com/v1/charitysearch?user_key=94b1dfd656c2c617995117f635f7b986";
  
      http.get(url,function(resp){
        let data = '';
      resp.on('data', function(d){
        data += d
      });

      resp.on('end', () => {

        let charity = JSON.parse(data);

        return charity;
      });
      
    }).on("error", function(e){
      console.log("Got error: " + e.message);
        });
    }
    function searchCharity(charityName){
      let url = `http://data.orghunter.com/v1/charitysearch?user_key=94b1dfd656c2c617995117f635f7b986&searchTerm=${charityName}`;
      http.get(url,function(resp){
        let data = '';
      resp.on('data', function(d){
        data += d
      });

      resp.on('end', () => {

        return JSON.parse(data);
        
      });
      
    }).on("error", function(e){
      console.log("Got error: " + e.message);
  });
}
// function findSingleCharity(charityId){
//   let url = `http://data.orghunter.com/v1/charitysearch?user_key=94b1dfd656c2c617995117f635f7b986&ein=${charityId}`;

//   console.log("start find charity");
//   http.get(url,function(resp){
//     let data = '';
//   resp.on('data', function(d){
//     data += d
//   });

//   resp.on('end', () => {
    
//     charity = JSON.parse(data);
//     console.log('single charity');
//     console.log(charity.data[0]);
//     return charity;
//   });
  
// }).on("error", function(e){
//   console.log("Got error: " + e.message);
// });
// }

module.exports = router;