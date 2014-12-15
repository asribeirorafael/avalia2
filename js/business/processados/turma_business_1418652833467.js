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
                    var arrayTurmas = [];
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
                    var arrayTurmas = [];
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
                    var arrayTurmas = [];
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

        //EVENTOS PAGINA

        cadastrarTurma: function () {
            var cadTurma = Utils.Clonar(globalScope().objetoTurma);
            cadTurma.curso = cadTurma.curso.Value;
            cadTurma.serie = cadTurma.serie.Value;
            cadTurma.turno = cadTurma.turno.Value;
            TurmaBusiness.postTurma(cadTurma, function(resposta){
                cadTurma.id = resposta.id;
                globalScope().turmas.push(cadTurma);
                globalScope().alterarPagina("tabelaTurma", '#container-cadastro');
                atualizar(globalScope());
            })
        },

        getTurmasProfessorPage: function(callback){
            var usuario = JSON.parse(localStorage.getItem("User"));

            if(!globalScope().turmaSelecionada){
                TurmaBusiness.getTurmasProfessor(usuario.Pessoa.id, function(data){
                    globalScope().turmas = data;
                    globalScope().turmaSelecionada = data[0];

                    var listaAlunos = [];
                    var i = 1;
                    globalScope().turmaSelecionada.Alunos.forEach(function(idAluno){
                        PessoaBusiness.getAluno(idAluno, function(alunoRes){
                            listaAlunos.push(alunoRes);
                            if(globalScope().turmaSelecionada.Alunos.length == i){
                                listaAlunos.sort(Utils.Ordenacao.byname);

                                globalScope().turmaSelecionada.Alunos = listaAlunos;

                                globalScope().atualizarEscopo();

                                callback(true);
                            }else{
                                i++;
                            }
                        });
                    });
                });
            }else{
                if(globalScope().turmaSelecionada.Alunos.length){
                    if(!globalScope().turmaSelecionada.Alunos[0].id){
                        var listaAlunos = [];
                        var i = 1;
                        globalScope().turmaSelecionada.Alunos.forEach(function(idAluno){
                            PessoaBusiness.getAluno(idAluno, function(alunoRes){
                                listaAlunos.push(alunoRes);
                                if(globalScope().turmaSelecionada.Alunos.length == i){
                                    listaAlunos.sort(Utils.Ordenacao.byname);

                                    globalScope().turmaSelecionada.Alunos = listaAlunos;

                                    globalScope().atualizarEscopo();

                                    callback(true);
                                }else{
                                    i++;
                                }
                            });
                        });
                    }else{
                        callback(true);
                    }
                }else{
                    callback(false)
                }
            }
        },

        getTurmasRedePage: function(){
            TurmaBusiness.getTurmasRede(function(data){
                globalScope().escolas = data;
                globalScope().atualizarEscopo();
            });
        },

        selecionarTurma: function () {
            globalScope().alterarPagina('cadastroTurma', '#container-cadastro');
            globalScope().atualizarEscopo();
        },

        selecionarTurmaCarometro: function (turma) {
            globalScope().turmaSelecionada = turma;
        },

        selecionarTurmaAvaliacaoHipotese: function(turma){
            globalScope().turmaSelecionada = turma;
        },

        editarTurma: function () {
            var cadTurma = Utils.Clonar(globalScope().objetoTurma);
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

