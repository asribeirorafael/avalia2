/*globals module, require */

module.exports = function (grunt) {
    'use strict';

    var fs = require('fs'),
        VERSAO = new Date().getTime(),
        htmlTemplates = '',
        inicializacao = function (proximaAcao) {
            //noinspection JSLint
            //var arquivosDiretorio = fs.readdirSync('./views/templates'),
            //    indiceArquivosDiretorio,
            //    arquivoDiretorio;
            //for (indiceArquivosDiretorio = 0; indiceArquivosDiretorio < arquivosDiretorio.length; indiceArquivosDiretorio++) {
            //    arquivoDiretorio = arquivosDiretorio[indiceArquivosDiretorio];
                //noinspection JSLint
                //htmlTemplates += '\n<script type="text\/ng-template" id="template_' + arquivoDiretorio.replace(/\.(.*)/,'') + '">\n';
                //noinspection JSLint
                //htmlTemplates += fs.readFileSync('./views/templates/' + arquivoDiretorio);
                //htmlTemplates += '\n<\/script>\n';
            //}
            proximaAcao();
        },
        aposInicializacao = function (proximaAcao) {
            //noinspection JSUnresolvedFunction
            grunt.initConfig({
                versao: VERSAO,
                preprocess: {
                    producao: {
                        options: {
                            context: {
                                //templates: htmlTemplates,
                                versao: VERSAO
                            }
                        },
                        files: {
                            'a/index.html': 'views/htmls/index.ejs',
                            'js/business/processados/avaliacao_business_<%= versao %>.js': 'js/business/avaliacao/avaliacao_business.js',
                            'js/business/processados/endereco_business_<%= versao %>.js': 'js/business/endereco/endereco_business.js',
                            'js/business/processados/escola_business_<%= versao %>.js': 'js/business/escola/escola_business.js',
                            'js/business/processados/pessoa_business_<%= versao %>.js': 'js/business/pessoa/pessoa_business.js',
                            'js/business/processados/turma_business_<%= versao %>.js': 'js/business/turma/turma_business.js',
                            'js/contracts/processados/avaliacao_contract_<%= versao %>.js': 'js/contracts/avaliacao_contract.js',
                            'js/contracts/processados/endereco_contract_<%= versao %>.js': 'js/contracts/endereco_contract.js',
                            'js/contracts/processados/escola_contract_<%= versao %>.js': 'js/contracts/escola_contract.js',
                            'js/contracts/processados/pessoa_contract_<%= versao %>.js': 'js/contracts/pessoa_contract.js',
                            'js/contracts/processados/turma_contract_<%= versao %>.js': 'js/contracts/turma_contract.js',
                            'js/utils/processados/eventos_<%= versao %>.js': 'js/utils/eventos.js',
                            'js/utils/processados/routeController_<%= versao %>.js': 'js/utils/routeController.js',
                            'js/utils/processados/utilidades_<%= versao %>.js': 'js/utils/utilidades.js'
                        }
                    }
                },
                shell: {
                    git_add_tudo: {
                        command: 'git add -A'
                    }
                }
            });
            proximaAcao();
        },
        inicializacaoModulos = function () {
            grunt.loadNpmTasks('grunt-preprocess');
            grunt.loadNpmTasks('grunt-contrib-htmlmin');
            grunt.loadNpmTasks('grunt-shell');

            grunt.registerTask('producao', ['preprocess:producao', 'shell:git_add_tudo']);
            grunt.registerTask('default', []);
        };

    inicializacao(function () {
        aposInicializacao(function () {
            inicializacaoModulos();
        });
    });
}
