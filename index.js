const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

//importando  controller na aplicação
const CategoriesController = require('./categories/CategoriesController');
const ArticlesController = require('./articles/ArticlesController');

//definindo configurações do sistema
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//importanto models da aplicação
const Article = require('./articles/Article');
const Category = require('./categories/Category');

//Testando conexão com o banco de dados.
connection
    .authenticate()
    .then(() => {
        console.log('Conexão Estabelecida');
     }).catch((err) => {
         console.log(err);
     });

app.use('/', CategoriesController);
app.use('/', ArticlesController);

app.get('/', (req, res) => {
    Article.findAll({
        include:[
            {
                model: Category,
            }
        ]
        }).then(articles => {res.render('index', {
            articles: articles
        })
    });
});

app.get('/:slug', (req, res)=> {
    var slug = req.params.slug;

    Article.findOne({
        where:{
            slug:slug
        }     
    }).then(article => {
        if (article != undefined) {
            res.render('article', {
                article: article
            });
        }else{
            res.rendirect('/');
        }
    }).catch( err => {
        res.redirect('/')
    })

})

app.listen(8080,()=>{
    console.log('Server is running at port 8080');
});