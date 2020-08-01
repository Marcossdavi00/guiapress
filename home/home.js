const express = require("express")
const router = express.Router();
const { Category } = require("../models")
const { Article } = require("../models")

router.get("/", (req, res)=>{

    Article.findAll().then(article=>{
        res.render("index", {article})
    })
})

module.exports = router