const db = require('./db');

//criando a tabela postagem

const Post = db.sequelize.define('postagens',{
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
});

Post.sync({force: false});

module.exports = Post;
