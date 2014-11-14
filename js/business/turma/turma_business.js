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
                console.log(resposta);
            })
        },

        getTurmasProfessorPage: function(){
            var usuario = JSON.parse(localStorage.getItem("User"));

            TurmaBusiness.getTurmasProfessor(usuario.Pessoa.id, function(data){
                globalScope().turmas = data;
                globalScope().atualizarEscopo();
                console.log(data)
            });
        },

        getTurmasRedePage: function(){
            TurmaBusiness.getTurmasRede(function(data){
                globalScope().escolas = data;
                globalScope().atualizarEscopo();
                console.log(data)
            });
        },

        selecionarTurma: function () {
            globalScope().alterarPagina('cadastroTurma', '#container-cadastro');
            globalScope().atualizarEscopo();
        },

        selecionarTurmaCarometro: function (turma) {
            globalScope().turmaSelecionada = turma;

            if(turma.Alunos.length) {
                if (!turma.Alunos[0].id) {
                    var listaAlunos = new Array();
                    turma.Alunos.forEach(function(idAluno, indice){
                        PessoaBusiness.getAluno(idAluno, function(alunoRes){
                            listaAlunos.push(alunoRes);
                            if(turma.Alunos.length == indice+1){
                                globalScope().turmaSelecionada.Alunos = listaAlunos;

                                globalScope().alterarPagina('carometro', '#Content');
                                globalScope().atualizarEscopo();
                            }
                        });
                    });
                }
                globalScope().alterarPagina('carometro', '#Content');
                globalScope().atualizarEscopo();
            }else{
                globalScope().alterarPagina('carometro', '#Content');
                globalScope().atualizarEscopo();
            }


        },

        selecionarTurmaAvaliacaoHipotese: function(turma){
            globalScope().turmaSelecionada = turma;

            if(turma.Alunos.length){
                if(!turma.Alunos[0].id){
                    var listaAlunos = new Array();
                    turma.Alunos.forEach(function(idAluno, indice){
                        PessoaBusiness.getAluno(idAluno, function(alunoRes){
                            listaAlunos.push(alunoRes);
                            if(turma.Alunos.length == indice+1){
                                globalScope().turmaSelecionada.Alunos = listaAlunos;

                                AvaliacaoBusiness.retornoAvaliacaoTipoSerie("1", turma, function () {
                                    globalScope().alterarPagina('listaAvaliacoesHipotese', '#Content');
                                    globalScope().atualizarEscopo();
                                });
                            }
                        });
                    });
                }else{
                    AvaliacaoBusiness.retornoAvaliacaoTipoSerie("1", turma, function () {
                        globalScope().alterarPagina('listaAvaliacoesHipotese', '#Content');
                        globalScope().atualizarEscopo();
                    });
                }
            }else{
                AvaliacaoBusiness.retornoAvaliacaoTipoSerie("1", turma, function () {
                    globalScope().alterarPagina('listaAvaliacoesHipotese', '#Content');
                    globalScope().atualizarEscopo();
                });
            }
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

