const express = require('express')
const router = express.Router();
const { Category } = require('../models');
const slugify = require('slugify')

router.get("/admin/categories", (req, res)=>{
    
    Category.findAll().then(category=>{

        res.render('admin/categories/index', {category})

    }).catch(err=>{
        console.error(err);
    })

})

router.get('/admin/categories/new', (req,res)=>{
    res.render('admin/categories/new')
})

router.post('/admin/categories/save', async(req, res)=>{

    const title = req.body.title;

    if(!title || title === undefined){
        req.flash("error_msg", "Titulo inválido")
        res.redirect('/admin/categories/new')
    }else{

        let newCategory = await Category.create({
            title,
            slug: slugify(title)
            }).then(()=>{
            req.flash("success_msg", "Título criado com sucesso")
            res.redirect('/admin/categories')
    
        }).catch(err=>{
            console.log("ola");
            console.error(err);
        })
    }


})

router.post('/admin/categories/delete', (req, res)=>{

    let id = req.body.id

    if (id === undefined) {
        req.flash("error_msg", "Erro ao apagar a categoria")
        res.redirect('/admin/categories')
    }else{
        Category.destroy({where: {id}}).then(()=>{
            req.flash('success_msg', "Categoria deletada com sucesso")
            res.redirect('/admin/categories')
        }).catch(err=>{
            console.error(err);
        })
    }
})

router.get('/admin/categories/edit/:id', (req, res)=>{

    var id = req.params.id

    if (isNaN(id)) {
        req.flash("error_msg", "ID da categoria inválido")
        res.redirect('/admin/categories')
    } else{

            Category.findByPk(id).then(category=>{
            if(category != undefined){
                res.render('admin/categories/edit', {category})
            } else{
                req.flash("error_msg", "Categoria não existe")
            res.redirect('/admin/categories')
            }
        }).catch(err=>{
            req.flash("error_msg", "Erro ao editar a categoria")
            console.error(err);
            res.redirect('/admin/categories')
        })

    }



})

router.post('/admin/categories/update', async(req, res)=>{

    let { id, title } = req.body
    console.log(id, title);
    if(!title || title === undefined){
        req.flash("error_msg", "Titulo inválido")
        res.redirect('/admin/categories/edit/:id')
    }else{
        let editCategory = await Category.update({title, slug: slugify(title)},
            {where: {id}}).then(()=>{
            req.flash("success_msg", "Titulo editado com sucesso")
            res.redirect('/admin/categories')
        }).catch(err=>{
            req.flash("error_msg", "Erro ao editar categoria")
            console.error(err);
            res.redirect("/admin/categories")
        })
    }
})


module.exports = router