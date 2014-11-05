/**
 * Created by rafae_000 on 14/10/2014.
 */

var AvaliacaoContract = (function(Objetos) {

    return{

        setAvaliacaoFront: function(objetoBase){
            var objetoFront = Objetos.Avaliacao();

            objetoFront.id = objetoBase.id;
            objetoFront.idProjeto = objetoBase.get("idProjeto");
            objetoFront.ano = objetoBase.get("ano");
            objetoFront.periodo = objetoBase.get("periodo");
            objetoFront.tipoAvaliacao = objetoBase.get("tipoAvaliacao");
            objetoFront.serie = objetoBase.get("tipoSerie");
            objetoFront.curso = objetoBase.get("tipoCurso");

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
        }
    }
})(Objetos);

