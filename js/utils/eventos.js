/*globals angular, $, console*/

var provasApp = angular.module('provasApp', []);

/* Função do $scope */
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

/* Função do $scope */

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

    escopoGlobal.definirPagina = function (numeroPagina) {
        escopoGlobal.pagina = numeroPagina;
    };

    escopoGlobal.reload = function (numeroPag) {
        escopoGlobal.pagina = numeroPag;
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

    /*---------------------------------------------------------------------*/

    /*---CADASTRAR---*/

    escopoGlobal.cadastrarEscola = function () {
        var cadEscola = Utils.Clonar(escopoGlobal.objetoEscola);
        cadEscola.Endereco.estado = cadEscola.Endereco.estado.Key;
        cadEscola.Endereco.cidade = cadEscola.Endereco.cidade.Key;
        postEscola(cadEscola, function(resposta){
            cadEscola.id = resposta.id;
            escopoGlobal.escolas.push(cadEscola);
            escopoGlobal.alterarPagina("tabelaEscola", '#container-cadastro');
            atualizar(escopoGlobal);
            console.log(resposta);
        })
    };

    escopoGlobal.cadastrarTurma = function () {
        var cadTurma = Utils.Clonar(escopoGlobal.objetoTurma);
        cadTurma.curso = cadTurma.curso.Value;
        cadTurma.serie = cadTurma.serie.Value;
        cadTurma.turno = cadTurma.turno.Value;
        postTurma(cadTurma, function(resposta){
            cadTurma.id = resposta.id;
            escopoGlobal.turmas.push(cadTurma);
            escopoGlobal.alterarPagina("tabelaTurma", '#container-cadastro');
            atualizar(escopoGlobal);
            console.log(resposta);
        })
    };

    escopoGlobal.cadastrarAluno = function () {
        var cadAluno =  Utils.Clonar(escopoGlobal.objetoAluno);
        postAluno(cadAluno, function(resposta){
            cadAluno.id = resposta.id;
            escopoGlobal.aluno.push(cadAluno);
            escopoGlobal.alterarPagina("tabelaPessoa", '#container-cadastro');
            atualizar(escopoGlobal);
            console.log(resposta);
        })
    };

    escopoGlobal.cadastrarProfessor = function () {
        var cadProf =  Utils.Clonar(escopoGlobal.objetoProfessor);
        postProfessor(cadProf, function(resposta){})
    };

    /*---CADASTRAR FIM---*/

    /*---------------------------------------------------------------------*/

    /*---GET---*/

    getEscolasRede(function(data){
        var escolas = data;
        escopoGlobal.escolas = escolas;
        console.log(escolas)
    });

    getAlunosRede(function(data){
        var aluno = data;
        escopoGlobal.alunos = aluno;
        console.log(aluno)
    });

    getProfessoresRede(function(data){
        var professores = data;
        escopoGlobal.professor = professores;
        console.log(professores)
    });

    getTurmasRede(function(data){
        var turmas = data;
        escopoGlobal.turmas = turmas;
        console.log(turmas)
    });

    /*---GET FIM---*/

    /*---------------------------------------------------------------------*/

    /*---SELECIONAR---*/

    escopoGlobal.selecionarEscola = function (escolaSelecionada) {
        escopoGlobal.objetoEscola = escolaSelecionada;
        escopoGlobal.alterarPagina('cadastroEscola', '#container-cadastro');
    };

    escopoGlobal.selecionarTurma = function (turmaSelecionada) {
        escopoGlobal.objetoTurma = turmaSelecionada;
        escopoGlobal.alterarPagina('cadastroTurma', '#container-cadastro');
    };

    escopoGlobal.selecionarAluno = function (alunoSelecionada) {
        escopoGlobal.objetoAluno = alunoSelecionada;
        escopoGlobal.alterarPagina('cadastroPessoa', '#container-cadastro');
    };

    escopoGlobal.selecionarProf = function (profSelecionada) {
        escopoGlobal.objetoProfessor = profSelecionada;
        escopoGlobal.alterarPagina('cadastroPessoa', '#container-cadastro');
    };

    /*---SELECIONAR FIM---*/

    /*---------------------------------------------------------------------*/

    /*---EDITAR---*/

    escopoGlobal.editarEscola = function () {
        var cadEscola = Utils.Clonar(escopoGlobal.objetoEscola);
        cadEscola.Endereco.estado = cadEscola.Endereco.estado.Key;
        cadEscola.Endereco.cidade = cadEscola.Endereco.cidade.Key;
        putEscola(cadEscola, function(resposta){})
    };

    escopoGlobal.editarTurma = function () {
        var cadTurma = Utils.Clonar(escopoGlobal.objetoTurma);
        cadTurma.curso = cadTurma.curso.Value;
        cadTurma.serie = cadTurma.serie.Value;
        cadTurma.turno = cadTurma.turno.Value;
        putTurma(cadTurma, function(resposta){})
    };

    escopoGlobal.editarAluno = function () {
        var cadAluno =  Utils.Clonar(escopoGlobal.objetoAluno);
        putAluno(cadAluno, function(resposta){})
    };

    escopoGlobal.editarProfessor = function () {
        var cadProf =  Utils.Clonar(escopoGlobal.objetoProfessor);
        putProfessor(cadProf, function(resposta){})
    };

    /*---EDITAR FIM---*/

    /*---------------------------------------------------------------------*/

    /*---DELETAR---*/

    escopoGlobal.deletarEscola = function (idEscola) {
        deleteEscola(idEscola, function(resposta){})
    };

    escopoGlobal.deletarTurma = function (idTurma) {
        deleteTurma(idTurma, function(resposta){})
    };

    escopoGlobal.deletarAluno = function (idAluno) {
        deleteAluno(idAluno, function(resposta){})
    };

    escopoGlobal.deletarProfessor = function (idProf) {
        deleteProfessor(idProf, function(resposta){})
    };

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





