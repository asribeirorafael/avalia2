/*globals angular, $, console*/

var provasApp = angular.module("provasApp", ['ngRoute', 'AvaliaControllers']);

provasApp.config(function($routeProvider,  $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/templates/dashboard.ejs',
            controller: 'DashboardController'
        }).
        when('/dashboard', {
            templateUrl: 'views/templates/dashboard.ejs',
            controller: 'DashboardController'
        }).
        when('/carometro', {
            templateUrl: 'views/templates/carometro.ejs',
            controller: 'CarometroController'
        }).
        otherwise({
            redirectTo: '/'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
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

provasApp.run(['$rootScope', '$compile', function (escopoGlobal, compilador) {

    escopoGlobal.usuarioLogado = JSON.parse(localStorage.getItem("User"));
    escopoGlobal.listaEstadosCidades = Colecoes.EstadosCidades;
    escopoGlobal.listaCursos = Colecoes.Curso;
    escopoGlobal.listaPeriodo = Colecoes.TipoTurno;
    escopoGlobal.objetoEscola = new Objetos.Escola();
    escopoGlobal.objetoTurma = new Objetos.Turma();
    escopoGlobal.objetoAluno = new Objetos.Aluno;
    escopoGlobal.objetoProfessor = new Objetos.Professor;
    escopoGlobal.pagina = 0;
    escopoGlobal.escolas = [];
    escopoGlobal.turmas = [];
    escopoGlobal.aluno = [];
    escopoGlobal.professores = [];
    escopoGlobal.avaliacoes = [];
    escopoGlobal.escola = new Objetos.Escola();
    escopoGlobal.turma = new Objetos.Turma();
    escopoGlobal.aluno = new Objetos.Aluno();
    escopoGlobal.professor = new Objetos.Professor();
    escopoGlobal.idEscola = "";
    escopoGlobal.escolaSelecionada = "";
    escopoGlobal.turmaSelecionada = "";
    escopoGlobal.avaliacaoSelecionada = new Objetos.Avaliacao();
    escopoGlobal.alunoSelecionadoHipotese = new Objetos.Aluno();
    escopoGlobal.indiceAluno = 0;
    escopoGlobal.respostaAvaliacaoHipotese = new Objetos.ResultadoHipotese();

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

    escopoGlobal.TURMA.getTurmasProfessorPage();

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



