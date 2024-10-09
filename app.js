const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js");
const review = require("./routes/review.js");

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

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("Hi ,I am root");
});

//Use 
app.use("/listings",listings);
app.use("/listings/:id/reviews",review);


//If no route found that was throw
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
});

//error handling custom middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something wrong"} = err;
    res.status(statusCode).render("error.ejs",{message});
    //res.status(statusCode).send(message);
});

app.listen(8080,()=>{
    console.log("server is listen on port 8080");
});
