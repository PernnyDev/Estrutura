const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

//carregaando o cabeçalho do html em outras paginas
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rota principal
app.get('/', function (req, res) {

    res.render('home');
});

//rota para cadastro
app.get('/cad', function (req, res) {

    res.render('formulario');
});

//fazendo a inserção no banco de dados
app.post('/add', function (req, res) {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function () {
        //redirecionado para home com barras
        res.redirect('/');
    }).catch(function (erro) {
        res.send('Houve um erro: ' + erro);
    });
});

app.listen(8081, function () {
    console.log('Servidor rodando na url http://localhost:8081');
});