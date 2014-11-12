/**
 * Created by rafae_000 on 14/10/2014.
 */

var AvaliacaoContract = (function(Objetos) {

    return{

        setAvaliacaoFront: function(objetoBase){
            var objetoFront = Objetos.Avaliacao();

            if(objetoBase) {
                objetoFront.id = objetoBase.id;

                objetoFront.idProjeto = objetoBase.get("idProjeto");
                objetoFront.ano = objetoBase.get("ano");
                objetoFront.periodo = objetoBase.get("periodo");
                objetoFront.tipoAvaliacao = objetoBase.get("tipoAvaliacao");
                objetoFront.serie = objetoBase.get("tipoSerie");
                objetoFront.curso = objetoBase.get("tipoCurso");
            }

            return objetoFront;
        },

        setAvaliacaoBase: function(objetoBase, objetoFront){
            var projeto = "mg00"; //Futuramente pegar do usuario o projeto

            if(objetoFront.id)
                objetoBase.id = objetoFront.id;

            objetoBase.set("idProjeto", projeto);
            objetoBase.set("ano", objetoFront.ano);
            objetoBase.set("periodo", objetoFront.periodo);
            objetoBase.set("tipoAvaliacao", objetoFront.tipoAvaliacao);
            objetoBase.set("tipoSerie", objetoFront.serie);
            objetoBase.set("tipoCurso", objetoFront.curso);

            return objetoBase;
        },

        setHipoteseFront: function(objetoBase){
            var objetoFront = Objetos.ResultadoHipotese();

            if(objetoBase){
                objetoFront.id = objetoBase.id;

                objetoFront.idProjeto = objetoBase.get("idProjeto");
                objetoFront.ano = objetoBase.get("ano");

                if(objetoBase.get("idAvalicao")){
                    objetoFront.Avalicao = AvaliacaoContract.setAvaliacaoFront(objetoBase.get("idAvalicao"));
                }else{
                    objetoFront.Avalicao = new Objetos.Avaliacao();
                }
                if(objetoBase.get("idAluno")){
                    objetoFront.Aluno = PessoaContract.setAlunoFront(objetoBase.get("idAluno"));
                }else{
                    objetoFront.Aluno = new Objetos.Aluno();
                }
                if(objetoBase.get("idProfessor")){
                    objetoFront.Professor = PessoaContract.setProfessorFront(objetoBase.get("idProfessor"));
                }else{
                    objetoFront.Professor = new Objetos.Professor();
                }
                if(objetoBase.get("idTurma")){
                    objetoFront.Turma = TurmaContract.setTurmaFront(objetoBase.get("idTurma"));
                }else{
                    objetoFront.Turma = new Objetos.Turma();
                }
                if(objetoBase.get("idEscola")){
                    objetoFront.Escola = EscolaContract.setEscolaFront(objetoBase.get("idEscola"));
                }else{
                    objetoFront.Escola = new Objetos.Escola();
                }

                objetoFront.nivelHipotese = objetoBase.get("nivelHipotese");
            }

            return objetoFront;
        },

        setHipoteseBase: function(objetoBase, objetoFront){
            var projeto = "mg00"; //Futuramente pegar do usuario o projeto

            if(objetoFront.id)
                objetoBase.id = objetoFront.id;

            objetoBase.set("idProjeto", projeto);
            objetoBase.set("ano", objetoFront.ano);
            objetoBase.set("idAvalicao", objetoFront.Avalicao.id);
            objetoBase.set("idAluno", objetoFront.Aluno.id);
            objetoBase.set("idProfessor", objetoFront.Professor.id);
            objetoBase.set("idTurma", objetoFront.Turma.id);
            objetoBase.set("idEscola", objetoFront.Escola.id);
            objetoBase.set("nivelHipotese", objetoFront.nivelHipotese);

            return objetoBase;
        }
    }
})(Objetos);

