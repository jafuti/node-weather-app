const path = require('path');
const express = require('express');
const hbs = require('hbs');
const gecode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const request = require('request');


var app = express();
 

const port = process.env.PORT || 3000;

//Define paths for express config
// variable for public folder
const publicDirectoryPath = path.join(__dirname, '../public');
//variable for templetes folder which replaces views folder
const viewPath = path.join(__dirname, '../templetes/views');
//seting path for partials folder
const partialPath = path.join(__dirname,'../templetes/partials')


//setup handlers engine and views location
//to set hbs templete engine 
app.set('view engine', 'hbs');
//to tell the express to use viewPath folder instead of views
app.set('views',viewPath);
//to take the path to the directory where ur partials live
hbs.registerPartials(partialPath);

//Setup static directory to serve
// to tell the express to use static file from public folder
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather',
        name:'Jafar Muzeyin'
    });
});

app.get('/help',(req,res)=>{
   res.render('help',{
       helpText:'This is some helpful text.',
       title:'Help',
       name:'Jafar Muzeyin',
      
   });
});

app.get('/about',(req,res)=>{
res.render('about',{
    title:'about',
    name:'Jafar Muzeyin'}
)});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
gecode(req.query.address, (error,{latitude,longitude,location}={})=>{
    if(error){
        return res.send({error})
    }
    forecast(latitude,longitude, (error,forecastData)=>{
         if(error){
             return res.send({error})
         }
res.send({forecast:forecastData,
          location,
        address:req.query.address});
    })
} )
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})
 //Matching specifically after help   

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Jafar Muzeyin',
        errorMessage:'Help article is not found'
    });
});

 //For any of 404 error
 //* matched anything that has not been matched so far

app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Jafar Muzeyin',
        errorMessage:'Page not fund'
    });
});
    
app.listen(port, () => {
    console.log(`Server started on port`+ port);
});