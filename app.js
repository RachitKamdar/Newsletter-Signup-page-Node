// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});
// app.get("/failure",function(req,res){
//     res.redirect("/");
// });

app.post("/",function(req,res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.emailid;
    var data = {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
        }
    ]
    };
    var jsondata = JSON.stringify(data);

    var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/c36431101f",
        method: "POST",
        headers: {
            "Authorization": "rachit1 2b511c55fc4281d3aba42c14b86e9d98-us20"
        },
        body: jsondata
    };
    request(options, function(error,response,body){
        if(error) {
            res.sendFile(__dirname +"/failure.html");
        }
        else {
            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname +"/failure.html");
            }
        }
    });
});

//2b511c55fc4281d3aba42c14b86e9d98-us20

//c36431101f


app.listen(process.env.PORT || 3000, function(){
    console.log("Server Listening to Port 3000");
});
