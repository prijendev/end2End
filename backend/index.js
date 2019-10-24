var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var Client = require('./models/Client');
var Project = require('./models/Project');
var jwt = require('jsonwebtoken');
var parser = require('body-parser');
var Bid = require('./models/Bid')
var Grant = require('./models/Grant')
var mail= require('nodemailer')

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



app.post('/register',(req,res)=>{
    
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log(req.body);
    var client = new Client(req.body);
    client.skills="";
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
            res.json({
                user
               });
            
        }
        else
        {
            console.log(password + '  ' +client.password);
          
            if(client.password == password)
            {
                
                jwt.sign({client},'secretkey',{expiresIn:'1h'},(err,token)=>{


                    res.json({
                        token,client
                        });
                        
                });
             
                console.log("matched");
                  
            }  
            else
            {
                res.json({
                       password
                      });
                  
            }
         }
          
    });
    

    
});



function auth (req,res,next)
{
    const token=req.body.token;
    console.log(token + "fdgfdgdfg");
    
    if(!token)
    {
        return res.status(401).send('access denied');
    }
    try
    {
        const verified = jwt.verify(token,'secretkey');
        req.client=verified;
        
        console.log('valid token');
        next()
    }
    catch(err)
    {
        console.log('Invalid token');
        res.json({
            "status":"not"
           });
    }
}




app.post('/project',(req,res)=>{

    var project = new Project(req.body);

    let ts = Date.now();

    let date_ob = new Date(ts);
    project.date=date_ob;

    project.save((err,result)=>{
        if(err)
        console.log("err");
        else
        {
            res.json({
                project_id:project._id
               });
        }
    });
});

app.post('/push_project',(req,res)=>{
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.body.client_id);
    var project = new Project(req.body);
    
    project.status="Post";
    project.save((err,result)=>
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


app.post('/push_bid',(req,res)=>{
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    console.log(req.body);
    
    var bid = new Bid(req.body);
    
    
    bid.save((err,result)=>
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


app.post('/prj_all',auth,(req,res)=>
{
    var token = req.body.token;
    const decode = jwt.decode(token,'secretkey');

    
    var client_id = decode.client._id;
   
    console.log(client_id);
    
   Project.find({client_id:client_id}).exec(function(err,project)
   {
       if(err)
       {
        res.json({
            "hiii":"errr"
        });
       }
       else
       {
        console.log(project);
        res.json({
            project,client_id
        });
       }
   })

    
})


app.post('/skill_data',auth,(req,res)=>
{
    var skills = req.body.skills;
    

  
 
       Project.find().exec(function(err,project)
       {
           if(err)
           {
            res.json({
                "hiii":"errr"
            });
           }
           else
           {
            //console.log(project);
            res.json({
                project
            });
           }
       })
 
  
   

    
})


app.post('/getBid',(req,res)=>
{
    var project_id=req.body.project_id;

    console.log(project_id + 'hiii');
    Bid.find({project_id:project_id}).exec(function(err,bids)
    {
        if(err)
        console.log("error found to fetch bids")
        else
        {
            console.log(bids);
            res.json({
                bids
            });
        }
    })
})

/* var transporter = mail.createTransport({
    service: 'gmail',
    auth: {
      user: 'prijenkhokhani58@gmail.com',
      pass: 'success776655'
    }
  }); */



app.post('/grant',(req,res)=>
{

    /* var mailOptions = {
        from: 'prijenkhokhani58@gmail.com',
        to: 'prijenkhokhani58@gmail.com',
        subject: 'conformation mail',
        html: '<h4>Project has been Granted</h4>'
      }; */


    console.log(req.body + 'fdfdfg');
    var grant = new Grant(req.body);
    grant.save((err,done)=>
    {
        if(err)
        {
            console.log("There is error in inserting data to database");
            res.sendStatus(500);
        }
        else
        {

            /* transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              }); */

            res.json({
                done
            })
        }
    });

})




app.post('/prj_data',(req,res)=>
{
    var prj_id = req.body.id;

    console.log(prj_id);

    Project.findOne({ _id : prj_id }).exec(function(err,project)
    {
        if (err) 
        {
            console.log("Error");
        }
        else if (!project) 
        {
            
            console.log("project does not exist");
            console.log(err);
        }
        else
        {
             res.json
             ({
                 project
            });
         
         }
          
    });

})
app.post('/bid',(req,res)=>{

    var bid = new Bid(req.body);

    let ts = Date.now();

    let date_ob = new Date(ts);
    bid.date=date_ob;

console.log(date_ob);
    bid.save((err,result)=>{
        if(err)
        console.log("err");
        else
        {
            res.json({
                bid_id:bid._id
               });
        }
    });
});
 


app.post('/us_update',(req,res)=>{

    console.log(req.body);
    var client_id = req.body._id;

   
    Client.findOne({ _id :req.body._id }).exec(function(err,client)
    {
        if (err) 
        {
            console.log("Error");
        }
        else if (!client) 
        {
            
            console.log("project does not exist");
            console.log(err);
        }
        else
        {
             client.updateOne({firstname:req.body.firstname,
                                company:req.body.company,
                                lastname:req.body.lastname,
                                email:req.body.email,
                               contact:req.body.contact,
                            address:req.body.address }).exec(function(err,update)
             {
                if (err) 
                {
                    console.log("Error");
                }
                else
                {
                    res.json({
                        update
                    })
                }       
             });

         
         }
          
    });

});


app.listen(app.get('port'),function(req,res){
    console.log("Server running on port ",app.get('port'));
});