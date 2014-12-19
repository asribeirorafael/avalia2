/**
 * Created by rafae_000 on 17/11/2014.
 */

var AvaliaControllers = angular.module("AvaliaControllers", []);

AvaliaControllers.controller("DashboardController", ['$scope','$http', function($scope, $http){
    globalScope().TURMA.getTurmasProfessorPage(function(res){
        globalScope().GraficoEvolucaoHipotese = {};
        globalScope().dadosAnaliseAvaliacao = [];

        if(res){
            AvaliacaoBusiness.gerarAnaliseAvaliacaoTurma(globalScope().turmaSelecionada.id, function(){
                globalScope().GraficoEvolucaoHipotese.data = {
                    "cols": [
                        {
                            "id": "mes",
                            "label": "Mês",
                            "type": "string"
                        },
                        {
                            "id": "alfabetico-id",
                            "label": "Alfabético",
                            "type": "number"
                        },
                        {
                            "id": "silabico-alfabetico-id",
                            "label": "Silábico-Alfabético",
                            "type": "number"
                        },
                        {
                            "id": "silabico-valor-id",
                            "label": "Silábico com Valor",
                            "type": "number"
                        },
                        {
                            "id": "silabico-sem-id",
                            "label": "Silábico sem Valor",
                            "type": "number"
                        },

                        {
                            "id": "silabico-id",
                            "label": "Silábico",
                            "type": "number"
                        }
                    ],
                    "rows": globalScope().dadosAnaliseAvaliacao
                };


                // $routeParams.chartType == BarChart or PieChart or ColumnChart...
                globalScope().GraficoEvolucaoHipotese.type = "LineChart";
                globalScope().GraficoEvolucaoHipotese.options = {
                    'title': 'Evolução da Turma',
                    'vAxis': {
                        'title': "Total de Alunos"
                    },
                    'legend': {
                        position: 'bottom'
                    }
                };

                globalScope().atualizarEscopo();

                jQuery('#dashboard').css('display', 'block');
                jQuery('#floatingBarsG').css('display', 'none');
            });
        }else{
            jQuery('#dashboard').css('display', 'block');
            jQuery('#floatingBarsG').css('display', 'none');
        }
    });
}]);

AvaliaControllers.controller("SelecionarAvaliacaoHipoteseController", ['$scope','$stateParams', function($stateParams){
    //Utils.ReturnPersistData();

    var avaliacao = globalScope().avaliacaoSelecionada;

    if(globalScope().flagTipoAcaoProva == 1){
        Utils.enabledQuestions();
    }else{
        Utils.disabledQuestions();
    }

    AvaliacaoBusiness.getResultadoHipoteseAvaliacao(avaliacao.id, function(listaResultados) {
        var cont = 0;
        var arrayPendentes = new Array();
        globalScope().DataGrid2 = new Array();

        if(listaResultados.length != 0){
            for(var i = 0, lenLR = listaResultados.length; i < lenLR; i++){
                if(listaResultados[i].nivelHipotese != ""){
                    cont++;
                }else{
                    globalScope().DataGrid2.push({"Nome": listaResultados[i].Aluno.nome, "RA": listaResultados[i].Aluno.numero_RA+"-"+listaResultados[i].Aluno.digito_RA})
                }
            }

            globalScope().DataGrid2.sort(Utils.Ordenacao.bynameResultado);

            globalScope().dadosPaginados = Utils.pagerData(5,globalScope().DataGrid2);

            var porcentagem = (cont/globalScope().turmaSelecionada.Alunos.length) * 100;
            globalScope().porcentagem = porcentagem;
            jQuery('#avaliaProgress').css('width', porcentagem+'%');

            globalScope().atualizarEscopo();
        }else{
            globalScope().DataGrid2 = new Array();
            for(var i= 0, lenLR = globalScope().turmaSelecionada.Alunos.length; i < lenLR; i++){
                globalScope().DataGrid2.push({"Nome": globalScope().turmaSelecionada.Alunos[i].nome, "RA": globalScope().turmaSelecionada.Alunos[i].numero_RA+"-"+globalScope().turmaSelecionada.Alunos[i].digito_RA})
            }

            globalScope().porcentagem = 0;
            jQuery('#avaliaProgress').css('width', '0%');

            globalScope().atualizarEscopo();
        }
    });

    AvaliacaoBusiness.getResultadoHipoteseAluno(globalScope().alunoSelecionadoHipotese.id, avaliacao.id, function(resultadoAluno){
        if(!resultadoAluno.id){
            globalScope().respostaAvaliacaoHipotese.id = "";
            globalScope().respostaAvaliacaoHipotese.idProjeto = globalScope().turmaSelecionada.idProjeto;
            globalScope().respostaAvaliacaoHipotese.ano = new Date().getFullYear();
            globalScope().respostaAvaliacaoHipotese.Avaliacao = avaliacao;
            globalScope().respostaAvaliacaoHipotese.Aluno = globalScope().alunoSelecionadoHipotese;
            globalScope().respostaAvaliacaoHipotese.Professor = new Objetos.Professor();
            globalScope().respostaAvaliacaoHipotese.Professor.id = globalScope().usuarioLogado.Pessoa.id;
            globalScope().respostaAvaliacaoHipotese.Turma = globalScope().turmaSelecionada;
            globalScope().respostaAvaliacaoHipotese.Escola = globalScope().turmaSelecionada.Escola;
            globalScope().respostaAvaliacaoHipotese.nivelHipotese = "";

            globalScope().atualizarEscopo();

            jQuery('#avaliacaoHipotese').css('display', 'block');
            jQuery('#floatingBarsG').css('display', 'none');
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

            jQuery('#avaliacaoHipotese').css('display', 'block');
            jQuery('#floatingBarsG').css('display', 'none');
        }
    });
}]);

AvaliaControllers.controller("TurmasHipoteseController", function(){
    //Utils.ReturnPersistData();

    globalScope().TURMA.getTurmasProfessorPage(function(res){
        jQuery('#listaTurmasHipotese').css('display', 'block');
        jQuery('#floatingBarsG').css('display', 'none');
    });
});

AvaliaControllers.controller("TiposAvaliacoesTurmaController", function(){
    //Utils.ReturnPersistData();

    globalScope().TURMA.getTurmasProfessorPage(function(res){
        jQuery('#tiposAvaliacoes').css('display', 'block');
        jQuery('#floatingBarsG').css('display', 'none');
    });
});

AvaliaControllers.controller("TiposAvaliacoesTurmaAnaliseController", function(){
    //Utils.ReturnPersistData();

    globalScope().TURMA.getTurmasProfessorPage(function(res){
        jQuery('#tiposAvaliacoes').css('display', 'block');
        jQuery('#floatingBarsG').css('display', 'none');
    });
});

AvaliaControllers.controller("TiposAvaliacoesAlunoAnaliseController", function(){
    //Utils.ReturnPersistData();

    globalScope().TURMA.getTurmasProfessorPage(function(res){
        jQuery('#tiposAvaliacoes').css('display', 'block');
        jQuery('#floatingBarsG').css('display', 'none');
    });
});

AvaliaControllers.controller("TrocarTurmaController", function(){
    Utils.ReturnPersistData();

    var usuario = JSON.parse(localStorage.getItem("User"));

    TurmaBusiness.getTurmasProfessor(usuario.Pessoa.id ,function(res){
        globalScope().turmas = res;
        if(globalScope().turmas.length == 1){
            jQuery('#listaTurmas').css('display', 'block');
            jQuery('#floatingBarsG').css('display', 'none');
            parent.location='#/turmas/'+ globalScope().turmaSelecionada.id +'/avaliacoes/tipos';
        }else{
            jQuery('#listaTurmas').css('display', 'block');
            jQuery('#floatingBarsG').css('display', 'none');
        }
    });
});

AvaliaControllers.controller("SelecionarTurmaHipoteseController", function(){
    //Utils.ReturnPersistData();

    var turma = globalScope().turmaSelecionada;

    if(turma.Alunos.length){
        if(!turma.Alunos[0].id){
            var listaAlunos = [];
            turma.Alunos.forEach(function(idAluno, indice){
                PessoaBusiness.getAluno(idAluno, function(alunoRes){
                    listaAlunos.push(alunoRes);
                    if(turma.Alunos.length == indice+1){
                        listaAlunos.sort(Utils.Ordenacao.byname);

                        globalScope().turmaSelecionada.Alunos = listaAlunos;

                        AvaliacaoBusiness.retornoAvaliacaoTipoSerie(turma, function () {
                            globalScope().atualizarEscopo();
                            jQuery('#listaAvaliacoesHipotese').css('display', 'block');
                            jQuery('#floatingBarsG').css('display', 'none');
                        });
                    }
                });
            });
        }else{
            AvaliacaoBusiness.retornoAvaliacaoTipoSerie(turma, function () {
                globalScope().atualizarEscopo();
                jQuery('#listaAvaliacoesHipotese').css('display', 'block');
                jQuery('#floatingBarsG').css('display', 'none');
            });
        }
    }else{
        AvaliacaoBusiness.retornoAvaliacaoTipoSerie(turma, function () {
            globalScope().atualizarEscopo();
            jQuery('#listaAvaliacoesHipotese').css('display', 'block');
            jQuery('#floatingBarsG').css('display', 'none');
        });
    }
});

AvaliaControllers.controller("CarometroController", ['$scope','$http', function($scope, $http){
    //Utils.ReturnPersistData();

    var turma = globalScope().turmaSelecionada;

    if(turma.Alunos.length) {
        if (!turma.Alunos[0].id) {
            var listaAlunos = [];
            var i = 1;
            turma.Alunos.forEach(function(idAluno){
                PessoaBusiness.getAluno(idAluno, function(alunoRes){
                    listaAlunos.push(alunoRes);
                    if(turma.Alunos.length == i){
                        listaAlunos.sort(Utils.Ordenacao.byname);

                        globalScope().turmaSelecionada.Alunos = listaAlunos;

                        globalScope().atualizarEscopo();

                        jQuery('#carometro').css('display', 'block');
                        jQuery('#floatingBarsG').css('display', 'none');
                    }else{
                        i++;
                    }
                });
            });
        }
        jQuery('#carometro').css('display', 'block');
        jQuery('#floatingBarsG').css('display', 'none');
    }else{
        jQuery('#carometro').css('display', 'block');
        jQuery('#floatingBarsG').css('display', 'none');
    }
}]);

AvaliaControllers.controller("GraficoAnaliseHipoteseAvaliacao", function($stateParams){
    //Utils.ReturnPersistData();

    globalScope().GraficoHipotesePizza = {};
    globalScope().GraficoHipoteseColuna = {};
    globalScope().dadosAnaliseAvaliacao = [];
    globalScope().DataGrid = [];

    AvaliacaoBusiness.gerarAnaliseAvaliacao($stateParams.idAvaliacao, function(){
        globalScope().GraficoHipotesePizza.data = {
            "cols": [
                {id: "t", label: "Topping", type: "string"},
                {id: "s", label: "Slices", type: "number"}
            ],
            "rows": [
                {c: globalScope().dadosAnaliseAvaliacao[0]},
                {c: globalScope().dadosAnaliseAvaliacao[1]},
                {c: globalScope().dadosAnaliseAvaliacao[2]},
                {c: globalScope().dadosAnaliseAvaliacao[3]},
                {c: globalScope().dadosAnaliseAvaliacao[4]}
            ]};


        // $routeParams.chartType == BarChart or PieChart or ColumnChart...
        globalScope().GraficoHipotesePizza.type = "PieChart";
        globalScope().GraficoHipotesePizza.options = {
            //'title': 'Porcentagem de Alunos por Nível',
            //'pieSliceText': 'label',
            'legend': 'bottom'
        };

        globalScope().GraficoHipoteseColuna.data = {
            "cols": [
                {id: "n", label: "Nivel", type: "string"},
                {id: "a", label: "Total de Alunos", type: "number"}
            ],
            "rows": [
                {c: globalScope().dadosAnaliseAvaliacao[0]},
                {c: globalScope().dadosAnaliseAvaliacao[1]},
                {c: globalScope().dadosAnaliseAvaliacao[2]},
                {c: globalScope().dadosAnaliseAvaliacao[3]},
                {c: globalScope().dadosAnaliseAvaliacao[4]}
            ]};


        // $routeParams.chartType == BarChart or PieChart or ColumnChart...
        globalScope().GraficoHipoteseColuna.type = "ColumnChart";
        globalScope().GraficoHipoteseColuna.options = {
            'title': 'Quantidade de Alunos por Nível',
            'vAxis': {
                'gridlines': {
                    'count': 0
                }
            },
            'legend': {
            position: 'none'
        }
        };

        globalScope().AVALIACAO.changeGroupBy("Nivel");

        globalScope().atualizarEscopo();

        jQuery('#analiseAvaliacao').css('display', 'block');
        jQuery('#floatingBarsG').css('display', 'none');
    });
});

AvaliaControllers.controller("EvolucaoTurmaController", function($stateParams){
    //Utils.ReturnPersistData();

    globalScope().GraficoEvolucaoHipotese = {};
    globalScope().dadosAnaliseAvaliacao = [];

    AvaliacaoBusiness.gerarAnaliseAvaliacaoTurma($stateParams.idTurma, function(){
        globalScope().GraficoEvolucaoHipotese.data = {
            "cols": [
                {
                    "id": "mes",
                    "label": "Mês",
                    "type": "string"
                },
                {
                    "id": "alfabetico-id",
                    "label": "Alfabético",
                    "type": "number"
                },
                {
                    "id": "silabico-alfabetico-id",
                    "label": "Silábico-Alfabético",
                    "type": "number"
                },
                {
                    "id": "silabico-valor-id",
                    "label": "Silábico com Valor",
                    "type": "number"
                },
                {
                    "id": "silabico-sem-id",
                    "label": "Silábico sem Valor",
                    "type": "number"
                },

                {
                    "id": "silabico-id",
                    "label": "Silábico",
                    "type": "number"
                }
            ],
            "rows": globalScope().dadosAnaliseAvaliacao
        };


        // $routeParams.chartType == BarChart or PieChart or ColumnChart...
        globalScope().GraficoEvolucaoHipotese.type = "LineChart";
        globalScope().GraficoEvolucaoHipotese.options = {
            'title': 'Evolução da Turma',
            'vAxis': {
                'title': "Total de Alunos"
            },
            'legend': {
                position: 'bottom'
            }
        };

        globalScope().atualizarEscopo();

        jQuery('#evolucaoHipotese').css('display', 'block');
        jQuery('#floatingBarsG').css('display', 'none');
    });
});

AvaliaControllers.controller("EvolucaoAlunoController", function($stateParams){
    //Utils.ReturnPersistData();

    globalScope().GraficoEvolucaoHipotese = {};
    globalScope().GraficoEvolucaoHipoteseAluno = {};
    globalScope().dadosAnaliseAvaliacao = [];
    globalScope().dadosAnaliseAvaliacaoAluno = [];

    AvaliacaoBusiness.gerarAnaliseAvaliacaoAluno($stateParams.idAluno, function(){
        globalScope().GraficoEvolucaoHipoteseAluno.data = {
            "cols": [
                {
                    "id": "periodo",
                    "label": "Períodos",
                    "type": "string"
                },
                {
                    "id": "nivel-id",
                    "label": "Nível",
                    "type": "number"
                }
            ],
            "rows": globalScope().dadosAnaliseAvaliacaoAluno
        };


        // $routeParams.chartType == BarChart or PieChart or ColumnChart...
        globalScope().GraficoEvolucaoHipoteseAluno.type = "LineChart";
        globalScope().GraficoEvolucaoHipoteseAluno.options = {
            'title': 'Evolução do Aluno',
            'vAxis':
            {
                'title': "Nível de Avaliação",
                'ticks': [
                    {v:0, f:''},
                    {v:1, f:'Silábico'},
                    {v:2, f:'Silábico sem Valor'},
                    {v:3, f:'Silábico com Valor'},
                    {v:4, f:'Silábico-Alfabético'},
                    {v:5, f:'Alfabético'}
                ]
            },
            'tooltip':
            {
                trigger: 'none'
            },
            'legend': {
                position: 'none'
            }
        };

        globalScope().atualizarEscopo();

        jQuery('#headerAluno').css('display', 'block');
        jQuery('#tituloRelatorio').css('display', 'block');
        jQuery('#EvolucaoAluno').css('display', 'block');
        if(document.getElementById('EvolucaoTurma').style.display == "block")
            jQuery('#floatingBarsG').css('display', 'none');
    });

    AvaliacaoBusiness.gerarAnaliseAvaliacaoTurma($stateParams.idTurma, function(){
        globalScope().GraficoEvolucaoHipotese.data = {
            "cols": [
                {
                    "id": "mes",
                    "label": "Mês",
                    "type": "string"
                },
                {
                    "id": "alfabetico-id",
                    "label": "Alfabético",
                    "type": "number"
                },
                {
                    "id": "silabico-alfabetico-id",
                    "label": "Silábico-Alfabético",
                    "type": "number"
                },
                {
                    "id": "silabico-valor-id",
                    "label": "Silábico com Valor",
                    "type": "number"
                },
                {
                    "id": "silabico-sem-id",
                    "label": "Silábico sem Valor",
                    "type": "number"
                },

                {
                    "id": "silabico-id",
                    "label": "Silábico",
                    "type": "number"
                }
            ],
            "rows": globalScope().dadosAnaliseAvaliacao
        };


        // $routeParams.chartType == BarChart or PieChart or ColumnChart...
        globalScope().GraficoEvolucaoHipotese.type = "LineChart";
        globalScope().GraficoEvolucaoHipotese.options = {
            'title': 'Evolução da Turma',
            'vAxis': {
                'title': 'Total de Alunos'
            },
            'legend': {
                position: 'bottom'
            }
        };

        globalScope().atualizarEscopo();

        jQuery('#headerAluno').css('display', 'block');
        jQuery('#tituloRelatorio').css('display', 'block');
        jQuery('#EvolucaoTurma').css('display', 'block');
        if(document.getElementById('EvolucaoAluno').style.display == "block")
            jQuery('#floatingBarsG').css('display', 'none');
    });
});

