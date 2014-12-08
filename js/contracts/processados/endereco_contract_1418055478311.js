/**
 * Created by rafae_000 on 14/10/2014.
 */

var EnderecoContract = (function(Objetos) {

    return{

        setEnderecoFront: function(objetoBase){
            var objetoFront = Objetos.Endereco();

            if(objetoBase){
                objetoFront.id = objetoBase.id;

                objetoFront.idProjeto = objetoBase.get("idProjeto");
                objetoFront.cep = objetoBase.get("cep");
                objetoFront.estado = objetoBase.get("estado");
                objetoFront.cidade = objetoBase.get("cidade");
                objetoFront.bairro = objetoBase.get("bairro");
                objetoFront.numero = objetoBase.get("numero");
                objetoFront.logradouro = objetoBase.get("logradouro");
                objetoFront.tipoLogradouro = objetoBase.get("tipo_logradouro");
                objetoFront.coordenada = objetoBase.get("coordenada");
            }

            return objetoFront;
        },

        setEnderecoBase: function(objetoBase, objetoFront){
            var projeto = "mg00"; //Futuramente pegar do usuario o projeto

            if(objetoFront.id)
                objetoBase.id = objetoFront.id;

            objetoBase.set("idProjeto", projeto);
            objetoBase.set("cep", objetoFront.cep);
            objetoBase.set("estado", objetoFront.estado);
            objetoBase.set("cidade", objetoFront.cidade);
            objetoBase.set("bairro", objetoFront.bairro);
            objetoBase.set("numero", objetoFront.numero);
            objetoBase.set("logradouro", objetoFront.logradouro);
            objetoBase.set("tipo_logradouro", objetoFront.tipoLogradouro);
            objetoBase.set("coordenada", objetoFront.coordenada);

            return objetoBase;
        }
    }
})(Objetos);

