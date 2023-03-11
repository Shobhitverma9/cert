const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const PORT = process.env.PORT || 3030;
const fetch = require('node-fetch');

// defining the Express app
const app = express();
// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  }

async function func2(data1,res){
    url = data1.self
    let delayres = await delay(3000);
    console.log(url)
    await fetch(url, {
        method: "GET",
        headers:{
          "Authorization":"Bearer bb_pr_043449a745e4963c2d1e01ea80254d",
        },}).then((response) => response.json()).then((data) => res.send(data)); // parses JSON response into native JavaScript objects
}

// defining an endpoint to return all ads
app.get('/', async (req, res) => {
    data1 = {
        "template":"3g8zka5Y2Xd9DEJXBY",
        "modifications":[
          {
            "name":"awardee_name",
            "text":"akshay",
          }
        ]
      }
    
  /*await fetch("https://api.bannerbear.com/v2/auth", {
    method: "GET",
    headers:{
        "Content-Type": "application/json",
        "Authorization":"Bearer bb_pr_043449a745e4963c2d1e01ea80254d",
    },}).then((response) => response.json()).then((data)=>res.send(data));
    
});*/
  
  await fetch("https://api.bannerbear.com/v2/images", {
    method: "POST",
    headers:{
        "Content-Type": "application/json",
        "Authorization":"Bearer bb_pr_043449a745e4963c2d1e01ea80254d",
    },body:JSON.stringify(data1),}).then((response) => response.json()).then((data)=>func2(data,res));
    
});

// starting the server
app.listen(PORT, () => {
  console.log('listening on port 3001');
});
