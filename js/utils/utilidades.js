/**
 * Created by rafae_000 on 14/10/2014.
 */

var Utils = (function() {

    return{

        Validacao: {

            cnpj: function (cnpj) {

                var tamanho,
                    numeros,
                    digitos,
                    soma,
                    pos,
                    resultado;

                cnpj = cnpj.replace(/[^\d]+/g, '');

//                if (cnpj === '') {
//                    return false;
//                }

                if (cnpj.length !== 14) {
                    return false;
                }

                if (cnpj === "00000000000000" || cnpj === "11111111111111" || cnpj === "22222222222222" || cnpj === "33333333333333" || cnpj === "44444444444444" || cnpj === "55555555555555" || cnpj === "66666666666666" || cnpj === "77777777777777" || cnpj === "88888888888888" || cnpj === "99999999999999") {
                    return false;
                }

                // Valida DVs
                tamanho = cnpj.length - 2
                numeros = cnpj.substring(0,tamanho);
                digitos = cnpj.substring(tamanho);
                soma = 0;
                pos = tamanho - 7;
                for (var i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--;
                    if (pos < 2)
                        pos = 9;
                }
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(0))
                    return false;

                tamanho = tamanho + 1;
                numeros = cnpj.substring(0,tamanho);
                soma = 0;
                pos = tamanho - 7;
                for (var j = tamanho; j >= 1; j--) {
                    soma += numeros.charAt(tamanho - j) * pos--;
                    if (pos < 2)
                        pos = 9;
                }
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(1))
                    return false;

                return true;

            },

            cpf: function (cpf) {

                cpf = cpf.replace(".", "").replace(".", "").replace("-", "");

                var add = 0, rev = 0;

                if (cpf.length != 11 || cpf === "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999")
                    return false;
                add = 0;
                for (var i = 0; i < 9; i++)
                    add += parseInt(cpf.charAt(i)) * (10 - i);
                rev = 11 - (add % 11);
                if (rev == 10 || rev == 11)
                    rev = 0;
                if (rev != parseInt(cpf.charAt(9)))
                    return false;
                add = 0;
                for (var i = 0; i < 10; i++)
                    add += parseInt(cpf.charAt(i)) * (11 - i);
                rev = 11 - (add % 11);
                if (rev == 10 || rev == 11)
                    rev = 0;
                if (rev != parseInt(cpf.charAt(10)))
                    return false;

                return true;

            },

            certidao: function (registro) {

                var NumDig = 2;
                var LimMult = 32;
                var Mult, Soma, i, n;
                var compareDigit = "";
                registro = registro.replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "")

                if (registro.length != 32 || registro == "" || registro == "00000000000000000000000000000000" || registro == "11111111111111111111111111111111" || registro == "22222222222222222222222222222222" || registro == "33333333333333333333333333333333" || registro == "44444444444444444444444444444444" || registro == "55555555555555555555555555555555" || registro == "66666666666666666666666666666666" || registro == "77777777777777777777777777777777" || registro == "88888888888888888888888888888888" || registro == "99999999999999999999999999999999")
                    return false;

                var compareDigit = registro.substr(registro.length - NumDig, NumDig);
                registro = registro.substr(0, registro.length - NumDig);

                for (n = 1; n <= NumDig; n++) {
                    Soma = 0;
                    Mult = 2;
                    for (i = registro.length - 1; i >= 0; i--) {
                        Soma += (Mult * parseInt(registro.charAt(i)));
                        if (++Mult > LimMult) Mult = 2;
                    }
                    registro += ((Soma * 10) % 11) % 10;
                }
                if (compareDigit == registro.substr(registro.length - NumDig, NumDig)) {
                    return true;
                } else {
                    return false;
                }
            },

            pis: function (pis) {

                var ftap = "3298765432";
                var total = 0;
                var i;
                var resto = 0;
                var numPIS = 0;
                var strResto = "";

                numPIS = pis;
                numPIS = numPIS.replace(".", "").replace(".", "").replace("-", "");

                if (numPIS == "" || numPIS === null || numPIS == "00000000000" || numPIS == "11111111111" || numPIS == "22222222222" || numPIS == "33333333333" || numPIS == "444444444444" || numPIS == "55555555555" || numPIS == "66666666666" || numPIS == "77777777777" || numPIS == "88888888888" || numPIS == "99999999999") {
                    return false;
                }

                for (i = 0; i <= 9; i++) {
                    var resultado = (numPIS.slice(i, i + 1)) * (ftap.slice(i, i + 1));
                    total = total + resultado;
                }

                resto = (total % 11)

                if (resto !== 0) {
                    resto = 11 - resto;
                }

                if (resto == 10 || resto == 11) {
                    strResto = resto + "";
                    resto = strResto.slice(1, 2);
                }

                if (resto != (numPIS.slice(10, 11))) {
                    return false;
                }

                return true;

            },

            titulo: function (inscricao) {
                inscricao = inscricao.replace("/", "");
                if (inscricao == "000000000000" || inscricao == "111111111111" || inscricao == "222222222222" || inscricao == "333333333333" || inscricao == "444444444444" || inscricao == "555555555555" || inscricao == "666666666666" || inscricao == "777777777777" || inscricao == "888888888888" || inscricao == "999999999999") {
                    return false;
                }
                var paddedInsc = inscricao;
                var dig1 = 0;
                var dig2 = 0;

                var tam = paddedInsc.length;
                var digitos = paddedInsc.substr(tam - 2, 2);
                var estado = paddedInsc.substr(tam - 4, 2);
                var titulo = paddedInsc.substr(0, tam - 2);
                var exce = (estado == '01') || (estado == '02');

                dig1 = (titulo.charCodeAt(0) - 48) * 9 + (titulo.charCodeAt(1) - 48) * 8 +
                (titulo.charCodeAt(2) - 48) * 7 + (titulo.charCodeAt(3) - 48) * 6 +
                (titulo.charCodeAt(4) - 48) * 5 + (titulo.charCodeAt(5) - 48) * 4 +
                (titulo.charCodeAt(6) - 48) * 3 + (titulo.charCodeAt(7) - 48) * 2;
                var resto = (dig1 % 11);
                if (resto == 0) {
                    if (exce) {
                        dig1 = 1;
                    } else {
                        dig1 = 0;
                    }
                } else {
                    if (resto == 1) {
                        dig1 = 0;
                    } else {
                        dig1 = 11 - resto;
                    }
                }

                dig2 = (titulo.charCodeAt(8) - 48) * 4 + (titulo.charCodeAt(9) - 48) * 3 + dig1 * 2;
                resto = (dig2 % 11);
                if (resto == 0) {
                    if (exce) {
                        dig2 = 1;
                    } else {
                        dig2 = 0;
                    }
                } else {
                    if (resto == 1) {
                        dig2 = 0;
                    } else {
                        dig2 = 11 - resto;
                    }
                }

                if ((digitos.charCodeAt(0) - 48 == dig1) && (digitos.charCodeAt(1) - 48 == dig2)) {
                    return true;
                } else {
                    return false;
                }

            },

            rg: function (numero) {

                var numero = numero.split(""),
                    tamanho = numero.length,
                    vetor = new Array(tamanho),
                    total = 0,
                    resto = 0,
                    valida = false;

                if (tamanho >= 1) {
                    vetor[0] = parseInt(numero[0]) * 2;
                }
                if (tamanho >= 2) {
                    vetor[1] = parseInt(numero[1]) * 3;
                }
                if (tamanho >= 3) {
                    vetor[2] = parseInt(numero[2]) * 4;
                }
                if (tamanho >= 4) {
                    vetor[3] = parseInt(numero[3]) * 5;
                }
                if (tamanho >= 5) {
                    vetor[4] = parseInt(numero[4]) * 6;
                }
                if (tamanho >= 6) {
                    vetor[5] = parseInt(numero[5]) * 7;
                }
                if (tamanho >= 7) {
                    vetor[6] = parseInt(numero[6]) * 8;
                }
                if (tamanho >= 8) {
                    vetor[7] = parseInt(numero[7]) * 9;
                }
                if (tamanho >= 9) {
                    vetor[8] = parseInt(numero[8]) * 100;
                }

                if (tamanho >= 1) {
                    total += vetor[0];
                }
                if (tamanho >= 2) {
                    total += vetor[1];
                }
                if (tamanho >= 3) {
                    total += vetor[2];
                }
                if (tamanho >= 4) {
                    total += vetor[3];
                }
                if (tamanho >= 5) {
                    total += vetor[4];
                }
                if (tamanho >= 6) {
                    total += vetor[5];
                }
                if (tamanho >= 7) {
                    total += vetor[6];
                }
                if (tamanho >= 8) {
                    total += vetor[7];
                }
                if (tamanho >= 9) {
                    total += vetor[8];
                }

                resto = total % 11;
                if (resto == 0)
                    valida = true;

                return valida;
            },

            email: function(email){
                var check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return check.test(email);
            },

            sus1: function(vlrCNS) {
                // Formulário que contem o campo CNS
                var soma = new Number;
                var resto = new Number;
                var dv = new Number;
                var pis = new String;
                var resultado = new String;
                var tamCNS = vlrCNS.length;
                if ((tamCNS) != 15) {
                    toastr.warning("Numero de CNS invalido");
                    return false;
                }
                pis = vlrCNS.substring(0,11);
                soma = (((Number(pis.substring(0,1))) * 15) +
                ((Number(pis.substring(1,2))) * 14) +
                ((Number(pis.substring(2,3))) * 13) +
                ((Number(pis.substring(3,4))) * 12) +
                ((Number(pis.substring(4,5))) * 11) +
                ((Number(pis.substring(5,6))) * 10) +
                ((Number(pis.substring(6,7))) * 9) +
                ((Number(pis.substring(7,8))) * 8) +
                ((Number(pis.substring(8,9))) * 7) +
                ((Number(pis.substring(9,10))) * 6) +
                ((Number(pis.substring(10,11))) * 5));
                resto = soma % 11;
                dv = 11 - resto;
                if (dv == 11) {
                    dv = 0;
                }
                if (dv == 10) {
                    soma = (((Number(pis.substring(0,1))) * 15) +
                    ((Number(pis.substring(1,2))) * 14) +
                    ((Number(pis.substring(2,3))) * 13) +
                    ((Number(pis.substring(3,4))) * 12) +
                    ((Number(pis.substring(4,5))) * 11) +
                    ((Number(pis.substring(5,6))) * 10) +
                    ((Number(pis.substring(6,7))) * 9) +
                    ((Number(pis.substring(7,8))) * 8) +
                    ((Number(pis.substring(8,9))) * 7) +
                    ((Number(pis.substring(9,10))) * 6) +
                    ((Number(pis.substring(10,11))) * 5) + 2);
                    resto = soma % 11;
                    dv = 11 - resto;
                    resultado = pis + "001" + String(dv);
                } else {
                    resultado = pis + "000" + String(dv);
                }
                if (vlrCNS != resultado) {
                    toastr.warning("Numero de CNS invalido");
                    return false;
                } else {
                    toastr.success("Numero de CNS válido");
                    return true;
                }
            },

            sus2: function ValidaCNS_PROV(Obj) {
                var pis;
                var resto;
                var dv;
                var soma;
                var resultado;
                var result;
                result = 0;

                pis = Obj.substring(0,15);

                if (pis == "")
                {
                    return false
                }

                if ( (Obj.substring(0,1) != "7")  && (Obj.substring(0,1) != "8") && (Obj.substring(0,1) != "9") )
                {
                    toastr.warning("Atenção! Número Provisório inválido!");
                    return false
                }

                soma = (   (parseInt(pis.substring( 0, 1),10)) * 15)
                + ((parseInt(pis.substring( 1, 2),10)) * 14)
                + ((parseInt(pis.substring( 2, 3),10)) * 13)
                + ((parseInt(pis.substring( 3, 4),10)) * 12)
                + ((parseInt(pis.substring( 4, 5),10)) * 11)
                + ((parseInt(pis.substring( 5, 6),10)) * 10)
                + ((parseInt(pis.substring( 6, 7),10)) * 9)
                + ((parseInt(pis.substring( 7, 8),10)) * 8)
                + ((parseInt(pis.substring( 8, 9),10)) * 7)
                + ((parseInt(pis.substring( 9,10),10)) * 6)
                + ((parseInt(pis.substring(10,11),10)) * 5)
                + ((parseInt(pis.substring(11,12),10)) * 4)
                + ((parseInt(pis.substring(12,13),10)) * 3)
                + ((parseInt(pis.substring(13,14),10)) * 2)
                + ((parseInt(pis.substring(14,15),10)) * 1);

                resto = soma % 11;

                if (resto == 0)
                {
                    toastr.success("Numero do SUS validado com Sucesso.");
                    return true;
                }
                else
                {
                    toastr.warning("Atenção! Número Provisório inválido!");
                    return false;
                }
            }

        },

        Mascara: {

            limpar: function (string) {
                var retorno = string.replace(/\D/g, "");
                return retorno;
            },

            addCpf: function (cpf) {
                cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
                cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
                cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
                return cpf
            },

            addCnpj: function (cnpj) {
                cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2")
                cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
                cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2")
                cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2")
                return cnpj
            },

            addTel: function (telefone) {
                telefone = telefone.replace(/^(\d\d)(\d)/g, "($1) $2")
                telefone = telefone.replace(/(\d{4})(\d)/, "$1-$2")
                return telefone;
            },

            addCep: function (cep) {
                cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");
                return cep;
            }

        },

        Conversao: {

            dataBrasil: function (date) {

                if (date) {
                    try {
                        var curr_date = date.getDate();
                        var curr_month = date.getMonth() + 1;
                        var curr_year = date.getFullYear();

                        return curr_date + "/" + curr_month + "/" + curr_year;
                    } catch (e) {
                        alert("Conversao.dataBrasil não conseguiu converter o objeto data");
                    }

                }
                else {
                    alert("Conversao.dataBrasil nao consegue converter objetos nulos");
                }
            },

            dataWebApi: function (data) {
                data = new Date(data);
                return data;
            },

            dataWebApi2: function (data) {
                data = new Date(data);
                data.setUTCHours(3);
                return data;
            },//CPDA

            horaMin: function (date) {
                if (date)
                    return date.getHours().toString() + ":" + date.getMinutes().toString();
                else
                    return "";
            },

            dataHoraBrasil: function (date) {

                if (date) {
                    try {
                        var curr_date = date.getDate();
                        var curr_month = date.getMonth() + 1;
                        var curr_year = date.getFullYear();

                        var curr_hours = date.getHours().toString();
                        var curr_minutes = date.getMinutes().toString();
                        if (curr_hours.length == 1) {
                            curr_hours = "0".concat(curr_hours);
                        }

                        if (curr_minutes.length == 1) {
                            curr_minutes = "0".concat(curr_minutes);
                        }

                        return curr_date + "/" + curr_month + "/" + curr_year + " " + curr_hours + ":" + curr_minutes;
                    } catch (e) {
                        alert("Conversao.dataHoraBrasil não conseguiu converter o objeto data");
                    }
                }
                else {
                    alert("Conversao.dataHoraBrasil nao consegue converter objetos nulos");
                }
            },

            dataDiaMes: function (date) {
                var curr_date = date.getDate();
                var curr_month = date.getMonth() + 1;
                var curr_year = date.getFullYear();

                if (isNaN(curr_date) == true || isNaN(curr_month) == true) {
                    return "-- / --";
                } else {
                    return curr_date + "/" + curr_month;
                }
            }

        },

        ChecarObjeto: {

            nuloVazio: function (obj) {
                for(var campo in obj){
                    return true;
                }
                return false;
            }

        },

        String: {

            escapar: function (stringOriginal) {
                if (stringOriginal == "") {
                    return stringOriginal;
                }
                else {
                    var b = "", palavarasStringOriginal = [], indicePalavraStringOriginal, novasPalavrasString = [], palavraStringOriginal, novaPalavra;
                    if (stringOriginal != undefined && stringOriginal.indexOf('\"') == -1) {
                        palavarasStringOriginal = stringOriginal.split(" ");
                        for (indicePalavraStringOriginal in palavarasStringOriginal) {
                            palavraStringOriginal = palavarasStringOriginal[indicePalavraStringOriginal];
                            if (palavraStringOriginal.charAt(0) === "-") {
                                novaPalavra = "-\"" + palavraStringOriginal.substring(1) + "\"";
                            } else {
                                novaPalavra = "\"" + palavraStringOriginal + "\"";
                            }
                            novasPalavrasString.push(novaPalavra);
                        }
                        return novasPalavrasString.join(" ");
                    }
                    return stringOriginal;
                }
            }

        },

        Clonar: function (objeto) {
            'use strict';
            return JSON.parse(JSON.stringify(objeto));
        },

        Acesso: {
            logout: function (user){
                console.log(user);
                Parse.User.logOut();
            }
        },

        SidebarClose: function(){
            if ($('#wrapper').hasClass('sidebar')){
                $('#wrapper').removeClass('sidebar');
                $('#body-overlay').fadeOut('160');
            }
            //else{
            //    $('#body-overlay').fadeIn('160');
            //    $('#wrapper').addClass('sidebar');
            //}
        },

        validarUnico: function(respAvaliacao){
            switch (respAvaliacao){
                case "1":
                    jQuery("#chkbx1").prop("checked", true);
                    jQuery("#chkbx2").prop("checked", false);
                    jQuery("#chkbx3").prop("checked", false);
                    jQuery("#chkbx4").prop("checked", false);
                    jQuery("#chkbx5").prop("checked", false);
                    break;
                case "2":
                    jQuery("#chkbx1").prop("checked", false);
                    jQuery("#chkbx2").prop("checked", true);
                    jQuery("#chkbx3").prop("checked", false);
                    jQuery("#chkbx4").prop("checked", false);
                    jQuery("#chkbx5").prop("checked", false);
                    break;
                case "3":
                    jQuery("#chkbx1").prop("checked", false);
                    jQuery("#chkbx2").prop("checked", false);
                    jQuery("#chkbx3").prop("checked", true);
                    jQuery("#chkbx4").prop("checked", false);
                    jQuery("#chkbx5").prop("checked", false);
                    break;
                case "4":
                    jQuery("#chkbx1").prop("checked", false);
                    jQuery("#chkbx2").prop("checked", false);
                    jQuery("#chkbx3").prop("checked", false);
                    jQuery("#chkbx4").prop("checked", true);
                    jQuery("#chkbx5").prop("checked", false);
                    break;
                case "5":
                    jQuery("#chkbx1").prop("checked", false);
                    jQuery("#chkbx2").prop("checked", false);
                    jQuery("#chkbx3").prop("checked", false);
                    jQuery("#chkbx4").prop("checked", false);
                    jQuery("#chkbx5").prop("checked", true);
                    break;
                default :
                    break;
            }
        }
    }
})();

