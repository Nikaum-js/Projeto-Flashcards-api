const express = require("express");
const app = express();
const banco = require("./mock/banco")


app.use(express.json());

// GET /api/colecoes - Esse endpoint deverá listar todas as coleções do sistema.
app.get( "/api/colecoes", function( req, res){
    res.json( banco.todasColecoes() );
} );

//GET /api/colecoes/:id - Esse endpoint deverá retornar os dados da coleção selecionada pelo parâmetro id.
app.get( "/api/colecoes/:id", function( req, res){
    const { id } = req.params;
    const colecao = banco.selecionaColecao( id );

    if( !colecao ) res.status(204).json();

    res.json( colecao );
} );

// GET /api/colecoes/flashcards/:id- Esse endpoint deverá listar todos os flashcards da coleção passada pelo endereço, 
// identificado pela parâmetro id.
app.get( "/api/colecoes/flashcards/:id", function( req, res){
    const { id } = req.params;
    const flashcard = banco.selecionaFlashCardsDaColecao( id );

    if( !flashcard ) res.status(204).json();

    res.json( flashcard );
} );

// GET /api/flashcards/:id- Esse endpoint deverá exibir os dados somente do flashcard selecionado, identificado pela variável id.
app.get( "/api/flashcards/:id", function( req, res){
    const { id } = req.params;
    const flashcard = banco.selecionaFlashCard( id );

    if( !flashcard ) res.status(204).json();

    res.json( flashcard );
} );

// POST /api/colecoes - Esse endpoint deverá criar uma nova coleção com os dados enviada pelo client, por meio do body.
app.post( "/api/colecoes", function( req, res ){
    const { descricao, publico } = req.body;
    banco.criarColecao({ descricao, publico });

    res.json( { descricao, publico } );
} );

// PUT /api/colecoes/:id - Esse endpoint deverá selecionar uma coleção, por meio do parâmetro id, atualizar a 
// mesma com os dados enviados por meio do body e salvar a coleção.
app.put( "/api/colecoes/:id", function( req, res ){
    const { id } = req.params;
    const { descricao, publico } = req.body;
    const colecao = banco.selecionaColecao( id );

    colecao.descricao = descricao;
    colecao.publico = publico;

    banco.salvar( colecao );

    res.json( colecao )
} );

// DELETE /api/colecoes/:id - Esse endpoint deverá selecionar uma coleção, por meio do parâmetro id, e 
// apagar o registro na base de dados.
app.delete( "/api/colecoes/:id", function( req, res ){
    const { id } = req.params;
    const colecao = banco.selecionaColecao( id );

    banco.apagar(colecao);
    res.json( { "mensagem": "coleção apagada!" } );

} );



//GET /api/colecoes - Esse endpoint deverá listar todas as coleções do sistema.

app.get( "/api/colecoes", function( req, res){
    res.json( banco.todasColecoes() );
} )

//GET /api/colecoes/:id - Esse endpoint deverá retornar os dados da coleção selecionada pelo parâmetro id.

app.get( "/api/colecoes/:id", function( req, res){
    const { id } = req.params;
    const colecao = banco.selecionaColecao( id );

    if( !colecao ) res.status(204).json();

    res.json( colecao );
} );

//GET /api/colecoes/flashcards/:id- Esse endpoint deverá listar todos os flashcards da coleção passada pelo endereço, identificado pela parâmetro id.

app.get( "/api/colecoes/flashcards/:id", function( req, res){
    const { id } = req.params;
    const flashcard = banco.selecionaFlashCardsDaColecao( id );

    if( !flashcard ) res.status(204).json();

    res.json( flashcard );
} );

//POST /api/colecoes - Esse endpoint deverá criar uma nova coleção com os dados enviada pelo cliente, por meio do body.

app.post( "/api/colecoes", function( req, res ){
    const { descricao, publico } = req.body;
    banco.criarColecao({ descricao, publico });

    res.json( { descricao, publico } );
} );

//PUT /api/colecoes/:id - Esse endpoint deverá selecionar uma coleção, por meio do parâmetro id, e atualizar a mesma com os dados enviados pelo valores enviados por meio do body.

app.put( "/api/colecoes/:id", function( req, res ){
    const { id } = req.params;
    const { descricao, publico } = req.body;
    const colecao = banco.selecionaColecao( id );

    colecao.descricao = descricao;
    colecao.publico = publico;

    banco.salvar( colecao );

    res.json( colecao );
} );

//DELETE /api/colecoes/:id - Esse endpoint deverá selecionar uma coleção, por meio do parâmetro id, e excluir o registro na base de dados.

app.delete( "/api/colecoes/:id", function( req, res ){
    const { id } = req.params;
    const colecao = banco.selecionaColecao( id );

    banco.apagar(colecao);
    res.json( { "mensagem": "coleção apagada!" } );

} );

//GET /api/flashcards/:id- Esse endpoint deverá exibir os dados somente do flashcard selecionado, identificado pela variável id.

app.get( "/api/flashcards/:id", function( req, res){
    const { id } = req.params;
    const flashcard = banco.selecionaFlashCard( id );

    if( !flashcard ) res.status(204).json();

    res.json( flashcard );
} );

//POST /api/flashcards - Esse endpoint deverá criar um novo flashcard com os dados enviada pelo client, por meio do body.

    app.post('/api/flashcards', (req, res)=>{
    //requisita os dados do flashcard do body
    const {score, frente, verso}=req.body
    //busca na classe banco o metodo criarColeção e busca as variaveis descricao e publico
    banco.criarFlashcard({ score, frente, verso });

    //printa na tela uma mensagem mostrando que uma coleção foi criada!
    res.json( { "mensagem": "novo flashcard criado com sucesso!!!" } );
    //busca os valores da descrição e publico e mostra na tela
    res.json( { score, frente, verso } );

} );

//PUT /api/flashcards/:id - Esse endpoint deverá selecionar um flashcard, por meio do parâmetro id, e atualizar a mesma com os dados enviados pelo valores enviados por meio do body.

    app.put( '/api/flashcards/:id', ( req, res )=>{
    //requisita o Id 
    const { id } = req.params;
    //busca as variaveis do body
    const { score, frente, verso } = req.body;
    //busca na classe banco o metodo Id e declara que ele fara parte de flashcard
    const flashcard = banco.selecionaFlashCard( id );

    //troca o valor de descricao
    flashcard.descricao = descricao;
    //troca o valor de publico
    flashcard.publico = publico;

    //busca na classe banco o metodo salvar
    banco.salvar( flashcard );

    //mostra na tela o valor de colecao
    res.json( flashcard );

    res.json( { "mensagem": "flashcard salvo com sucesso!" } );
    
} );

//DELETE /api/flashcards/:id - Esse endpoint deverá selecionar um flashcard, por meio do parâmetro id, e excluir o registro na base de dados.

app.delete( "/api/colecoes/:id", function( req, res ){
    //requesita o id como parametro
    const { id } = req.params;
    //busca na classe banco o metodo para selecionar a coleçao pelo id
    const flashcard = banco.selecionaFlashCard( id );

    //chama o metodo apagar da classe banco e coloca a colecao como parametro para ser apagado
    banco.apagarFlashcard(flashcard);
    //printa na tela uma mensagem mostrando que a colecao foi apagada com sucesso
    res.json( { "mensagem": "flashcard apagado com sucesso!" } );
} );

app.listen( process.env.PORT || 3000, function(){
    console.log('Server rodando');
} );
