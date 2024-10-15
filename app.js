const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");

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

const sessionOption = {
    secret:"MySuperSecreteCode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }, 
};
app.get("/",(req,res)=>{
    res.send("Hi ,I am root");
});

app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
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
