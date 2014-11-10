/**
 * Created by rafae_000 on 14/10/2014.
 */

var TurmaBusiness = (function(Objetos, TurmaContract) {

    return{
        postTurma: function (object, callback){
            var TurmaTable = Parse.Object.extend("turma");
            var turmaSend = TurmaContract.setTurmaBase(new TurmaTable(), object);

            turmaSend.save(null, {
                success: function(res) {
                    console.log("Create executado com sucesso.");
                    callback(res)
                },
                error: function(res, error) {
                    console.log("Create falhou. Erro: "+ error.message);
                }
            });
        },

        getTurma: function (id, callback){
            var query = new Parse.Query("turma");
            query.equalTo("objectId", id);
            query.include("idProf");
            query.include("idEscola");
            query.first({
                success: function(turmaRes) {
                    var turma = TurmaContract.setTurmaFront(turmaRes);
                    callback(turma);
                },
                error: function(res, error) {
                    console.log("Ocorreu um erro: "+error);
                }
            });
        },

        getTurmasProfessor: function (id, callback){
            var query = new Parse.Query("turma");
            query.equalTo("idProf", {
                __type: "Pointer",
                className: "pessoaProf",
                objectId: id
            });
            query.include("idProf");
            query.include("idEscola");
            query.ascending("serie");
            query.find({
                success: function(turmaRes) {
                    var arrayTurmas = new Array();
                    for(var i = 0, lenT = turmaRes.length; i < lenT; i++){
                        var turma = TurmaContract.setTurmaFront(turmaRes[i]);
                        arrayTurmas.push(turma);
                    }
                    callback(arrayTurmas);
                },
                error: function(res, error) {
                    console.log("Ocorreu um erro: "+error);
                }
            });
        },

        getTurmasEscola: function (id, callback){
            var query = new Parse.Query("turma");
            query.equalTo("idEscola", {
                __type: "Pointer",
                className: "escola",
                objectId: id
            });
            query.include("idProf");
            query.include("idEscola");
            query.ascending("serie");
            query.find({
                success: function(turmaRes) {
                    var arrayTurmas = new Array();
                    for(var i = 0, lenT = turmaRes.length; i < lenT; i++){
                        var turma = TurmaContract.setTurmaFront(turmaRes[i]);
                        arrayTurmas.push(turma);
                    }
                    callback(arrayTurmas);
                },
                error: function(res, error) {
                    console.log("Ocorreu um erro: "+error);
                }
            });
        },

        getTurmasRede: function (callback){
            var query = new Parse.Query("turma");
            query.equalTo("idProjeto","mg00");
            query.include("idProf");
            query.include("idEscola");
            query.ascending("serie");
            query.find({
                success: function(turmaRes) {
                    var arrayTurmas = new Array();
                    for(var i = 0, lenT = turmaRes.length; i < lenT; i++){
                        var turma = TurmaContract.setTurmaFront(turmaRes[i]);
                        arrayTurmas.push(turma);
                    }
                    callback(arrayTurmas);
                },
                error: function(res, error) {
                    console.log("Ocorreu um erro: "+error);
                }
            });
        },

        putTurma: function (object, callback){
            var TurmaTable = Parse.Object.extend("turma");
            var turmaBack = new TurmaTable();

            turmaBack.id = object.id;

            var turmaSend = TurmaContract.setTurmaBase(turmaBack, object);

            turmaSend.save(null, {
                success: function(res) {
                    console.log("Update realizado com sucesso");
                    callback(res);
                },
                error: function(res, error) {
                    console.log("Update falhou. Erro: " + error.message);
                }
            });


        },

        deleteTurma: function (id, callback){
            var TurmaTable = Parse.Object.extend("turma");
            var turmaBack = new TurmaTable();

            turmaBack.id = id;
            turmaBack.destroy({
                success: function(res) {
                    console.log("Delete realizado com sucesso");
                    callback(res);
                },
                error: function(res, error) {
                    console.log("Delete falhou. Erro: " + error.message);
                }
            });
        },

        cadastrarTurma: function (escopoGlobal) {
            var cadTurma = Utils.Clonar(escopoGlobal.objetoTurma);
            cadTurma.curso = cadTurma.curso.Value;
            cadTurma.serie = cadTurma.serie.Value;
            cadTurma.turno = cadTurma.turno.Value;
            TurmaBusiness.postTurma(cadTurma, function(resposta){
                cadTurma.id = resposta.id;
                escopoGlobal.turmas.push(cadTurma);
                escopoGlobal.alterarPagina("tabelaTurma", '#container-cadastro');
                atualizar(escopoGlobal);
                console.log(resposta);
            })
        },

        getTurmasProfessorPage: function(escopoGlobal){
            var usuario = JSON.parse(localStorage.getItem("User"));

            TurmaBusiness.getTurmasProfessor(usuario.Pessoa.id, function(data){
                escopoGlobal.turmas = data;
                escopoGlobal.atualizarEscopo();
                console.log(data)
            });
        },

        getTurmasRedePage: function(escopoGlobal){
            TurmaBusiness.getTurmasRede(function(data){
                escopoGlobal.escolas = data;
                escopoGlobal.atualizarEscopo();
                console.log(data)
            });
        },

        selecionarTurma: function (escopoGlobal) {
            escopoGlobal.alterarPagina('cadastroTurma', '#container-cadastro');
            escopoGlobal.atualizarEscopo();
        },

        editarTurma: function (escopoGlobal) {
            var cadTurma = Utils.Clonar(escopoGlobal.objetoTurma);
            cadTurma.curso = cadTurma.curso.Value;
            cadTurma.serie = cadTurma.serie.Value;
            cadTurma.turno = cadTurma.turno.Value;
            TurmaBusiness.putTurma(cadTurma, function(resposta){})
        },

        deletarTurma: function (idTurma) {
            TurmaBusiness.deleteTurma(idTurma, function(resposta){})
        }
    }
})(Objetos, TurmaContract);

