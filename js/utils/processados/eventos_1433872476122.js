/*globals angular, $, console*/

var provasApp = angular.module("provasApp", ['ngGrid', 'ui.router', 'googlechart','AvaliaControllers']);

provasApp.config(function($locationProvider, $stateProvider,  $urlRouterProvider) {

    $urlRouterProvider.otherwise("/administracao/turmas");

    $stateProvider
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "templates/dashboard.html",
            controller: 'DashboardController',
            onEnter: function(){
                Utils.ReturnPersistData();
            },
            onExit: function(){
                //console.log("Estou saindo dessa página!!!");
            }
        })
        //.state('turmas', {
        //    url: "/turmas/hipotese",
        //    templateUrl: "templates/lancamento/listaTurmasHipotese.html",
        //    controller: 'TurmasHipoteseController',
        //    onEnter: function(){
        //        Utils.ReturnPersistData();
        //    },
        //    onExit: function(){
        //        //console.log("Estou saindo dessa página!!!");
        //    }
        //})
        .state('tiposAvaliacoesLancamento', {
            url: "/turmas/:idTurma/avaliacoes",
            templateUrl: "templates/lancamento/tiposAvaliacoes.html",
            controller: 'TiposAvaliacoesTurmaController',
            onEnter: function(){
                Utils.ReturnPersistData();
            },
            onExit: function(){
                //console.log("Estou saindo dessa página!!!");
            }
        })
        .state('avaliacoesHipotese', {
            url: "/turmas/:idTurma/avaliacoes/tipos",
            templateUrl: "templates/lancamento/listaAvaliacoesHipotese.html",
            controller: 'SelecionarTurmaHipoteseController',
            onEnter: function(){
                Utils.ReturnPersistData();
            },
            onExit: function(){
                //console.log("Estou saindo dessa página!!!");
            }
        })
        .state('avaliacaoHipotese', {
            url: "/turmas/:idTurma/avaliacoes/tipos/:idAvaliacao",
            templateUrl: "templates/lancamento/avaliacaoHipotese.html",
            controller: 'SelecionarAvaliacaoHipoteseController',
            onEnter: function(){
                Utils.ReturnPersistData();
            },
            onExit: function(){
                AvaliacaoBusiness.updateExit();
            }
        })
        .state('avaliacaoAnalise', {
            url: "/turmas/:idTurma/avaliacoes/tipos/analise/:idAvaliacao",
            templateUrl: "templates/analise/prova/analiseAvaliacao.html",
            controller: 'GraficoAnaliseHipoteseAvaliacao',
            onEnter: function(){
                Utils.ReturnPersistData();
            },
            onExit: function(){
                //console.log("Estou saindo dessa página!!!");
            }
        })
        .state('tiposAvaliacoes', {
            url: "/:idTurma/avaliacoes",
            templateUrl: "templates/analise/prova/tiposAvaliacoes.html",
            controller: 'TiposAvaliacoesTurmaAnaliseController',
            onEnter: function(){
                Utils.ReturnPersistData();
            },
            onExit: function(){
                //console.log("Estou saindo dessa página!!!");
            }
        })
        .state('evolucaoTurmaAnalise', {
            url: "/:idTurma/avaliacoes/hipotese",
            templateUrl: "templates/analise/prova/evolucaoHipotese.html",
            controller: 'EvolucaoTurmaController',
            onEnter: function(){
                Utils.ReturnPersistData();
            },
            onExit: function(){
                //console.log("Estou saindo dessa página!!!");
            }
        })
        .state('carometro', {
            url: "/:idTurma/carometro",
            templateUrl: "templates/analise/aluno/carometro.html",
            controller: 'CarometroController',
            onEnter: function(){
                Utils.ReturnPersistData();
            },
            onExit: function(){
                //console.log("Estou saindo dessa página!!!");
            }
        })
        .state('tiposAvaliacoesAluno', {
            url: "/:idTurma/carometro/:idAluno/avaliacoes",
            templateUrl: "templates/analise/aluno/tiposAvaliacoes.html",
            controller: 'TiposAvaliacoesAlunoAnaliseController',
            onEnter: function(){
                Utils.ReturnPersistData();
            },
            onExit: function(){
                //console.log("Estou saindo dessa página!!!");
            }
        })
        .state('evolucaoAlunoAnalise', {
            url: "/:idTurma/carometro/:idAluno/avaliacoes/hipotese",
            templateUrl: "templates/analise/aluno/evolucaoHipotese.html",
            controller: 'EvolucaoAlunoController',
            onEnter: function(){
                Utils.ReturnPersistData();
            },
            onExit: function(){
                //console.log("Estou saindo dessa página!!!");
            }
        })
        .state('trocarTurma', {
            url: "/administracao/turmas",
            templateUrl: "templates/administracao/listaTurmas.html",
            controller: 'TrocarTurmaController',
            onEnter: function(){
                //Utils.ReturnPersistData();
            },
            onExit: function(){
                //console.log("Estou saindo dessa página!!!");
            }
        });
});

/* Função do $scope */
function globalScope(){
    return angular.element(document).scope();
}

function atualizar(scope, funcao) {
    'use strict';
    if (scope.$$phase || scope.$root.$$phase) {
        if (typeof funcao !== 'function') {
            return;
        }
        funcao();
    } else {
        if (typeof funcao !== 'function') {
            scope.$apply();
        } else {
            scope.$apply(funcao);
        }
    }
}

/* Função do MASK */

provasApp.directive('mask', [function () {
    //noinspection JSLint
    return {
        restrict: 'A',
        link: function (escopo, elemento, atributos) {
            jQuery(function () {
                var mascara = atributos.mask;
                if (mascara === "cpf") {
                    //noinspection JSUnresolvedFunction
                    $(elemento).mask('000.000.000-00', {reverse: false});
                }
                if (mascara === "data") {
                    //noinspection JSUnresolvedFunction
                    $(elemento).mask('00/00/0000', {reverse: false});
                }
                if (mascara === "ano") {
                    //noinspection JSUnresolvedFunction
                    $(elemento).mask('0000', {reverse: false});
                }
                if (mascara === "RD") {
                    //noinspection JSUnresolvedFunction
                    $(elemento).mask('00.000.000-0', {reverse: false});
                }
                if (mascara === "digitoRA") {
                    //noinspection JSUnresolvedFunction
                    $(elemento).mask('0', {reverse: false});
                }
                if (mascara === "nuemroRA") {
                    //noinspection JSUnresolvedFunction
                    $(elemento).mask('00.000.000', {reverse: false});
                }
                if (mascara === "telefone") {
                    //noinspection JSUnresolvedFunction
                    $(elemento).mask('(00) 0000-0000', {reverse: false});
                }
                if (mascara === "celular") {
                    //noinspection JSUnresolvedFunction
                    $(elemento).mask('(00) 00000-0000', {reverse: false});
                }
                if (mascara === "certidao") {
                    $(elemento).mask('000000 00 00 0000 0 00000 000 0000000 00', {reverse: false});
                }
                if (mascara === "cep") {
                    $(elemento).mask('00000-000', {reverse: false});
                }
                if (mascara === "rg") {
                    $(elemento).mask('00.000.000-0', {reverse: false});
                }
                if (mascara === "dinheiro") {
                    $(elemento).mask('000.000.000.000.000,00', {reverse: true});
                }
            });
        }
    };
}]);

provasApp.run(['$rootScope', '$compile', '$routeParams', function (escopoGlobal, compilador, paramRota) {

    escopoGlobal.usuarioLogado = JSON.parse(localStorage.getItem("User"));
    escopoGlobal.state = "";

    escopoGlobal.listaEstadosCidades = Colecoes.EstadosCidades;
    escopoGlobal.listaCursos = Colecoes.Curso;
    escopoGlobal.listaPeriodo = Colecoes.TipoTurno;

    escopoGlobal.objetoEscola = new Objetos.Escola();
    escopoGlobal.objetoTurma = new Objetos.Turma();
    escopoGlobal.objetoAluno = new Objetos.Aluno;
    escopoGlobal.objetoProfessor = new Objetos.Professor;

    escopoGlobal.escolas = [];
    escopoGlobal.turmas = [];
    escopoGlobal.alunos = [];
    escopoGlobal.professores = [];
    escopoGlobal.avaliacoes = [];
    escopoGlobal.totalAvaliacoes = [];
    escopoGlobal.tipoAvaliacao = "Todas";

    escopoGlobal.escola = new Objetos.Escola();
    escopoGlobal.turma = new Objetos.Turma();
    escopoGlobal.aluno = new Objetos.Aluno();
    escopoGlobal.professor = new Objetos.Professor();

    escopoGlobal.idEscola = "";
    escopoGlobal.flagTipoAcaoProva = "";
    escopoGlobal.porcentagem = 0;

    escopoGlobal.escolaSelecionada = "";
    escopoGlobal.turmaSelecionada = "";
    escopoGlobal.alunoSelecionado = "";
    escopoGlobal.avaliacaoSelecionada = new Objetos.Avaliacao();

    escopoGlobal.alunoSelecionadoHipotese = new Objetos.Aluno();
    escopoGlobal.indiceAluno = 0;
    escopoGlobal.respostaAvaliacaoHipotese = new Objetos.ResultadoHipotese();

    escopoGlobal.GraficoHipotesePizza = {};
    escopoGlobal.GraficoHipoteseColuna = {};
    escopoGlobal.GraficoEvolucaoHipotese = {};
    escopoGlobal.GraficoEvolucaoHipoteseAluno = {};
    escopoGlobal.dadosBruto = [];
    escopoGlobal.dadosAnaliseAvaliacao = [];
    escopoGlobal.dadosAnaliseAvaliacaoAluno = [];
    escopoGlobal.DataGrid = [];
    escopoGlobal.gridOptions = {
        data: 'DataGrid'
    };
    escopoGlobal.DataGrid2 = [];
    escopoGlobal.gridOptions2 = {
        data: 'DataGrid2'
    };
    escopoGlobal.dadosPaginados = new Array();
    escopoGlobal.paginaSelecionada = 0;

    escopoGlobal.definirPagina = function (numeroPagina) {
        escopoGlobal.pagina = numeroPagina;
    };
    escopoGlobal.reload = function (numeroPag) {
        escopoGlobal.pagina = numeroPag;
    };
    escopoGlobal.atualizarEscopo = function (funcao) {
        if (escopoGlobal.$$phase || escopoGlobal.$root.$$phase) {
            if (typeof funcao !== 'function') {
                return;
            }
            funcao();
        } else {
            if (typeof funcao !== 'function') {
                escopoGlobal.$apply();
            } else {
                escopoGlobal.$apply(funcao);
            }
        }
    };
    escopoGlobal.alterarPagina = function (url, container) {
        var htmlTemplate = jQuery('#template_' + url);
        if (htmlTemplate) {
            htmlTemplate = htmlTemplate.html();
            htmlTemplate = compilador(htmlTemplate)(escopoGlobal);
            jQuery(container).html(htmlTemplate);
        }
    };
    escopoGlobal.habilitarCadastro = function () {
        if (escopoGlobal.cadastroEscolhido === -1) {
            escopoGlobal.cadastroEscolhido = null;
        } else {
            escopoGlobal.cadastroEscolhido = -1;
        }
    };
    escopoGlobal.limparTemplate = function (endereco) {
        escopoGlobal.objetoEscola = new Objetos.Escola();
        escopoGlobal.objetoTurma = new Objetos.Turma();
        escopoGlobal.objetoAluno = new Objetos.Aluno;
        escopoGlobal.objetoProfessor = new Objetos.Professor;
        escopoGlobal.alterarPagina(endereco, '#container-cadastro')
    };

    escopoGlobal.ESCOLA = EscolaBusiness;
    escopoGlobal.PESSOA = PessoaBusiness;
    escopoGlobal.TURMA = TurmaBusiness;
    escopoGlobal.AVALIACAO = AvaliacaoBusiness;
    escopoGlobal.UTILIDADE = Utils;

    /*retornarCidade: function (Estado) {
     var ArrayCidades = new Array();
     var Cidades = Colecoes.Cidades();
     for (var i = 0, lenI = Cidades.length; i < lenI; i++) {
     if (parseInt(Cidades[i].Key / 100000) == Estado) {
     Cidades[i].Value = Cidades[i].Value.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ");
     Cidades[i].Value = Cidades[i].Value.toLowerCase();
     ArrayCidades.push(Cidades[i]);
     }
     }
     return ArrayCidades;
     }*/
}]);



