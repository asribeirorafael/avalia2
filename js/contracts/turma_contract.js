/**
 * Created by rafae_000 on 14/10/2014.
 */

var TurmaContract = (function(Objetos) {

    return{
        setTurmaFront: function(objetoBase){
            var objetoFront = new Objetos.Turma();

            if(objetoBase.id)
                objetoFront.id = objetoBase.id;

            objetoFront.idProjeto = objetoBase.get("idProjeto");
            objetoFront.ano = objetoBase.get("ano");
            objetoFront.serie = Utils.Conversao.KeyValue(objetoBase.get("serie"), Colecoes.Curso[objetoBase.get("curso")].Serie);
            objetoFront.turma = Utils.Conversao.KeyValue(objetoBase.get("turma"), Colecoes.TipoTurma);
            objetoFront.curso = Utils.Conversao.KeyValue(objetoBase.get("curso"), Colecoes.Curso);
            objetoFront.turno = Utils.Conversao.KeyValue(objetoBase.get("turno"), Colecoes.TipoTurno);
            objetoFront.codigoProdesp = objetoBase.get("codigoProdesp");

            if(objetoBase.get("idEscola")) {
                objetoFront.Escola = EscolaContract.setEscolaFront(objetoBase.get("idEscola"));
            }else{
                objetoFront.Escola = new Objetos.Escola();
            }

            if(objetoBase.get("idProf")){
                objetoFront.Professor = PessoaContract.setProfessorFront(objetoBase.get("idProf"));
            }else{
                objetoFront.Professor = new Objetos.Professor();
            }

            objetoFront.Alunos = objetoBase.get("listaAlunos");

            return objetoFront;
        },

        setTurmaBase: function(objetoBase, objetoFront){
            var EscolaTable = Parse.Object.extend("escola");
            var escolaSave = new EscolaTable();
            escolaSave.id = objetoFront.Escola.id;
            var ProfessorTable = Parse.Object.extend("pessoaProf");
            var professorSave = new ProfessorTable();
            professorSave.id = objetoFront.Professor.id;

            var projeto = "mg00"; //Futuramente pegar do usuario o projeto

            if(objetoFront.id)
                objetoBase.id = objetoFront.id;

            objetoBase.set("idProjeto", projeto);
            objetoBase.set("ano", parseInt(objetoFront.ano));

            objetoBase.set("serie", Utils.Conversao.ValueKey(objetoFront.serie, Colecoes.Curso[(Utils.Conversao.ValueKey(objetoFront.curso, Colecoes.Curso))].Serie));
            objetoBase.set("turma", Utils.Conversao.ValueKey(objetoFront.turma, Colecoes.TipoTurma));
            objetoBase.set("curso", Utils.Conversao.ValueKey(objetoFront.curso, Colecoes.Curso));
            objetoBase.set("turno", Utils.Conversao.ValueKey(objetoFront.turno, Colecoes.TipoTurno));

            objetoBase.set("codigoProdesp", parseInt(objetoFront.codigoProdesp));
            if(escolaSave){
                objetoBase.set("idEscola", escolaSave);
            }else{
                objetoBase.set("idEscola", null);
            }
            if(professorSave){
                objetoBase.set("idProf", professorSave);
            }          else{
                objetoBase.set("idProf", null);
            }

            var listaIdAlunos = new Array();
            for(var i=0; i< objetoFront.Alunos.length; i++){
                listaIdAlunos.push(objetoFront.Alunos[i].id);
            }

            objetoBase.set("listaAlunos", listaIdAlunos);

            return objetoBase;
        }
    }

})(Objetos);

