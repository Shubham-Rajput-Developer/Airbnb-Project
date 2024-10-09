const express = require("express");
const router =  express.Router();

//Index user route
router.get("/",(req,res)=>{
    res.send("GET for users");
});

//Show user
router.get("/:id",(req,res)=>{
    res.send("GET for users id");
});

//Post users
router.post("/",(req,res)=>{
    res.send("POST for users");
});

//Delete users
router.delete("/:id",(req,res)=>{
    res.send("DELETE for Users")
});

module.exports = router;