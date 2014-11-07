/**
 * Created by rafae_000 on 31/10/2014.
 */

Parse.initialize("Y9INXMkrMANGt2B8ttXcDLPiRfvNTOMVmHekxXDx", "mSFT9RRrXvwMopXmiPZPCr2wOXnrbbBH8H7ZWBqF");

window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({
        appId      : '1383839455240707',
        status     : true, // check Facebook Login status
        cookie     : true, // enable cookies to allow Parse to access the session
        xfbml      : true,
        version    : 'v2.1'
    });

    // Run code after the Facebook SDK is loaded.
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/pt_BR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function LoginFacebookParse(){
    if(!Parse.User.current()){
        var permissions = "public_profile,email";
        Parse.FacebookUtils.logIn(permissions, {
            success: function(user) {
                FB.api('/me', function(response) {
                    var user = Parse.User.current();
                    var query = new Parse.Query("User");
                    query.equalTo("idFacebook", response.id);
                    query.first({
                        success: function (usuario) {
                            usuario.set("email", response.email);
                            usuario.set("urlPicture", "https://graph.facebook.com/"+response.id+"/picture");
                            usuario.set("nomeCompleto", response.name);
                            usuario.set("urlFacebook", response.link);
                            usuario.set("idFacebook", response.id);
                            usuario.save(null, {
                                success: function(res){
                                    if(!usuario.get("habilitado")){
                                        console.log("Usuário não habilitado para o sistema.");
                                        parent.location='unauthorized.html';
                                    }else{
                                        localStorage.setItem("User", JSON.stringify(UsuarioContract.setUsuarioFront(usuario)));
                                        parent.location='views/htmls/masterpage.html';
                                    }
                                },
                                error: function(res, error){
                                    console.log("Ocorreu um erro: "+error);
                                }
                            })
                        },
                        error: function (usuario, error) {
                            console.log("Ocorreu um erro: " + error);
                        }
                    });
                });
            },
            error: function(user, error) {
                console.log("O usuário cancelou o login do Facebook ou não autorizar totalmente.");
            }
        });
    }else{
        var user = Parse.User.current()
        var query = new Parse.Query("User");
        query.equalTo("idFacebook", user.get("authData").facebook.id);
        query.first({
            success: function(usuario) {
                if(!usuario.get("habilitado")){
                    console.log("Usuário não habilitado para o sistema.")
                    parent.location='unauthorized.html';
                }else{
                    localStorage.setItem("User", JSON.stringify(UsuarioContract.setUsuarioFront(usuario)));
                    parent.location='views/htmls/masterpage.html';
                }
            },
            error: function(res, error) {
                console.log("Ocorreu um erro: "+error);
            }
        });

    }
}