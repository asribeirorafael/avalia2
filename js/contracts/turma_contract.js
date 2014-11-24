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
            objetoFront.serie = objetoBase.get("serie");
            objetoFront.turma = objetoBase.get("turma");
            objetoFront.curso = objetoBase.get("curso");
            objetoFront.turno = objetoBase.get("turno");
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
            objetoBase.set("serie", objetoFront.serie);
            objetoBase.set("turma", objetoFront.turma);
            objetoBase.set("curso", objetoFront.curso);
            objetoBase.set("turno", objetoFront.turno);
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

