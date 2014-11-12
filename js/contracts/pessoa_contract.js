/**
 * Created by rafae_000 on 14/10/2014.
 */

var PessoaContract = (function(Objetos) {

    return{

        setAlunoFront: function(objetoBase){
            var objetoFront = Objetos.Aluno();

            if(objetoBase.id)
                objetoFront.id = objetoBase.id;

            objetoFront.idProjeto = objetoBase.get("idProjeto");
            objetoFront.nome = objetoBase.get("nome");
            objetoFront.dataNascimento = Utils.Conversao.dataBrasil(new Date(objetoBase.get("dtNasc")));
            objetoFront.numero_RA = objetoBase.get("numero_RA");
            objetoFront.digito_RA = objetoBase.get("digito_RA");
            objetoFront.imagem = objetoBase.get("urlImage");

            return objetoFront;
        },

        setProfessorFront: function(objetoBase){
            var objetoFront = Objetos.Professor();

            if(objetoBase){
                objetoFront.id = objetoBase.id;

                objetoFront.idProjeto = objetoBase.get("idProjeto");
                objetoFront.nome = objetoBase.get("nome");
                objetoFront.dataNascimento = Utils.Conversao.dataBrasil(new Date(objetoBase.get("dtNasc")));
                objetoFront.rd = objetoBase.get("rd");
            }

            return objetoFront;
        },

        setAlunoBase: function(objetoBase, objetoFront){
            var projeto = "mg00"; //Futuramente pegar do usuario o projeto

            if(objetoFront){
                objetoBase.id = objetoFront.id;

                objetoBase.set("idProjeto", projeto);
                objetoBase.set("nome", objetoFront.nome);
                objetoBase.set("dtNasc", new Date(objetoFront.dataNascimento));
                objetoBase.set("numero_RA", objetoFront.numero_RA);
                objetoBase.set("digito_RA", objetoFront.digito_RA);
                objetoBase.set("urlImage", objetoFront.imagem);
            }

            return objetoBase;
        },

        setProfessorBase: function(objetoBase, objetoFront){
            var projeto = "mg00"; //Futuramente pegar do usuario o projeto

            if(objetoFront.id)
                objetoBase.id = objetoFront.id;

            objetoBase.set("idProjeto", projeto);
            objetoBase.set("nome", objetoFront.nome);
            objetoBase.set("dtNasc", new Date(objetoFront.dataNascimento));
            objetoBase.set("rd", objetoFront.rd);

            return objetoBase;
        }
    }
})(Objetos);
