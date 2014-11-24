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
            //query.ascending("periodo");
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

        postResultadoHipotese: function(object, callback){
            var HipoteseTable = Parse.Object.extend("resultHipotese");
            var hipoteseSend = AvaliacaoContract.setHipoteseBase(new HipoteseTable(), object);

            hipoteseSend.save(null, {
                success: function(res) {
                    console.log("Create executado com sucesso.");
                    callback(res)
                },
                error: function(obj, error) {
                    console.log("Create falhou. Erro: "+ error.message);
                }
            });
        },

        getResultadoHipoteseAluno: function(idAluno,idAvaliacao, callback){
            var query = new Parse.Query("resultHipotese");
            query.include("idAvaliacao");
            query.include("idAluno");
            query.include("idProfessor");
            query.include("idTurma");
            query.include("idEscola");

            query.equalTo("idAluno", {
                __type: "Pointer",
                className: "pessoaAluno",
                objectId: idAluno
            });
            query.equalTo("idAvaliacao", {
                __type: "Pointer",
                className: "avaliacao",
                objectId: idAvaliacao
            });

            query.first({
                success: function(resultHipoteseRes) {
                    var resultHipotese = AvaliacaoContract.setHipoteseFront(resultHipoteseRes);
                    callback(resultHipotese);
                },
                error: function(object, error) {
                    console.log("Ocorreu um erro: "+error);
                }
            });
        },

        getResultadoHipoteseAvaliacao: function(idAvaliacao, callback){
            var query = new Parse.Query("resultHipotese");
            query.include("idAvaliacao");
            query.include("idAluno");
            query.include("idProfessor");
            query.include("idTurma");
            query.include("idEscola");

            query.equalTo("idAvaliacao", {
                __type: "Pointer",
                className: "avaliacao",
                objectId: idAvaliacao
            });

            query.find({
                success: function(resultHipoteseRes) {
                    var arrayHipotese = new Array();
                    for(var i = 0, lenHR = resultHipoteseRes.length; i < lenHR; i++){
                        var resHipotese = AvaliacaoContract.setHipoteseFront(resultHipoteseRes[i]);
                        arrayHipotese.push(resHipotese);
                    }
                    callback(arrayHipotese);
                },
                error: function(object, error) {
                    console.log("Ocorreu um erro: "+error);
                }
            });
        },

        putResultadoHipotese: function(object, callback){
            var HipoteseTable = Parse.Object.extend("resultHipotese");
            var hipoteseBack = new HipoteseTable();

            hipoteseBack.id = object.id;

            var hipoteseSend = AvaliacaoContract.setHipoteseBase(hipoteseBack, object);

            hipoteseSend.save(null, {
                success: function(res) {
                    var resultHipotese = AvaliacaoContract.setHipoteseFront(res);
                    console.log("Update realizado com sucesso");
                    callback(resultHipotese);
                },
                error: function(res, error) {
                    console.log("Update falhou. Erro: " + error.message);
                }
            });


        },

        deleteResultadoHipotese: function(id, callback){
            var HipoteseTable = Parse.Object.extend("resultHipotese");

            var hipoteseBack = new HipoteseTable();

            hipoteseBack.id = id;
            hipoteseBack.destroy({
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

        selecionarAvaliacaoHipotese: function(avaliacao){
            globalScope().avaliacaoSelecionada = avaliacao;
            globalScope().alunoSelecionadoHipotese = globalScope().turmaSelecionada.Alunos[0];
            globalScope().indiceAluno = 0;
        },

        goToFirst: function(){
            if(globalScope().respostaAvaliacaoHipotese.id){
                AvaliacaoBusiness.putResultadoHipotese(globalScope().respostaAvaliacaoHipotese, function(retorno){
                    globalScope().indiceAluno = 0;
                    globalScope().alunoSelecionadoHipotese = globalScope().turmaSelecionada.Alunos[0];

                    AvaliacaoBusiness.getResultadoHipoteseAluno(globalScope().alunoSelecionadoHipotese.id, globalScope().avaliacaoSelecionada.id, function(resultadoAluno){
                        AvaliacaoBusiness.loadResultHipoteseAluno(resultadoAluno);
                        Utils.validarUnico(globalScope().respostaAvaliacaoHipotese.nivelHipotese);
                        globalScope().atualizarEscopo();
                    });
                })
            }else{
                AvaliacaoBusiness.postResultadoHipotese(globalScope().respostaAvaliacaoHipotese, function(retorno){
                    globalScope().indiceAluno = 0;
                    globalScope().alunoSelecionadoHipotese = globalScope().turmaSelecionada.Alunos[0];

                    AvaliacaoBusiness.getResultadoHipoteseAluno(globalScope().alunoSelecionadoHipotese.id, globalScope().avaliacaoSelecionada.id, function(resultadoAluno) {
                        AvaliacaoBusiness.loadResultHipoteseAluno(resultadoAluno);
                        Utils.validarUnico(globalScope().respostaAvaliacaoHipotese.nivelHipotese);
                        globalScope().atualizarEscopo();
                    });
                })
            }
        },

        goToLast: function(){
            if(globalScope().respostaAvaliacaoHipotese.id){
                AvaliacaoBusiness.putResultadoHipotese(globalScope().respostaAvaliacaoHipotese, function(retorno){
                    globalScope().indiceAluno = globalScope().turmaSelecionada.Alunos.length-1;
                    globalScope().alunoSelecionadoHipotese = globalScope().turmaSelecionada.Alunos[globalScope().turmaSelecionada.Alunos.length-1];

                    AvaliacaoBusiness.getResultadoHipoteseAluno(globalScope().alunoSelecionadoHipotese.id, globalScope().avaliacaoSelecionada.id, function(resultadoAluno) {
                        AvaliacaoBusiness.loadResultHipoteseAluno(resultadoAluno);
                        Utils.validarUnico(globalScope().respostaAvaliacaoHipotese.nivelHipotese);
                        globalScope().atualizarEscopo();
                    });
                })
            }else{
                AvaliacaoBusiness.postResultadoHipotese(globalScope().respostaAvaliacaoHipotese, function(retorno){
                    globalScope().indiceAluno = globalScope().turmaSelecionada.Alunos.length-1;
                    globalScope().alunoSelecionadoHipotese = globalScope().turmaSelecionada.Alunos[globalScope().turmaSelecionada.Alunos.length-1];

                    AvaliacaoBusiness.getResultadoHipoteseAluno(globalScope().alunoSelecionadoHipotese.id, globalScope().avaliacaoSelecionada.id, function(resultadoAluno) {
                        AvaliacaoBusiness.loadResultHipoteseAluno(resultadoAluno);
                        Utils.validarUnico(globalScope().respostaAvaliacaoHipotese.nivelHipotese);
                        globalScope().atualizarEscopo();
                    });
                })
            }
        },

        goToNext: function(){
            if(globalScope().respostaAvaliacaoHipotese.id){
                AvaliacaoBusiness.putResultadoHipotese(globalScope().respostaAvaliacaoHipotese, function(retorno){
                    if(globalScope().indiceAluno + 1 < globalScope().turmaSelecionada.Alunos.length)
                        globalScope().indiceAluno = globalScope().indiceAluno + 1;
                    globalScope().alunoSelecionadoHipotese = globalScope().turmaSelecionada.Alunos[globalScope().indiceAluno];

                    AvaliacaoBusiness.getResultadoHipoteseAluno(globalScope().alunoSelecionadoHipotese.id, globalScope().avaliacaoSelecionada.id, function(resultadoAluno) {
                        AvaliacaoBusiness.loadResultHipoteseAluno(resultadoAluno);
                        Utils.validarUnico(globalScope().respostaAvaliacaoHipotese.nivelHipotese);
                        globalScope().atualizarEscopo();
                    });
                })
            }else{
                AvaliacaoBusiness.postResultadoHipotese(globalScope().respostaAvaliacaoHipotese, function(retorno){
                    if(globalScope().indiceAluno + 1 < globalScope().turmaSelecionada.Alunos.length)
                        globalScope().indiceAluno = globalScope().indiceAluno + 1;
                    globalScope().alunoSelecionadoHipotese = globalScope().turmaSelecionada.Alunos[globalScope().indiceAluno];

                    AvaliacaoBusiness.getResultadoHipoteseAluno(globalScope().alunoSelecionadoHipotese.id, globalScope().avaliacaoSelecionada.id, function(resultadoAluno) {
                        AvaliacaoBusiness.loadResultHipoteseAluno(resultadoAluno);
                        Utils.validarUnico(globalScope().respostaAvaliacaoHipotese.nivelHipotese);
                        globalScope().atualizarEscopo();
                    });
                })
            }
        },

        goToPrior: function(){
            if(globalScope().respostaAvaliacaoHipotese.id){
                AvaliacaoBusiness.putResultadoHipotese(globalScope().respostaAvaliacaoHipotese, function(retorno){
                    if(globalScope().indiceAluno > 0)
                        globalScope().indiceAluno = globalScope().indiceAluno - 1;
                    globalScope().alunoSelecionadoHipotese = globalScope().turmaSelecionada.Alunos[globalScope().indiceAluno];

                    AvaliacaoBusiness.getResultadoHipoteseAluno(globalScope().alunoSelecionadoHipotese.id, globalScope().avaliacaoSelecionada.id, function(resultadoAluno) {
                        AvaliacaoBusiness.loadResultHipoteseAluno(resultadoAluno);
                        Utils.validarUnico(globalScope().respostaAvaliacaoHipotese.nivelHipotese);
                        globalScope().atualizarEscopo();
                    });

                })
            }else{
                AvaliacaoBusiness.postResultadoHipotese(globalScope().respostaAvaliacaoHipotese, function(retorno){
                    if(globalScope().indiceAluno > 0)
                        globalScope().indiceAluno = globalScope().indiceAluno - 1;
                    globalScope().alunoSelecionadoHipotese = globalScope().turmaSelecionada.Alunos[globalScope().indiceAluno];

                    AvaliacaoBusiness.getResultadoHipoteseAluno(globalScope().alunoSelecionadoHipotese.id, globalScope().avaliacaoSelecionada.id, function(resultadoAluno) {
                        AvaliacaoBusiness.loadResultHipoteseAluno(resultadoAluno);
                        Utils.validarUnico(globalScope().respostaAvaliacaoHipotese.nivelHipotese);
                        globalScope().atualizarEscopo();
                    });
                })
            }
        },

        loadResultHipoteseAluno: function(resultadoAluno){
            if(!resultadoAluno.id){
                globalScope().respostaAvaliacaoHipotese.id = "";
                globalScope().respostaAvaliacaoHipotese.idProjeto = globalScope().turmaSelecionada.idProjeto;
                globalScope().respostaAvaliacaoHipotese.ano = new Date().getFullYear();
                globalScope().respostaAvaliacaoHipotese.Avaliacao = globalScope().avaliacaoSelecionada;
                globalScope().respostaAvaliacaoHipotese.Aluno = globalScope().alunoSelecionadoHipotese;
                globalScope().respostaAvaliacaoHipotese.Professor = new Objetos.Professor();
                globalScope().respostaAvaliacaoHipotese.Professor.id = globalScope().usuarioLogado.Pessoa.id;
                globalScope().respostaAvaliacaoHipotese.Turma = globalScope().turmaSelecionada;
                globalScope().respostaAvaliacaoHipotese.Escola = globalScope().turmaSelecionada.Escola;
                globalScope().respostaAvaliacaoHipotese.nivelHipotese = "";
                globalScope().atualizarEscopo();
            } else{
                globalScope().respostaAvaliacaoHipotese.id = resultadoAluno.id;
                globalScope().respostaAvaliacaoHipotese.idProjeto = resultadoAluno.idProjeto;
                globalScope().respostaAvaliacaoHipotese.ano = resultadoAluno.ano;
                globalScope().respostaAvaliacaoHipotese.Avaliacao = resultadoAluno.Avaliacao;
                globalScope().respostaAvaliacaoHipotese.Aluno = resultadoAluno.Aluno;
                globalScope().respostaAvaliacaoHipotese.Professor = resultadoAluno.Professor;
                globalScope().respostaAvaliacaoHipotese.Turma = resultadoAluno.Turma;
                globalScope().respostaAvaliacaoHipotese.Escola = resultadoAluno.Escola;
                globalScope().respostaAvaliacaoHipotese.nivelHipotese = resultadoAluno.nivelHipotese;
                globalScope().atualizarEscopo();
            }
        },

        gerarAnaliseAvaliacao: function(idAvaliacao, callback){
            AvaliacaoBusiness.getResultadoHipoteseAvaliacao(idAvaliacao, function(listaResultados){
                if(listaResultados.length){
                    var arrayGrafico = new Array(),
                        arrayAlunosDado = new Array(),
                        ObjetoA = new Objetos.AnaliseHipotese(),
                        ObjetoSA = new Objetos.AnaliseHipotese(),
                        ObjetoSC = new Objetos.AnaliseHipotese(),
                        ObjetoSS = new Objetos.AnaliseHipotese(),
                        ObjetoS = new Objetos.AnaliseHipotese();


                    for(var i = 0, LenLR = listaResultados.length;i < LenLR; i++ ){
                        var nivelEscrito = "";

                        switch(listaResultados[i].nivelHipotese){
                            case "1":
                                ObjetoA.total++;
                                nivelEscrito = "Alfabético";
                                break;
                            case "2":
                                ObjetoSA.total++;
                                nivelEscrito = "Silábico-Alfabético";
                                break;
                            case "3":
                                ObjetoSC.total++;
                                nivelEscrito = "Silábico com Valor";
                                break;
                            case "4":
                                ObjetoSS.total++;
                                nivelEscrito = "Silábico sem Valor";
                                break;
                            case "5":
                                ObjetoS.total++;
                                nivelEscrito = "Pré-Silábico";
                                break;
                        }
                        arrayAlunosDado.push({"Nome": listaResultados[i].Aluno.nome, "Nivel": nivelEscrito});

                    }

                    ObjetoA.nivel = "Alfabético";
                    ObjetoA.porcentagem = ((ObjetoA.total/LenLR)*100).toFixed(2);
                    ObjetoSA.nivel = "Silábico-Alfabético";
                    ObjetoSA.porcentagem = ((ObjetoSA.total/LenLR)*100).toFixed(2);
                    ObjetoSC.nivel = "Silábico com Valor";
                    ObjetoSC.porcentagem = ((ObjetoSC.total/LenLR)*100).toFixed(2);
                    ObjetoSS.nivel = "Silábico sem Valor";
                    ObjetoSS.porcentagem = ((ObjetoSS.total/LenLR)*100).toFixed(2);
                    ObjetoS.nivel = "Pré-Silábico";
                    ObjetoS.porcentagem = ((ObjetoS.total/LenLR)*100).toFixed(2);

                    arrayGrafico.push(ObjetoA);
                    arrayGrafico.push(ObjetoSA);
                    arrayGrafico.push(ObjetoSC);
                    arrayGrafico.push(ObjetoSS);
                    arrayGrafico.push(ObjetoS);

                    for(var i = 0, LenAG = arrayGrafico.length; i < LenAG; i++){
                        var objAnalise = [
                            {v: arrayGrafico[i].nivel},
                            {v: arrayGrafico[i].total}
                        ];

                        globalScope().dadosAnaliseAvaliacao.push(objAnalise);
                    }

                    arrayAlunosDado.sort(Utils.Ordenacao.byname);
                    globalScope().DataGrid = arrayAlunosDado;

                    globalScope().atualizarEscopo();

                    callback();
                }else{
                    globalScope().dadosAnaliseAvaliacao = new Array();

                    globalScope().atualizarEscopo();

                    callback();
                }

            });
        }

    }
})(Objetos, AvaliacaoContract);