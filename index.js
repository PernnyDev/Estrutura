const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

//carregaando o cabeçalho do html em outras paginas
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//arquivos estaticos

app.use('/public',express.static('public/css/bootstrap'));


//rota principal
app.get('/', function (req, res) {
    //o then passa os posts para nossa view
Post.findAll().then(function(posts){
    //var nposts = JSON.parse(JSON.stringify(posts))
    //res.render('home', {posts: nposts})
    posts=posts.map((post)=>{return post.toJSON()});//res.render('home', {posts: posts})
    res.render('home', {posts: posts});});
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

//excluindo um post

app.get('/deletar/:id', function (req, res) {
Post.destroy({where: {'id': req.params.id}}).then(function(){
    res.redirect('/');
}).catch(function(erro){
    res.send('Esta postagem não existe!');
});
});

//rota para alterar
app.get('/alterar/:id', function (req, res) {
    Post.findAll({where: {'id': req.params.id}}).then(function(posts){
       //var nposts = JSON.parse(JSON.stringify(posts))
        //res.render('home', {posts: nposts})  
        posts=posts.map((post)=>{return post.toJSON()});//res.render('home', {posts: posts})    
        res.render('alterar', {posts: posts});
    }).catch(function(erro){
        res.send('Esta postagem não existe!');
    });
});

//fazendo a alteração no banco de dados
app.post('/update', function (req, res) {
    Post.update({titulo: req.body.titulo, 
                conteudo: req.body.conteudo}, 
                {where: {'id': req.body.id}}).then(function(){
        res.redirect('/');
    }).catch(function(erro){
        res.send('Essa postagem não existe ' + erro);
    });
});





app.listen(8081, function () {
    console.log('Servidor rodando na url http://localhost:8081');
});