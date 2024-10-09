const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
app.use(cookieParser("screatecode"));

app.get("/",(req,res)=>{
    console.log(req.cookies);
    res.send("Hi, I am root");
});

app.get("/greet",(req,res)=>{
    let {Name="Shubh"} = req.cookies;
    res.send(`Hi, ${Name}`);
});


app.get("/getCookies",(req,res)=>{
    res.cookie("Name","shubham",{signed:true});
    res.send("HELLOW BHAI");
});

app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    console.log(req.cookies);
    res.send("verified");
});
app.use("/users",users);
app.use("/posts",posts);


app.listen(3000,()=>{
    console.log("server is listenning on port 3000");
})