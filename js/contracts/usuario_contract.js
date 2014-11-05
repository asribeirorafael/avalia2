/**
 * Created by rafae_000 on 03/11/2014.
 */
var UsuarioContract = (function(Objetos) {

    return{

        setUsuarioFront: function(objetoBase){
            var objetoFront = Objetos.Usuario();

            objetoFront.username = objetoBase.get("username");
            objetoFront.email = objetoBase.get("email");
            objetoFront.nome = objetoBase.get("nomeCompleto");
            objetoFront.perfil = objetoBase.get("perfil");
            objetoFront.urlPicture = objetoBase.get("urlPicture");
            objetoFront.urlFacebook = objetoBase.get("urlFacebook");

            return objetoFront;
        }

    }
})(Objetos);
