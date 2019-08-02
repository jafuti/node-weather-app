const request = require('request');
const forecast = (latitude,longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/a7b699e973846dd1541c8bad62b78f99/'+latitude +','+longitude
    request({url:url,json:true},(error, response)=>{
    if(error){
      callback('unable to find the services', undefined)
    } else if(response.body.error){
      callback('unable to find locations',undefined)
    } else{
      console.log(body.daily.data[0])
       callback(undefined, {
     
       location: response.body.daily.data[0].summary + 'It is currently ' + response.body.currently.temperature+ ' degree out ' + response.body.currently.precipIntensity + ' chance of rain'
          
       });
    }
  });
  
  }
  module.exports = forecast;
  