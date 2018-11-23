const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());


let base64 = require('base-64');
let username = 'junction' ;
let password = 'junction2018';



auth = "Basic " + new Buffer(username + ":" + password).toString("base64");


app.get("/ensto", (req, res) => {
  request({
    url:`https://junctionev.enstoflow.com/api/v1/chargingPointGroup`,
    headers: {"Authorization" : auth}
  },
    (error, response, body) => {
      if(error){
        res.send("error")
        console.log(error);
      }
      res.send(response.body);
      console.log(response.body);
    }
  );
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("server is running at port " + PORT);
});