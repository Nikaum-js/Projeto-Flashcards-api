const dados = require("./dados.mock.json");

module.exports = {
    todasColecoes(){
        return dados.colecoes;
    },

    selecionaColecao( colecaoId ){
        return dados.colecoes.find( col => col.colecaoId == colecaoId );
    },

    selecionaFlashCardsDaColecao( colecaoId ){
        return dados.flashcards.filter( flashcard => flashcard.colecaoId == colecaoId );
    },

    selecionaFlashCard( flashcardId ){
        return dados.flashcards.find( flashcard => flashcard.flashcardId == flashcardId );
    },
    
    criarColecao( colecaoNova ){
        dados.colecoes.push({
            colecaoId: dados.seqColecaoId++,
            descricao: colecaoNova.descricao,
            publico: colecaoNova.publico
        });
    },

    atualizaColecao( colecao ){
        const index  = dados.colecoes.findIndex( col => col.colecaoId == colecao.colecaoId);

        if( index < 0) return;
        dados.colecoes[index].descricao = colecao.descricao;
        dados.colecoes[index].publico = colecao.publico;
    },

    salvar( entidade ){
        if( entidade.frente ){
            this.salvarFlashcards( entidade );
        } else {
            this.salvarColecao( entidade );
        }
    },

    salvarColecao( colecao ){
        if( colecao.colecaoId ){
            this.atualizaColecao( colecao );
        }else{
            this.criarColecao( colecao );
        }
    },

    salvarFlashcards( flashcard ){
        if( flashcard.flashcardId ){
            this.atualizaFlashcard( flashcard );
        }else{
            this.criarFlashcard( flashcard );
        }

    },

    criarFlashcard( flashcard ){
        const novoFlashcard = {
            colecaoId: flashcard.colecaoId,
            flashcardId: dados.seqFlashcardId++,
            frente: flashcard.frente,
            verso: flashcard.verso,
            score: 0
        };
        console.log(`Criando flashcard: ${JSON.stringify( novoFlashcard )}`);

        dados.flashcards.push( novoFlashcard );
    },

    atualizaFlashcard( flashcard ){
        console.log(`Atualizando flashcard: ${JSON.stringify( flashcard )}`);
        const index  = dados.flashcards.findIndex( fc => fc.flashcardId == flashcard.flashcardId);

        if( index < 0) return;
        dados.flashcards[index].frente = flashcard.frente;
        dados.flashcards[index].verso = flashcard.verso;
    
    },

    apagar( entidade ){
        console.log( entidade );
        if( !entidade ) return;
        if( entidade.flashcardId ){
            console.log(entidade);
            this.apagarFlashcard( entidade );
        }else{
            this.apagarColecao( entidade );
        }
    },

    apagarColecao( colecao ){
        console.log ( `Apagando o coleção: ${JSON.stringify( colecao )}` );
        dados.colecoes = dados.colecoes.filter(  col => col.colecaoId != colecao.colecaoId );
    },

    apagarFlashcard( flashcard ){
        console.log ( `Apagando o flashcard: ${JSON.stringify( flashcard )}` );
        dados.flashcards = dados.flashcards.filter(  fc => fc.flashcardId != flashcard.flashcardId );
    }
}