const express=require("express");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
    const fName=req.body.fName;
    const lName=req.body.lName;
    const email=req.body.email;
    
    const data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }

            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url="https://us20.api.mailchimp.com/3.0/lists/1d4689d30c";

    const options={
        method: "POST",
        auth: "arijeet:0cf43cdadb3b1006c03c5ded13fedb9d-us20"
    }

    const request=https.request(url, options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
       
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started at 3000");
});

// Api Key
// 0cf43cdadb3b1006c03c5ded13fedb9d-us20

// Audience Id
// 1d4689d30c