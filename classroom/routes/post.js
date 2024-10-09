const express = require("express");
const router = express.Router();


//Index Post route
router.get("/",(req,res)=>{
    res.send("GET for posts");
});

//Show post
router.get("/:id",(req,res)=>{
    res.send("GET for posts id");
});

//Post post
router.post("/",(req,res)=>{
    res.send("POST for posts");
});

//Delete post
router.delete("/:id",(req,res)=>{
    res.send("DELETE for post")
});

module.exports = router;