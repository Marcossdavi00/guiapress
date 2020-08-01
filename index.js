const express = require('express')
const app = express();
const PORT = process.env.PORT || 3001
const categories = require('./categories/categoriescontroler')
const articles = require('./articles/articlescontroler')
const home = require("./home/home")
const db = require('./models')
const flash = require('connect-flash')
const session = require('express-session')

//Session e Midlewars
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

//Bodu-parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//View
app.set('view engine', 'ejs')

//Static File
app.use(express.static('public'))

//Router
app.use('/', categories)
app.use('/', articles)
app.use('/', home)


db.sequelize.sync().then(()=>{
    app.listen(PORT, ()=>{

        console.log(`Servidor Rodando na porta ${PORT}`)
})
}).catch(err=>{
console.log("ola");
    console.log(`Erro ao se conectar com o banco de dados ${err}`)
})