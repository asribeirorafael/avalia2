/**
 * Created by rafae_000 on 14/10/2014.
 */

function postTurma(object, callback){
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
}

function getTurma(id, callback){
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
}

function getTurmasEscola(id, callback){
    var query = new Parse.Query("turma");
    query.equalTo("idEscola","id");
    query.include("idProf");
    query.include("idEscola");
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
}

function getTurmasRede(callback){
    var query = new Parse.Query("turma");
    query.equalTo("idProjeto","mg00");
    query.include("idProf");
    query.include("idEscola");
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
}

function putTurma(object, callback){
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


}

function deleteTurma(id, callback){
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
}