/**
 * Created by rafae_000 on 14/10/2014.
 */


var EscolaContract = (function(Objetos) {

    return{

        setEscolaFront: function(objetoBase){
            var objetoFront = Objetos.Escola();

            objetoFront.id = objetoBase.id;
            objetoFront.idProjeto = objetoBase.get("idProjeto");
            objetoFront.nomeEscola = objetoBase.get("nome");
            objetoFront.nomeCurtoEscola = objetoBase.get("nomeCurto");
            objetoFront.Turmas = objetoBase.get("listaTurma");
            if(objetoBase.get("idEndereco")) {
                objetoFront.Endereco = EnderecoContract.setEnderecoFront(objetoBase.get("idEndereco"));
            }else{
                objetoFront.Endereco = new Objetos.Endereco();
            }

            return objetoFront;
        },

        setEscolaBase: function(objetoBase, objetoFront){
            var EnderecoTable = Parse.Object.extend("endereco");
            var enderecoSave = new EnderecoTable();
            enderecoSave.id = objetoFront.Endereco.id;

            var projeto = "mg00"; //Futuramente pegar do usuario o projeto

            if(objetoFront.id)
                objetoBase.id = objetoFront.id;

            objetoBase.set("idProjeto", projeto);
            objetoBase.set("nome", objetoFront.nomeEscola);
            objetoBase.set("nomeCurto", objetoFront.nomeCurtoEscola);
            objetoBase.set("listaTurma", objetoFront.Turmas);
            objetoBase.set("idEndereco", enderecoSave);

            return objetoBase;
        }
    }
})(Objetos);

