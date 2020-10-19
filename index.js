const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connection
    .authenticate()
    .then(() => {
        console.log('Conexão Estabelecida');
     }).catch((err) => {
         console.log(err);
     });


app.get('/', (req, res) => {
    res.render('index');
});

app.listen(8080,()=>{
    console.log('Server is running at port 8080');
})