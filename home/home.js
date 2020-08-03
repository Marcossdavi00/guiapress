const express = require("express")
const router = express.Router();
const { Category } = require("../models")
const { Article } = require("../models")

router.get("/home", (req, res)=>{

    Article.findAll({order: [['id', 'DESC']]}).then(article=>{
        Category.findAll().then(category=>{
            res.render("index", {article, category})
        }).catch(err=>{
            req.flash("error_msg", "Erro ao exibir as Categorias")
            res.redirect("/home")
        })
    }).catch(err=>{
        req.flash("error_msg", "Erro ao exibir os artigos")
        res.redirect("/home")
    })
})

router.get('/:slug', (req, res)=>{

    let slug = req.params.slug

    if(!slug || slug === undefined){
        req.flash("error_msg", "Artigo não existe")
        res.redirect("/home")
    }else{
        Article.findOne({
            include: [{model: Category, require: true}],
            where: {slug}}
            ).then(article=>{

                Category.findAll().then(category=>{
                res.render("page", {article, category})
                
                }).catch(err=>{
                req.flash("error_msg", "Erro ao exibir as Categorias")
                res.redirect("/home")
                })

            }).catch(err=>{
            req.flash("error_msg", "Houve um erro ao mostrar artigo")
            res.redirect("/home")
        })
    }
})

router.get("/category/:slug", (req, res)=>{

    let slug = req.params.slug

    if (!slug || slug === undefined) {
        req.flash("error_msg", "Categoria Inválida")
        res.redirect("/home")
    }else{
        Category.findOne({
            where: {slug},
            include: [{model: Article,
                include: [{model: Category, require: true}],
                require: true}]
        }).then(category=>{
            if (category === undefined) {
                req.flash("error_msg", "Erro ao listar os artigos dessa categoria")
                res.redirect("/home")
            } else {
                Category.findAll().then(categories=>{
                    console.log(categories.article);
                    res.render("index", {article: category.article, categories})
                }).catch(err=>{
                req.flash("error_msg", "Erro ao listar os artigos dessa categoria")
                res.redirect("/home")
                })
            }
        }).catch(err=>{
            req.flash("error_msg", "Erro ao listar os artigos dessa categoria")
            res.redirect("/home")
        })
    }
})


module.exports = router