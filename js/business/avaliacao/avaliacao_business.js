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
        }

    }
})(Objetos, AvaliacaoContract);