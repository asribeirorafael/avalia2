/**
 * Created by rafae_000 on 14/10/2014.
 */

var EnderecoBusiness = (function(Objetos, EnderecoContract) {

    return{

        postEndereco: function(object, callback){
            var EnderecoTable = Parse.Object.extend("endereco");
            var enderecoSend = EnderecoContract.setEnderecoBase(new EnderecoTable(), object);

            enderecoSend.save(null, {
                success: function(res) {
                    console.log("Create executado com sucesso.");
                    callback(res)
                },
                error: function(gameScore, error) {
                    console.log("Create falhou. Erro: "+ error.message);
                }
            });
        },

        getEndereco: function(id, callback){
            var query = new Parse.Query("endereco");
            query.equalTo("objectId", id);
            query.first({
                success: function(enderecoRes) {
                    var endereco = EnderecoContract.setEnderecoFront(enderecoRes);
                    callback(endereco);
                },
                error: function(object, error) {
                    console.log("Ocorreu um erro: "+error);
                }
            });
        },

        putEndereco: function(object, callback){
            var EnderecoTable = Parse.Object.extend("endereco");
            var enderecoBack = new EnderecoTable();

            enderecoBack.id = object.id;

            var enderecoSend = EnderecoContract.setEnderecoBase(enderecoBack, object);

            enderecoSend.save(null, {
                success: function(res) {
                    console.log("Update realizado com sucesso");
                    callback(res);
                },
                error: function(res, error) {
                    console.log("Update falhou. Erro: " + error.message);
                }
            });


        },

        deleteEndereco: function(id, callback){
            var EnderecoTable = Parse.Object.extend("endereco");

            var enderecoBack = new EnderecoTable();

            enderecoBack.id = id;
            enderecoBack.destroy({
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
})(Objetos, EnderecoContract);