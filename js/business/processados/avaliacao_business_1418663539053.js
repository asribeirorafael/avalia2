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

        getAvaliacaoTipoSerie: function(idSerie, callback){
            var query = new Parse.Query("avaliacao");
            query.equalTo("tipoSerie", Utils.Conversao.ValueKey(idSerie, Colecoes.Curso[Utils.Conversao.ValueKey(globalScope().turmaSelecionada.curso, Colecoes.Curso)].Serie));
            //query.ascending("periodo");
            query.find({
                success: function(avaliacaoRes) {
                    var arrayAvaliacao = [];
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
                    toastr.success("Informação salva com sucesso.");
                    callback(res)
                },
                error: function(obj, error) {
                    toastr.error("Create falhou. Erro: "+ error.message);
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
                    var arrayHipotese = [];
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

        getResultadoHipoteseAvaliacaoTurma: function(idTurma, callback){
            var query = new Parse.Query("resultHipotese");
            query.include("idAvaliacao");
            query.include("idAluno");
            query.include("idProfessor");
            query.include("idTurma");
            query.include("idEscola");

            query.equalTo("idTurma", {
                __type: "Pointer",
                className: "turma",
                objectId: idTurma
            });

            query.find({
                success: function(resultHipoteseRes) {
                    var arrayHipotese = [];
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

        getResultadoHipoteseAvaliacaoAluno: function(idAluno, callback){
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

            query.ascending("periodo");
            query.find({
                success: function(resultHipoteseRes) {
                    var arrayHipotese = [];
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
                    //toastr.success("Informação atualizada com sucesso.");
                    callback(resultHipotese);
                },
                error: function(res, error) {
                    toastr.error("Atualização falhou. Erro: " + error.message);
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

        retornoAvaliacaoTipoSerie: function(turma, callback){
            AvaliacaoBusiness.getAvaliacaoTipoSerie(turma.serie, function(data){
                globalScope().totalAvaliacoes = data;
                globalScope().avaliacoes = data;
                globalScope().tipoAvaliacao = "Todas";
                globalScope().atualizarEscopo();
                callback(true);
            });
        },

        selecionarAvaliacaoHipotese: function(avaliacao, tipo){
            globalScope().avaliacaoSelecionada = avaliacao;
            globalScope().alunoSelecionadoHipotese = globalScope().turmaSelecionada.Alunos[0];
            globalScope().indiceAluno = 0;
            if(tipo == 1){
                Utils.enabledQuestions();
            }else{
                Utils.disabledQuestions();
            }
        },

        goToFirst: function(){
            if(globalScope().respostaAvaliacaoHipotese.id){
                AvaliacaoBusiness.putResultadoHipotese(globalScope().respostaAvaliacaoHipotese, function(retorno){
                    globalScope().indiceAluno = 0;
                    globalScope().alunoSelecionadoHipotese = globalScope().turmaSelecionada.Alunos[0];

                    AvaliacaoBusiness.getResultadoHipoteseAvaliacao(globalScope().avaliacaoSelecionada.id, function(listaResultados) {
                        var cont = 0;
                        if(listaResultados.length != 0){
                            for(var i= 0, lenLR = listaResultados.length; i < lenLR; i++){
                                if(listaResultados[i].nivelHipotese != ""){
                                    cont++;
                                }
                            }
                            var porcentagem = (cont/globalScope().turmaSelecionada.Alunos.length) * 100;
                            jQuery('#avaliaProgress').css('width', porcentagem+'%');
                        }else{
                            jQuery('#avaliaProgress').css('width', '0%');
                        }
                    });

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

                    AvaliacaoBusiness.getResultadoHipoteseAvaliacao(globalScope().avaliacaoSelecionada.id, function(listaResultados) {
                        var cont = 0;
                        if(listaResultados.length != 0){
                            for(var i= 0, lenLR = listaResultados.length; i < lenLR; i++){
                                if(listaResultados[i].nivelHipotese != ""){
                                    cont++;
                                }
                            }
                            var porcentagem = (cont/globalScope().turmaSelecionada.Alunos.length) * 100;
                            jQuery('#avaliaProgress').css('width', porcentagem+'%');
                        }else{
                            jQuery('#avaliaProgress').css('width', '0%');
                        }
                    });

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

                    AvaliacaoBusiness.getResultadoHipoteseAvaliacao(globalScope().avaliacaoSelecionada.id, function(listaResultados) {
                        var cont = 0;
                        if(listaResultados.length != 0){
                            for(var i= 0, lenLR = listaResultados.length; i < lenLR; i++){
                                if(listaResultados[i].nivelHipotese != ""){
                                    cont++;
                                }
                            }
                            var porcentagem = (cont/globalScope().turmaSelecionada.Alunos.length) * 100;
                            jQuery('#avaliaProgress').css('width', porcentagem+'%');
                        }else{
                            jQuery('#avaliaProgress').css('width', '0%');
                        }
                    });

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

                    AvaliacaoBusiness.getResultadoHipoteseAvaliacao(globalScope().avaliacaoSelecionada.id, function(listaResultados) {
                        var cont = 0;
                        if(listaResultados.length != 0){
                            for(var i= 0, lenLR = listaResultados.length; i < lenLR; i++){
                                if(listaResultados[i].nivelHipotese != ""){
                                    cont++;
                                }
                            }
                            var porcentagem = (cont/globalScope().turmaSelecionada.Alunos.length) * 100;
                            jQuery('#avaliaProgress').css('width', porcentagem+'%');
                        }else{
                            jQuery('#avaliaProgress').css('width', '0%');
                        }
                    });

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

                    AvaliacaoBusiness.getResultadoHipoteseAvaliacao(globalScope().avaliacaoSelecionada.id, function(listaResultados) {
                        var cont = 0;
                        if(listaResultados.length != 0){
                            for(var i= 0, lenLR = listaResultados.length; i < lenLR; i++){
                                if(listaResultados[i].nivelHipotese != ""){
                                    cont++;
                                }
                            }
                            var porcentagem = (cont/globalScope().turmaSelecionada.Alunos.length) * 100;
                            jQuery('#avaliaProgress').css('width', porcentagem+'%');
                        }else{
                            jQuery('#avaliaProgress').css('width', '0%');
                        }
                    });

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

                    AvaliacaoBusiness.getResultadoHipoteseAvaliacao(globalScope().avaliacaoSelecionada.id, function(listaResultados) {
                        var cont = 0;
                        if(listaResultados.length != 0){
                            for(var i= 0, lenLR = listaResultados.length; i < lenLR; i++){
                                if(listaResultados[i].nivelHipotese != ""){
                                    cont++;
                                }
                            }
                            var porcentagem = (cont/globalScope().turmaSelecionada.Alunos.length) * 100;
                            jQuery('#avaliaProgress').css('width', porcentagem+'%');
                        }else{
                            jQuery('#avaliaProgress').css('width', '0%');
                        }
                    });

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

                    AvaliacaoBusiness.getResultadoHipoteseAvaliacao(globalScope().avaliacaoSelecionada.id, function(listaResultados) {
                        var cont = 0;
                        if(listaResultados.length != 0){
                            for(var i= 0, lenLR = listaResultados.length; i < lenLR; i++){
                                if(listaResultados[i].nivelHipotese != ""){
                                    cont++;
                                }
                            }
                            var porcentagem = (cont/globalScope().turmaSelecionada.Alunos.length) * 100;
                            jQuery('#avaliaProgress').css('width', porcentagem+'%');
                        }else{
                            jQuery('#avaliaProgress').css('width', '0%');
                        }
                    });

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

                    AvaliacaoBusiness.getResultadoHipoteseAvaliacao(globalScope().avaliacaoSelecionada.id, function(listaResultados) {
                        var cont = 0;
                        if(listaResultados.length != 0){
                            for(var i= 0, lenLR = listaResultados.length; i < lenLR; i++){
                                if(listaResultados[i].nivelHipotese != ""){
                                    cont++;
                                }
                            }
                            var porcentagem = (cont/globalScope().turmaSelecionada.Alunos.length) * 100;
                            jQuery('#avaliaProgress').css('width', porcentagem+'%');
                        }else{
                            jQuery('#avaliaProgress').css('width', '0%');
                        }
                    });

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
                    var arrayGrafico = [],
                        arrayAlunosDado = [],
                        ObjetoA = new Objetos.AnaliseHipotese(),
                        ObjetoSA = new Objetos.AnaliseHipotese(),
                        ObjetoSC = new Objetos.AnaliseHipotese(),
                        ObjetoSS = new Objetos.AnaliseHipotese(),
                        ObjetoS = new Objetos.AnaliseHipotese();


                    for(var i = 0, LenLR = listaResultados.length;i < LenLR; i++ ){
                        var nivelEscrito = "";

                        switch(listaResultados[i].nivelHipotese){
                            case "5":
                                ObjetoA.total++;
                                nivelEscrito = "Alfabético";
                                break;
                            case "4":
                                ObjetoSA.total++;
                                nivelEscrito = "Silábico-Alfabético";
                                break;
                            case "3":
                                ObjetoSC.total++;
                                nivelEscrito = "Silábico com Valor";
                                break;
                            case "2":
                                ObjetoSS.total++;
                                nivelEscrito = "Silábico sem Valor";
                                break;
                            case "1":
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

                    //arrayAlunosDado.sort(Utils.Ordenacao.byname);

                    globalScope().DataGrid = arrayAlunosDado;

                    globalScope().atualizarEscopo();

                    callback();
                }else{
                    globalScope().dadosAnaliseAvaliacao = [];

                    globalScope().atualizarEscopo();

                    callback();
                }

            });
        },

        gerarAnaliseAvaliacaoTurma: function(idTurma, callback){
            AvaliacaoBusiness.getResultadoHipoteseAvaliacaoTurma(idTurma, function(listaResultados){
                if(listaResultados.length){
                    var ListaTrabalhada = [];

                    var arrayGroup = {};

                    for (var i = 0; i < listaResultados.length; ++i) {
                        var obj = listaResultados[i];

                        if (arrayGroup[obj.Avaliacao.periodo] == undefined)
                            arrayGroup[obj.Avaliacao.periodo] = [obj.Avaliacao.periodo];

                        arrayGroup[obj.Avaliacao.periodo].push(obj);
                    }

                    var j = 0;
                    for (var periodo in arrayGroup) {

                        var listaResultadosGroup = arrayGroup[periodo];

                        var ObjetoA = new Objetos.AnaliseHipotese(),
                            ObjetoSA = new Objetos.AnaliseHipotese(),
                            ObjetoSC = new Objetos.AnaliseHipotese(),
                            ObjetoSS = new Objetos.AnaliseHipotese(),
                            ObjetoS = new Objetos.AnaliseHipotese();

                        for(var i = 1, LenLR = listaResultadosGroup.length;i < LenLR; i++ ){
                            var nivelEscrito = "";

                            switch(listaResultadosGroup[i].nivelHipotese){
                                case "5":
                                    ObjetoA.total++;
                                    nivelEscrito = "Alfabético";
                                    break;
                                case "4":
                                    ObjetoSA.total++;
                                    nivelEscrito = "Silábico-Alfabético";
                                    break;
                                case "3":
                                    ObjetoSC.total++;
                                    nivelEscrito = "Silábico com Valor";
                                    break;
                                case "2":
                                    ObjetoSS.total++;
                                    nivelEscrito = "Silábico sem Valor";
                                    break;
                                case "1":
                                    ObjetoS.total++;
                                    nivelEscrito = "Pré-Silábico";
                                    break;
                            }
                        }

                        ObjetoA.nivel = "Alfabético";
                        ObjetoA.periodo = listaResultadosGroup[0] + "ºBimestre";
                        ObjetoA.porcentagem = ((ObjetoA.total/LenLR)*100).toFixed(2);
                        ObjetoSA.nivel = "Silábico-Alfabético";
                        ObjetoSA.periodo = listaResultadosGroup[0] + "ºBimestre";
                        ObjetoSA.porcentagem = ((ObjetoSA.total/LenLR)*100).toFixed(2);
                        ObjetoSC.nivel = "Silábico com Valor";
                        ObjetoSC.periodo = listaResultadosGroup[0] + "ºBimestre";
                        ObjetoSC.porcentagem = ((ObjetoSC.total/LenLR)*100).toFixed(2);
                        ObjetoSS.nivel = "Silábico sem Valor";
                        ObjetoSS.periodo = listaResultadosGroup[0] + "ºBimestre";
                        ObjetoSS.porcentagem = ((ObjetoSS.total/LenLR)*100).toFixed(2);
                        ObjetoS.nivel = "Pré-Silábico";
                        ObjetoS.periodo = listaResultadosGroup[0] + "ºBimestre";
                        ObjetoS.porcentagem = ((ObjetoS.total/LenLR)*100).toFixed(2);

                        var arrayGrafico = [];

                        arrayGrafico.push(ObjetoA);
                        arrayGrafico.push(ObjetoSA);
                        arrayGrafico.push(ObjetoSC);
                        arrayGrafico.push(ObjetoSS);
                        arrayGrafico.push(ObjetoS);

                        ListaTrabalhada[j] = arrayGrafico;

                        j++;

                    }

                    globalScope().dadosBruto = ListaTrabalhada;

                    for(var j = 0, LenT = ListaTrabalhada.length; j < LenT; j++){

                        var objAnalise = [
                            {v: ListaTrabalhada[j][0].periodo},
                            {v: ListaTrabalhada[j][0].total},
                            {v: ListaTrabalhada[j][1].total},
                            {v: ListaTrabalhada[j][2].total},
                            {v: ListaTrabalhada[j][3].total},
                            {v: ListaTrabalhada[j][4].total},
                        ];

                        globalScope().dadosAnaliseAvaliacao.push({"c": objAnalise});

                    }

                    globalScope().atualizarEscopo();

                    callback();
                }else{
                    globalScope().dadosAnaliseAvaliacao = [];

                    globalScope().atualizarEscopo();

                    callback();
                }

            });
        },

        gerarAnaliseAvaliacaoAluno: function(idAluno, callback){
            AvaliacaoBusiness.getResultadoHipoteseAvaliacaoAluno(idAluno, function(listaResultados){
                if(listaResultados.length){

                    var arrayGrafico = [];

                    for(var i = 0, LenLR = listaResultados.length;i < LenLR; i++ ){
                        var ObjetoP = new Objetos.AnaliseHipotese();

                        switch(listaResultados[i].nivelHipotese){
                            case "5":
                                ObjetoP.total = listaResultados[i].nivelHipotese;
                                ObjetoP.nivel = "Alfabético";
                                ObjetoP.periodo = listaResultados[i].Avaliacao.periodo + "ºBimestre";
                                break;
                            case "4":
                                ObjetoP.total = listaResultados[i].nivelHipotese;
                                ObjetoP.nivel = "Silábico-Alfabético";
                                ObjetoP.periodo = listaResultados[i].Avaliacao.periodo + "ºBimestre";
                                break;
                            case "3":
                                ObjetoP.total = listaResultados[i].nivelHipotese;
                                ObjetoP.nivel = "Silábico com Valor";
                                ObjetoP.periodo = listaResultados[i].Avaliacao.periodo + "ºBimestre";
                                break;
                            case "2":
                                ObjetoP.total = listaResultados[i].nivelHipotese;
                                ObjetoP.nivel = "Silábico sem Valor";
                                ObjetoP.periodo = listaResultados[i].Avaliacao.periodo + "ºBimestre";
                                break;
                            case "1":
                                ObjetoP.total = listaResultados[i].nivelHipotese;
                                ObjetoP.nivel = "Pré-Silábico";
                                ObjetoP.periodo = listaResultados[i].Avaliacao.periodo + "ºBimestre";
                                break;
                        }

                        arrayGrafico.push(ObjetoP);
                    }

                    arrayGrafico.sort(Utils.Ordenacao.byPeriodo);

                    for(var j = 0, LenT = arrayGrafico.length; j < LenT; j++){

                        var objAnalise = [
                            {v: arrayGrafico[j].periodo},
                            {v: parseInt(arrayGrafico[j].total)}
                        ];

                        globalScope().dadosAnaliseAvaliacaoAluno.push({"c": objAnalise});

                    }

                    globalScope().atualizarEscopo();

                    callback();
                }else{
                    globalScope().dadosAnaliseAvaliacaoAluno = [];

                    globalScope().atualizarEscopo();

                    callback();
                }

            });
        },

        changeGroupBy: function (group) {
            globalScope().gridOptions.groupBy(group);
        },

        filtroTipoAvaliacao: function(tipo){
            var totalAvaliacoes = globalScope().totalAvaliacoes;

            if(tipo != 0){
                var avaliacoes = [];
                for(var i = 0, lenA = totalAvaliacoes.length; i < lenA; i++ ) {
                    if (totalAvaliacoes[i].tipoAvaliacao == tipo){
                        avaliacoes.push(totalAvaliacoes[i]);
                    }
                }
                switch(tipo){
                    case 1:
                        globalScope().tipoAvaliacao = "Hipótese";
                        break;
                    case 2:
                        globalScope().tipoAvaliacao = "Diagnóstica";
                        break;
                    case 3:
                        globalScope().tipoAvaliacao = "FADA";
                        break;
                }
                globalScope().avaliacoes = avaliacoes;
                globalScope().atualizarEscopo();
            }else{
                globalScope().tipoAvaliacao = "Todas";
                globalScope().avaliacoes = totalAvaliacoes;
                globalScope().atualizarEscopo();
            }

        },

        updateExit: function(){
            if(globalScope().respostaAvaliacaoHipotese.id){
                AvaliacaoBusiness.putResultadoHipotese(globalScope().respostaAvaliacaoHipotese, function(retorno){
                    AvaliacaoBusiness.getResultadoHipoteseAluno(globalScope().alunoSelecionadoHipotese.id, globalScope().avaliacaoSelecionada.id, function(resultadoAluno) {
                        AvaliacaoBusiness.loadResultHipoteseAluno(resultadoAluno);
                        Utils.validarUnico(globalScope().respostaAvaliacaoHipotese.nivelHipotese);
                        globalScope().atualizarEscopo();
                    });
                })
            }else{
                AvaliacaoBusiness.postResultadoHipotese(globalScope().respostaAvaliacaoHipotese, function(retorno){
                    AvaliacaoBusiness.getResultadoHipoteseAluno(globalScope().alunoSelecionadoHipotese.id, globalScope().avaliacaoSelecionada.id, function(resultadoAluno) {
                        AvaliacaoBusiness.loadResultHipoteseAluno(resultadoAluno);
                        Utils.validarUnico(globalScope().respostaAvaliacaoHipotese.nivelHipotese);
                        globalScope().atualizarEscopo();
                    });
                })
            }
        },

        fecharAvaliacao: function(){
            globalScope().avaliacaoSelecionada.fechada = true;
            AvaliacaoBusiness.putAvaliacao(globalScope().avaliacaoSelecionada, function(){
                toastr.success("Realizado fechamento da Avaliação.")
            });
        }

    }
})(Objetos, AvaliacaoContract);