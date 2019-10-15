var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Client = require('./models/Client');
var jwt = require('jsonwebtoken');
var parser = require('body-parser');

var app = express();

app.use(parser.json());
app.use(function (req, res, next) {
    //Enabling CORS
    res.append("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
   res.append('Access-Control-Allow-Headers','Content-type');
   next();
    }); 
app.use(parser.urlencoded({ extended: false }));

var db = mongoose.connect('mongodb://localhost:27017/client',function(err,res)
{
    if(err)
    {
        console.log("There is error to connectin with mongodb");
    }
    else
    {
        console.log("connectin has been established with mongodb");
    }
});
app.set('port',process.env.port || 3000);

app.get('/',(req,res)=>{
    res.send("hellow node");
});

app.post('/register',(req,res)=>{
    
    res.setHeader('Access-Control-Allow-Origin', '*');

    var firstname = req.body.firstname;
   

    console.log(firstname);
    var client = new Client(req.body);


    
    client.save((err,result)=>
    {
        if(err)
        {
            console.log("There is error in inserting data to database");
            res.sendStatus(500);
        }
        else
        res.sendStatus(200);
    });

});

app.post('/login',(req,res)=>
{
    var email = req.body.email;
    var password = req.body.password; 

    console.log(email);
    Client.findOne({ email : email }).exec(function(err,client)
    {
       
        if (err) 
        {
            console.log("Error");
            
        }
        else if (!client) 
        {
            
            console.log("cliet does not exist");
            console.log(err);
        }
        else
        {
            console.log(password + '  ' +client.password);
          
            if(client.password == password)
            {
                
                jwt.sign({client},'secretkey',{expiresIn:'7d'},(err,token)=>{
                    res.json({
                        token:token
                        });
                });
             
                console.log("matched");
                  
            }  
            else
            {
                res.json({
                       password:'does not match'
                      });
                  
            }
         }
          
    });
    

    
});




app.listen(app.get('port'),function(req,res){
    console.log("Server running on port ",app.get('port'));
});