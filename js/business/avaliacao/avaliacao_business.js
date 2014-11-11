/**
 * Created by rafae_000 on 14/10/2014.
 */

var AvaliacaoBusiness = (function(Objetos, AvaliacaoContract) {

    return{

        postAvaliacao: function(object, callback){
            var AvaliacaoTable = Parse.Object.extend("avaliacao");
            var avaliacaoSend = AvaliacaoContract.setAvaliacaoBase(new AvaliacaoTable(), object);

            avaliacaoSend.save(null, {
                success: function(res) {
                    console.log("Create executado com sucesso.");
                    callback(res)
                },
                error: function(obj, error) {
                    console.log("Create falhou. Erro: "+ error.message);
                }
            });
        },

        getAvaliacao: function(id, callback){
            var query = new Parse.Query("avaliacao");
            query.equalTo("objectId", id);
            query.first({
                success: function(avaliacaoRes) {
                    var avaliacao = AvaliacaoContract.setAvaliacaoFront(avaliacaoRes);
                    callback(avaliacao);
                },
                error: function(object, error) {
                    console.log("Ocorreu um erro: "+error);
                }
            });
        },

        getAvaliacaoTipoSerie: function(idTipo, idSerie, callback){
            var query = new Parse.Query("avaliacao");
            query.equalTo("tipoAvaliacao", idTipo);
            query.equalTo("tipoSerie", idSerie);
            query.ascending("periodo");
            query.find({
                success: function(avaliacaoRes) {
                    var arrayAvaliacao = new Array();
                    for(var i = 0, lenT = avaliacaoRes.length; i < lenT; i++){
                        var avaliacao = AvaliacaoContract.setAvaliacaoFront(avaliacaoRes[i]);
                        arrayAvaliacao.push(avaliacao);
                    }
                    callback(arrayAvaliacao);
                },
                error: function(object, error) {
                    console.log("Ocorreu um erro: "+error);
                }
            });
        },

        putAvaliacao: function(object, callback){
            var AvaliacaoTable = Parse.Object.extend("avaliacao");
            var avaliacaoBack = new AvaliacaoTable();

            avaliacaoBack.id = object.id;

            var avaliacaoSend = AvaliacaoContract.setAvaliacaoBase(avaliacaoBack, object);

            avaliacaoSend.save(null, {
                success: function(res) {
                    console.log("Update realizado com sucesso");
                    callback(res);
                },
                error: function(res, error) {
                    console.log("Update falhou. Erro: " + error.message);
                }
            });


        },

        deleteAvaliacao: function(id, callback){
            var AvaliacaoTable = Parse.Object.extend("avaliacao");

            var avaliacaoBack = new AvaliacaoTable();

            avaliacaoBack.id = id;
            avaliacaoBack.destroy({
                success: function(res) {
                    console.log("Delete realizado com sucesso");
                    callback(res);
                },
                error: function(res, error) {
                    console.log("Delete falhou. Erro: " + error.message);
                }
            });
        },

        //EVENTOS PAGINA

        retornoAvaliacaoTipoSerie: function(idTipo, turma, callback){
            AvaliacaoBusiness.getAvaliacaoTipoSerie(idTipo, turma.serie, function(data){
                globalScope().avaliacoes = data;
                globalScope().atualizarEscopo();
                callback(true);
            });
        },

        selecionarAvaliacao: function(avaliacao){
            globalScope().avaliacaoSelecionada = avaliacao;
            globalScope().alterarPagina('avaliacaoHipotese', '#Content');
            globalScope().atualizarEscopo();
        }

    }
})(Objetos, AvaliacaoContract);