/**
 * Created by rafae_000 on 17/11/2014.
 */

var AvaliaControllers = angular.module("AvaliaControllers", []);

AvaliaControllers.controller("DashboardController", ['$scope','$http', function($scope, $http)
    {
        console.log("DASHBOARD:");
        console.log($scope);
    }]
);

AvaliaControllers.controller("CarometroController", ['$scope','$http', function($scope, $http)
    {
        var turma = globalScope().turmaSelecionada;

        if(turma.Alunos.length) {
            if (!turma.Alunos[0].id) {
                var listaAlunos = new Array();
                turma.Alunos.forEach(function(idAluno, indice){
                    PessoaBusiness.getAluno(idAluno, function(alunoRes){
                        listaAlunos.push(alunoRes);
                        if(turma.Alunos.length == indice+1){
                            globalScope().turmaSelecionada.Alunos = listaAlunos;
                            globalScope().atualizarEscopo();
                        }
                    });
                });
            }
            globalScope().atualizarEscopo();
        }else{
            globalScope().atualizarEscopo();
        }
    }]
);