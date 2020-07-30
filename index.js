const express = require('express')
const app = express();
const PORT = process.env.PORT || 3001
const categories = require('./categories/categoriescontroler')
const articles = require('./articles/articlescontroler')
const db = require('./models')
const flash = require('connect-flash')
const session = require('express-session')

app.use(session({
    secret: 'guiapress',
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

app.use((req, res, next)=>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")

    next();
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use('/', categories)
app.use('/articles', articles)


db.sequelize.sync().then(()=>{
    app.listen(PORT, ()=>{

        console.log(`Servidor Rodando na porta ${PORT}`)
})
}).catch(err=>{
console.log("ola");
    console.log(`Erro ao se conectar com o banco de dados ${err}`)
})