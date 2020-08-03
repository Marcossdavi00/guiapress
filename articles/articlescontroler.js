const express = require('express')
const router = express.Router();
const { Article } = require("../models")
const { Category } = require("../models")
const slugify = require('slugify')

router.get('/admin/articles', (req,res)=>{

    Article.findAll({
        include: [{model: Category, require: true}]
    }).then(article=>{
        res.render('admin/articles/index', {article})
    }).catch(err=>{
        req.flash("error_msg", "Erro ao listar Artigos")
        res.redirect("/admin/articles")
    })
    
})

router.get('/admin/articles/new', (req,res)=>{

    Category.findAll().then(category=>{
        res.render('admin/articles/new', {category})
    }).catch(err=>{
        req.flash("error_msg", "Erro ao listar categoria")
        res.redirect("/admin/articles")
    })
    
})

router.post("/admin/articles/save", async(req, res)=>{

    let { title, body, categoryid} = req.body

    if (!title || title === undefined) {
        req.flash("error_msg", "Título invalido")
        res.redirect("/admin/articles/new")
    } else{

        let newArticle = await Article.create({
            title,
            slug: slugify(title),
            body,
            CategoryId : categoryid
        }).then(()=>{
            req.flash("success_msg", "Artigo criado com sucesso")
            res.redirect("/admin/articles")
        }).catch(err=>{
            req.flash("error_msg", "Erro ao salvar categoria, tente novamente")
            console.error(err);
            res.redirect("/admin/articles")
        })

    }
})

router.post("/admin/articles/delete", (req, res)=>{

    let id = req.body

    if (id === undefined) {
        req.flash("error_msg", "Erro ao apagar o artigo")
        res.redirect("/admin/articles")
    }else{
        Article.destroy({where: id}).then(()=>{
            req.flash("success_msg", "Artigo deletado com sucesso")
            res.redirect("/admin/articles")
        })
    }

})

router.get("/admin/articles/edit/:id", (req, res)=>{
    var id = req.params.id

    if (isNaN(id)) {
        req.flash("error_msg", "Artigo inválido")
        res.redirect("/admin/articles")
    }else{
        Article.findByPk(id).then(article=>{
            Category.findAll().then(category=>{
                res.render("admin/articles/edit", {article, category})
            }).catch(err=>{
            req.flash("error_msg", "Houve um erro interno ao editar Categoria")
            res.redirect("/admin/articles")
            })
        }).catch(err=>{
            req.flash("error_msg", "Houve um erro interno ao editar Artigo")
            res.redirect("/admin/articles")
        })
    }

    
})

router.post("/admin/articles/edit/save", async(req, res)=>{

    let { id, title, body, categoryid} = req.body

    if (!title || title === undefined) {
        req.flash("error_msg", "Título invalido")
        res.redirect("/admin/articles/new")
    } else{

        let newArticle = await Article.update({
            title,
            slug: slugify(title),
            body,
            CategoryId : categoryid
        },{where: {id}}).then(()=>{
            req.flash("success_msg", "Artigo editado com sucesso")
            res.redirect("/admin/articles")
        }).catch(err=>{
            req.flash("error_msg", "Erro ao salvar categoria, tente novamente")
            console.error(err);
            res.redirect("/admin/articles")
        })

    }
})

module.exports = router