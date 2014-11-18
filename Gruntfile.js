/*globals module, require */

module.exports = function (grunt) {
    'use strict';

    var fs = require('fs'),
        VERSAO = new Date().getTime(),
        htmlTemplates = '',
        inicializacao = function (proximaAcao) {
            //noinspection JSLint
            var arquivosDiretorio = fs.readdirSync('./views/templates'),
                indiceArquivosDiretorio,
                arquivoDiretorio;
            for (indiceArquivosDiretorio = 0; indiceArquivosDiretorio < arquivosDiretorio.length; indiceArquivosDiretorio++) {
                arquivoDiretorio = arquivosDiretorio[indiceArquivosDiretorio];
                //noinspection JSLint
                htmlTemplates += '\n<script type="text\/ng-template" id="template_' + arquivoDiretorio.replace(/\.(.*)/,'') + '">\n';
                //noinspection JSLint
                htmlTemplates += fs.readFileSync('./views/templates/' + arquivoDiretorio);
                htmlTemplates += '\n<\/script>\n';
            }
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
                                templates: htmlTemplates
                            }
                        },
                        files: {
                            'index.html': 'views/htmls/index.ejs'
                        }
                    }
                },
                htmlmin: {
                    producao: {
                        options: {
                            removeComments: true,
                            collapseWhitespace: true
                        },
                        files: {
                            'cliente/publico/paginas/index.html': 'cliente/publico/paginas/index.html'
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
