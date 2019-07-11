"use strict";

angular.module('miRNASNP3', ['ui.bootstrap', 'ngRoute', 'pageslide-directive', 'ui.bootstrap-slider', 'bw.paging','tableSort'])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/static/miRNASNP3/pages/home.html",
                controller: "HomeController"
            })
            .when("/document", {
                templateUrl: "/static/miRNASNP3/pages/document.html",
                controller: "DocumentController"
            })
            .when("/contact", {
                templateUrl: "/static/miRNASNP3/pages/contact.html",
                controller: "ContactController"
            })
            .when("/search",{
                templateUrl:"/static/miRNASNP3/pages/search.html",
                controller:"SearchController"
            })
            .when("/snp",{
                templateUrl:"/static/miRNASNP3/pages/snp.html",
                controller:"SnpController"
            })
            .when("/mirna",{
                templateUrl:"/static/miRNASNP3/pages/mir.html",
                controller:"SearchController"
            })
            .when("/download", {
                templateUrl: "/static/miRNASNP3/pages/download.html",
                controller: "DownloadController"
            })
            .when("/contact", {
                templateUrl: "/static/miRNASNP3/pages/contact.html",
                controller: "ContactController"
            })
            .when("/tools", {
                templateUrl: "/static/miRNASNP3/pages/tools.html",
                controller: "ToolsController"
            })
            .when("/mutation",{
                templateUrl:"/static/miRNASNP3/pages/mutation.html",
                controller:"MutationController"
            })
            .when("/snp",{
                templateUrl:"/static/miRNASNP3/pages/snp.html",
                controller:"SnpController"
            })
            .when("/mirna",{
                templateUrl:"/static/miRNASNP3/pages/mirna.html",
                controller:"MirnaController"
            })
            .when("/mirna_summary",{
                templateUrl:"/static/miRNASNP3/pages/mirna_summary.html",
                controller:"MirSummaryController"
            })
            .when("/primir_summary",{
                templateUrl:"/static/miRNASNP3/pages/primir_summary.html",
                controller:'PrimirSummaryController'
            })
            .when("/premir_detail",{
                templateUrl:"/static/miRNASNP3/pages/premir_detail.html",
                controller:'PremirDetailController'
            })
            .when("/cosmic_summary",{
                templateUrl:"/static/miRNASNP3/pages/cosmic_summary.html",
                controller:"CosmicSummaryController"
            })
            .when("/clinvar_summary",{
                templateUrl:"/static/miRNASNP3/pages/clinvar_summary.html",
                controller:"ClinvarSummaryController"
            })
            .when("/browser",{
                templateUrl:"/static/miRNASNP3/pages/browser.html",
                controller:"BrowserController"
            })
            .when("/browserY",{
                templateUrl:"/static/miRNASNP3/pages/browserY.html",
                controller:"BrowserController"
            })
            .when("/test",{
                templateUrl:"/static/miRNASNP3/lib/fornac/dist/test.html",
            })
            .otherwise({
                redirectTo: "/404.html"
            });
    })
    .config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
    })
.service('miRNASNP3Service',function(){
    this.getAPIBaseUrl=function () {
        return "/miRNASNP"
    }
});
