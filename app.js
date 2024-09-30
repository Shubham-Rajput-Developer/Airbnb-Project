const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/",(req,res)=>{
    res.send("Hi ,I am root");
});

app.get("/testListening",async(req,res)=>{
    let sampleListing =  new Listing({
        title:"My new vila",
        description:"by the beach",
        price:1200,
        location:"Pune, Maharastra",
        country:"India",
    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("successfull testing");
});

app.listen(8080,()=>{
    console.log("server is listen on port 8080");
});














