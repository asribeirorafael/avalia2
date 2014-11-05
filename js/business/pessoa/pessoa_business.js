/**
 * Created by rafae_000 on 14/10/2014.
 */

function postAluno(object, callback){
    var AlunoTable = Parse.Object.extend("pessoaAluno");
    var alunoSend = PessoaContract.setAlunoBase(new AlunoTable(), object);

    alunoSend.save(null, {
        success: function(res) {
            console.log("Create executado com sucesso.");
            callback(res)
        },
        error: function(res, error) {
            console.log("Create falhou. Erro: "+ error.message);
        }
    });
}

function getAluno(id, callback){
    var query = new Parse.Query("pessoaAluno");
    query.equalTo("objectId", id);
    query.first({
        success: function(alunoRes) {
            var aluno = PessoaContract.setAlunoFront(alunoRes);
            callback(aluno);
        },
        error: function(res, error) {
            console.log("Ocorreu um erro: "+error);
        }
    });
}

function getAlunosRede(callback){
    var query = new Parse.Query("pessoaAluno");
    query.equalTo("idProjeto", "mg00");
    query.find({
        success: function(alunoRes) {
            var arrayAlunos = new Array();
            for(var i = 0, lenT = alunoRes.length; i < lenT; i++){
                var aluno = PessoaContract.setAlunoFront(alunoRes[i]);
                arrayAlunos.push(aluno);
            }
            callback(arrayAlunos);
        },
        error: function(res, error) {
            console.log("Ocorreu um erro: "+error);
        }
    });
}

function putAluno(object, callback){
    var AlunoTable = Parse.Object.extend("pessoaAluno");
    var alunoBack = new AlunoTable();

    alunoBack.id = object.id;

    var alunoSend = PessoaContract.setAlunoBase(alunoBack, object);

    alunoSend.save(null, {
        success: function(res) {
            console.log("Update realizado com sucesso");
            callback(res);
        },
        error: function(res, error) {
            console.log("Update falhou. Erro: " + error.message);
        }
    });
}

function deleteAluno(id, callback){
    var AlunoTable = Parse.Object.extend("pessoaAluno");
    var alunoBack = new AlunoTable();

    alunoBack.id = id;
    alunoBack.destroy({
        success: function(res) {
            console.log("Delete realizado com sucesso");
            callback(res);
        },
        error: function(res, error) {
            console.log("Delete falhou. Erro: " + error.message);
        }
    });
}


function postProfessor(object, callback){
    var ProfessorTable = Parse.Object.extend("pessoaProf");
    var professorSend = PessoaContract.setProfessorBase(new ProfessorTable(), object);

    professorSend.save(null, {
        success: function(res) {
            console.log("Create executado com sucesso.");
            callback(res)
        },
        error: function(res, error) {
            console.log("Create falhou. Erro: "+ error.message);
        }
    });
}

function getProfessor(id, callback){
    var query = new Parse.Query("pessoaProf");
    query.equalTo("objectId", id);
    query.first({
        success: function(professorRes) {
            var professor = PessoaContract.setProfessorFront(professorRes);
            callback(professor);
        },
        error: function(res, error) {
            console.log("Ocorreu um erro: "+error);
        }
    });
}

function getProfessoresRede(callback){
    var query = new Parse.Query("pessoaProf");
    query.equalTo("idProjeto", "mg00");
    query.find({
        success: function(professorRes) {
            var arrayProfessores = new Array();
            for(var i = 0, lenT = professorRes.length; i < lenT; i++){
                var professor = PessoaContract.setProfessorFront(professorRes[i]);
                arrayProfessores.push(professor);
            }
            callback(arrayProfessores);
        },
        error: function(res, error) {
            console.log("Ocorreu um erro: "+error);
        }
    });
}

function putProfessor(object, callback){
    var ProfessorTable = Parse.Object.extend("pessoaProf");
    var professorBack = new ProfessorTable();

    professorBack.id = object.id;

    var professorSend = PessoaContract.setProfessorBase(professorBack, object);

    professorSend.save(null, {
        success: function(res) {
            console.log("Update realizado com sucesso");
            callback(res);
        },
        error: function(res, error) {
            console.log("Update falhou. Erro: " + error.message);
        }
    });
}

function deleteProfessor(id, callback){
    var ProfessorTable = Parse.Object.extend("pessoaProf");
    var professorBack = new ProfessorTable();

    professorBack.id = id;
    professorBack.destroy({
        success: function(res) {
            console.log("Delete realizado com sucesso");
            callback(res);
        },
        error: function(res, error) {
            console.log("Delete falhou. Erro: " + error.message);
        }
    });
}