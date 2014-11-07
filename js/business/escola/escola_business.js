/**
 * Created by rafae_000 on 14/10/2014.
 */

//EVENTOS BASE
/**
 * Created by rafae_000 on 14/10/2014.
 */

var EscolaBusiness = (function(Objetos, EscolaContract, EnderecoContract) {

    return{

        postEscola: function(object, callback){
            var EscolaTable = Parse.Object.extend("escola");

            EscolaBusiness.postEndereco(object.Endereco, function(res){
                object.Endereco = EnderecoContract.setEnderecoFront(res);
                var escolaSend = EscolaContract.setEscolaBase(new EscolaTable(), object);

                escolaSend.save(null, {
                    success: function(res) {
                        console.log("Create executado com sucesso.");
                        callback(res)
                    },
                    error: function(gameScore, error) {
                        console.log("Create falhou. Erro: "+ error.message);
                    }
                });
            });
        },

        getEscola: function (id, callback){
            var query = new Parse.Query("escola");
            query.equalTo("objectId", id);
            query.include("idEndereco");
            query.first({
                success: function(escolaRes) {
                    var escola = EscolaContract.setEscolaFront(escolaRes);
                    callback(escola);
                },
                error: function(object, error) {
                    console.log("Ocorreu um erro: "+error);
                }
            });
        },

        getEscolasRede: function (callback){
            var query = new Parse.Query("escola");
            query.equalTo("idProjeto", "mg00");
            query.include("idEndereco");
            query.find({
                success: function(escolaRes) {
                    var arrayEscolas = new Array();
                    for(var i = 0, lenT = escolaRes.length; i < lenT; i++){
                        var escola = EscolaContract.setEscolaFront(escolaRes[i]);
                        arrayEscolas.push(escola);
                    }
                    callback(arrayEscolas);
                },
                error: function(object, error) {
                    console.log("Ocorreu um erro: "+error);
                }
            });
        },

        putEscola: function (object, callback){
            var EscolaTable = Parse.Object.extend("escola");
            var escolaBack = new EscolaTable();

            escolaBack.id = object.id;

            var escolaSend = EscolaContract.setEscolaBase(escolaBack, object);

            escolaSend.save(null, {
                success: function(res) {
                    console.log("Update realizado com sucesso");
                    callback(res);
                },
                error: function(res, error) {
                    console.log("Update falhou. Erro: " + error.message);
                }
            });
        },

        deleteEscola: function (object, callback){
            var EscolaTable = Parse.Object.extend("escola");
            var EnderecoTable = Parse.Object.extend("endereco");

            var escolaBack = new EscolaTable();
            var enderecoBack = new EnderecoTable();

            escolaBack.id = object.id;
            enderecoBack.id = object.Endereco.id;

            enderecoBack.destroy({
                success: function(res) {
                    console.log("Delete realizado com sucesso");
                    escolaBack.destroy({
                        success: function(res) {
                            console.log("Delete realizado com sucesso");
                            callback(res);
                        },
                        error: function(res, error) {
                            console.log("Delete falhou. Erro: " + error.message);
                        }
                    });
                },
                error: function(res, error) {
                    console.log("Delete falhou. Erro: " + error.message);
                }
            });
        },

        //EVENTOS PÁGINA
        eventoCadastrarEscola: function (escopoGlobal) {
            var cadEscola = Utils.Clonar(escopoGlobal.objetoEscola);
            cadEscola.Endereco.estado = cadEscola.Endereco.estado.Key;
            cadEscola.Endereco.cidade = cadEscola.Endereco.cidade.Key;
            postEscola(cadEscola, function(resposta){
                cadEscola.id = resposta.id;
                escopoGlobal.escolas.push(cadEscola);
                escopoGlobal.alterarPagina("tabelaEscola", '#container-cadastro');
                atualizar(escopoGlobal);
                console.log(resposta);
            })
        },

        eventoSelecionarEscola: function (escolaSelecionada, escopoGlobal) {
            escopoGlobal.objetoEscola = escolaSelecionada;
            escopoGlobal.alterarPagina('cadastroEscola', '#container-cadastro');
        },

        eventoEditarEscola: function (escopoGlobal) {
            var cadEscola = Utils.Clonar(escopoGlobal.objetoEscola);
            cadEscola.Endereco.estado = cadEscola.Endereco.estado.Key;
            cadEscola.Endereco.cidade = cadEscola.Endereco.cidade.Key;
            EscolaBusiness.putEscola(cadEscola, function(resposta){})
        },

        eventoDeletetarEscola: function (idEscola) {
            EscolaBusiness.deleteEscola(idEscola, function(resposta){})
        },

        retornoEscolasRede: function (escopoGlobal){
            EscolaBusiness.getEscolasRede(function(data){
                escopoGlobal.escolas = data;console.log(data)
            });
        },

        retornoEscola: function (escopoGlobal){
            EscolaBusiness.getEscolasRede(function(data){
                escopoGlobal.escola = data;console.log(data)
            });
        }

    }
})(Objetos, EscolaContract, EnderecoContract);

