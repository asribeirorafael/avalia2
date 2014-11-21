/**
 * Created by rafae_000 on 16/10/2014.
 */

var Objetos = (function() {
    function Endereco(){
        this.id = "";
        this.idProjeto = "";
        this.cep = "";
        this.estado = "";
        this.cidade = "";
        this.bairro = "";
        this.numero = "";
        this.logradouro = "";
        this.tipoLogradouro = "";
        this.coordenada = new Parse.GeoPoint();
    };

    function Escola(){
        this.id = "";
        this.idProjeto = "";
        this.nomeEscola = "";
        this.nomeCurtoEscola = "";
        this.Endereco = new Objetos.Endereco();
        this.Turmas = new Array();
    };

    function Aluno(){
        this.id = "";
        this.idProjeto = "";
        this.nome = "";
        this.dataNascimento = null;
        this.numero_RA = null;
        this.digito_RA = null;
        this.imagem = "";
    };

    function Professor() {
        this.id = "";
        this.idProjeto = "";
        this.nome = "";
        this.dataNascimento = null;
        this.rd = null;
    };

    function Turma(){
        this.id = "";
        this.idProjeto = "";
        this.ano = null;
        this.codigoProdesp = null;
        this.serie = "";
        this.turma = "";
        this.curso = "";
        this.turno = "";
        this.Escola = new Objetos.Escola();
        this.Professor = new Objetos.Professor();
        this.Alunos = new Array();
    };

    function Avaliacao(){
        this.id = "";
        this.idProjeto = "";
        this.ano = null;
        this.periodo = "";
        this.serie = "";
        this.curso = "";
        this.tipoAvaliacao = "";
    };

    function ResultadoDiagnostico(){
        this.id = "";
        this.idProjeto = "";
        this.ano = null;
        this.Avaliacao = "";
        this.Aluno = "";
        this.Professor = "";
        this.Turma = "";
        this.Escola = "";
        this.nivelRegistro = "";
        this.nivelTema = "";
        this.nivelGenero = "";
        this.nivelCoesaoCoerencia = "";
    };

    function ResultadoHipotese(){
        this.id = "";
        this.idProjeto = "";
        this.ano = null;
        this.Avaliacao = "";
        this.Aluno = "";
        this.Professor = "";
        this.Turma = "";
        this.Escola = "";
        this.nivelHipotese = "";
    };

    function Usuario(){
        this.username = "";
        this.email = "";
        this.nome = "";
        this.perfil = "";
        this.urlPicture = "";
        this.urlFacebook = "";
        this.Pessoa = new Objetos.Professor();
        this.idFacebook = "";
        this.projeto = "";
    }

    function AnaliseHipotese(){
        this.nivel = "";
        this.total = 0;
        this.porcentagem = "";
    }

    return {

        Endereco: function(){return new Endereco()},

        Escola: function(){return new Escola()},

        Aluno: function(){return new Aluno()},

        Professor: function(){return new Professor()},

        Turma: function(){return new Turma()},

        Avaliacao: function(){return new Avaliacao()},

        ResultadoDiagnostico: function(){return new ResultadoDiagnostico()},

        ResultadoHipotese: function(){return new ResultadoHipotese()},

        Usuario: function(){return new Usuario()},

        AnaliseHipotese: function(){return new AnaliseHipotese()}
    }

})();

