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
    escopoGlobal.escola = new Objetos.Escola();
    escopoGlobal.turma = new Objetos.Turma();
    escopoGlobal.aluno = new Objetos.Aluno();
    escopoGlobal.professor = new Objetos.Professor();
    escopoGlobal.idEscola = ""
    escopoGlobal.escolaSelecionada = ""
    escopoGlobal.ESCOLA = new function(){
        this.cadastrar = EscolaBusiness.eventoCadastrarEscola(escopoGlobal);
        this.retornar = EscolaBusiness.retornoEscola(escopoGlobal);
        this.retornarRede = EscolaBusiness.retornoEscolasRede(escopoGlobal);
        this.selecionar = EscolaBusiness.eventoSelecionarEscola(escopoGlobal);
        this.editar = EscolaBusiness.eventoEditarEscola(escopoGlobal);
        this.deletar = EscolaBusiness.eventoDeletetarEscola(escopoGlobal);
    }

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

    //EVENTOS DA ESCOLA

    //escopoGlobal.ESCOLA.cadastrar = EscolaBusiness.eventoCadastrarEscola(escopoGlobal);
    //escopoGlobal.ESCOLA.retornar = EscolaBusiness.retornoEscola(escopoGlobal);
    //escopoGlobal.ESCOLA.retornarRede = EscolaBusiness.retornoEscolasRede(escopoGlobal);
    //escopoGlobal.ESCOLA.selecionar = EscolaBusiness.eventoSelecionarEscola(escolaSelecionada, escopoGlobal);
    //escopoGlobal.ESCOLA.editar = EscolaBusiness.eventoEditarEscola(escopoGlobal);
    //escopoGlobal.ESCOLA.deletar = EscolaBusiness.eventoDeletetarEscola(idEscola);

    //EVENTOS DE PESSOA

    //escopoGlobal.PESSOA.cadastrar = eventoCadastrarPessoa(escopoGlobal);
    //escopoGlobal.PESSOA.retornar = retornoPessoa(escopoGlobal);
    //escopoGlobal.PESSOA.editar = eventoEditarPessoa(escopoGlobal);
    //escopoGlobal.PESSOA.deletar = eventoDeletetarPessoa(idEscola);

    /*---CADASTRAR---*/

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

    escopoGlobal.ESCOLA.retornarRede();
    PessoaBusiness.getAlunosRede(function(data){
        var aluno = data;
        escopoGlobal.alunos = aluno;
        console.log(aluno)
    });
    PessoaBusiness.getProfessoresRede(function(data){
        var professores = data;
        escopoGlobal.professor = professores;
        console.log(professores)
    });
    TurmaBusiness.getTurmasRede(function(data){
        var turmas = data;
        escopoGlobal.turmas = turmas;
        console.log(turmas)
    });

    /*---GET FIM---*/

    /*---------------------------------------------------------------------*/

    /*---SELECIONAR---*/

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



