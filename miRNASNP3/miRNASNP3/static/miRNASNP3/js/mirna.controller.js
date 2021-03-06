'use strict';

angular.module('miRNASNP3')
    .controller('MirnaController', MirnaController);

function MirnaController($scope,$routeParams,$http,$filter,$document,miRNASNP3Service) {
    console.log("MirnaController loaded");

    function up(x,y){return x[1]-y[1]}
    $scope.error = 0;

    var page=1;
    var base_url = miRNASNP3Service.getAPIBaseUrl();

    $("[data-toggle='popover']").popover();
    $scope.query_mirna = $routeParams.mirna_id;
    console.log($routeParams.mirna_id);
    $scope.clear = function () {
        $scope.one = 0;
        $scope.two = 0;
        $scope.three = 0;
        $scope.four = 0;
        $scope.five = 0;
        $scope.six = 0;
    };
    $scope.one = 1;
    $scope.show_one = function (refer) {
        console.log(refer);
        $scope.clear();
        if (refer == "one") {
            $scope.one = 1;
            $scope.class_one = "ative";
        }
        if (refer == "two") {
            $scope.two = 1;
            $scope.class_two = "ative";
        }
        if (refer == "three") {
            $scope.three = 1;
            $scope.class_three = "ative";
        }
        if (refer == "four") {
            $scope.four = 1;
            $scope.class_four = "ative"
        }
        if (refer == "five") {
            $scope.five = 1;
            $scope.class_five = "ative"
        }
        if (refer == "six") {
            $scope.six = 1;
            $scope.class_six = "ative";
        }
    };
    function distinct(a) {
        let arr = a
        let result = []
        let obj = {}
        for (let i of arr) {
            if (!obj[i]) {
                result.push(i)
                obj[i] = 1
            }
        }
        return result
        }
    $scope.enrich_clear=function(){
        $scope.enrich_dot=0;
        $scope.enrich_cnet=0;
        $scope.enrich_emap=0;
        $scope.enrich_table=0;
    }
    $scope.show_enrich=function(refer){
        $scope.enrich_clear();
        if(refer=="enrich_dot"){
            $scope.enrich_dot=1;
            $scope.class_enrich_dot="active";
        }
        if(refer=="enrich_cnet"){
            $scope.enrich_cnet=1;
            $scope.class_enrich_cnet="active";
        }
        if(refer=="enrich_emap"){
            $scope.enrich_emap=1;
            $scope.class_enrich_emap="active";
        }
        if(refer=="enrich_table"){
            $scope.enrich_table=1;
            $scope.class_enrich_table="active";
        }
    }
    $scope.fetch_mirna_details = function () {
        $http({
           url:base_url+'/api/mirinfo',
           // url:base_url+'/api/mirinfo',
            method: 'GET',
            params: {search_ids: $scope.query_mirna}
        }).then(
            function (response) {
                console.log(response);
                $scope.mirna_summary_list = response.data.mirna_summary_list;
                $scope.mirna_summary_count=response.data.mirna_summary_count;
                /*var indel_in_seed=0
                var indel_in_mature=0
                for(var i=0;i<$scope.mirna_summary_list.length;i++){
                    indel_in_seed+=Number($scope.mirna_summary_list[i].indel_in_seed)
                    indel_in_mature+=Number($scope.mirna_summary_list[i].indel_in_mature)
                }*/
                var snp_in_seed=0
                var snp_in_mature=0
                var drv_in_seed=0
                var drv_in_mature=0
                for(var i=0;i<$scope.mirna_summary_list.length;i++){
                    snp_in_seed+=Number($scope.mirna_summary_list[i].snp_in_seed)
                    snp_in_mature+=Number($scope.mirna_summary_list[i].snp_in_mature)
                    drv_in_seed+=Number($scope.mirna_summary_list[i].drv_in_seed)
                    drv_in_mature+=Number($scope.mirna_summary_list[i].drv_in_mature)
                    //mutation_in_seed+=$scope.mirna_summary_list[i].clinvar_in_seed+$scope.mirna_summary_list[i].cosmic_in_seed
                    //mutation_in_mature+=$scope.mirna_summary_list[i].clinvar_in_mature+$scope.mirna_summary_list[i].cosmic_in_mature
                }
                if($scope.mirna_summary_list.length>1){
                    $scope.mirna_table=1
                }else{
                    $scope.mirna_table=0
                }
                $scope.mirna_summary_alias=$scope.mirna_summary_list[0]
                $scope.mirna_summary_alias.snp_in_seed=snp_in_seed
                $scope.mirna_summary_alias.snp_in_mature=snp_in_mature
                $scope.mirna_summary_alias.drv_in_seed=drv_in_seed
                $scope.mirna_summary_alias.drv_in_mature=drv_in_mature
                //$scope.mirna_summary_alias.variation_in_seed=mutation_in_seed
                //$scope.mirna_summary_alias.variation_in_mature=mutation_in_mature
            });
    };
    $scope.fetch_mirna_details();

    $scope.fetch_mirna_drug=function(){
        $scope.mirna_drug_show=1
        $http({
            url:base_url+'/api/mirdrug',
            method:'GET',
            params:{mature_id:$scope.query_mirna}
        }).then(function(response){
            console.log(response)
            $scope.mirna_ccle={}
            $scope.mirna_nci60=response.data.nci60_list
            $scope.nci60_count=response.data.nci60_count
            if(($scope.mirna_nci60.length)==0){
                $scope.mirna_drug_show=0
            }else{
               /* if($scope.mirna_ccle.length!=0){
                    $scope.mirna_ccle_show=1;
                    var dataset=$scope.mirna_ccle
                    for (var i=0;i<dataset.length;i++){
                        dataset[i].cor=Number(dataset[i].cor).toFixed(3)
                        if(Number(dataset[i].pv).toFixed(3)==0.000){
                            dataset[i].pv=Number(dataset[i].pv).toExponential(3)
                        }else{
                            dataset[i].pv=Number(dataset[i].pv).toFixed(3)
                        }
                        if(Number(dataset[i].fdr).toFixed(3)==0.000){
                            dataset[i].fdr=Number(dataset[i].fdr).toExponential(3)
                        }else{
                            dataset[i].fdr=Number(dataset[i].fdr).toFixed(3)
                        }
                    }
                    $scope.mirna_ccle=dataset
                }*/
                if($scope.mirna_nci60.length!=0){
                    $scope.mirna_nci60_show=1;
                    var dataset=$scope.mirna_nci60
                    for (var i=0;i<dataset.length;i++){
                        dataset[i].cor=Number(dataset[i].cor).toFixed(3)
                        if(Number(dataset[i].pv).toFixed(3)==0.000){
                            dataset[i].pv=Number(dataset[i].pv).toExponential(3)
                        }else{
                            dataset[i].pv=Number(dataset[i].pv).toFixed(3)
                        }
                        if(Number(dataset[i].fdr).toFixed(3)==0.000){
                            dataset[i].fdr=Number(dataset[i].fdr).toExponential(3)
                        }else{
                            dataset[i].fdr=Number(dataset[i].fdr).toFixed(3)
                        }
                    }
                    $scope.mirna_nci60=dataset
                }
            }
        })
    }
    $scope.fetch_mirna_drug()

    $scope.downFile=function(content, filename){
        // 创建隐藏的可下载链接
        var eleLink = document.createElement('a');
        eleLink.download = filename+"_cor_with_drug";
        eleLink.style.display = 'none';
        var df_content=[]
        for (var i=0;i<content.length;i++){
            df_content[i]={}
            df_content[i]['drug_name'] = content[i]['drug_name'][0]['drug_name']
            df_content[i]['pubchem_id'] = content[i]['pubchem']
            df_content[i]['nsc_id'] = content[i]['NSC']
            df_content[i]['fda_status'] = content[i]['drug_name'][0]['fda_status']
            df_content[i]['pearson_corr'] = content[i]['cor']
            df_content[i]['fdr'] = content[i]['fdr']
        }
        // 字符内容转变成blob地址
        //var blob = new Blob(content);
        var blob = new Blob([JSON.stringify(df_content, null, 2)], {type : 'application/json'});
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    }

    $scope.fetch_mirna_expression=function(expression_type){
        $scope.mirna_expression_show=1;
        $http({
           url:base_url+'/api/mirna_expression',
           // url:base_url+'/api/mirna_expression',
            method:'GET',
            params:{mirna_id:$scope.query_mirna}
        }).then(function (response){
            console.log(response);
            $scope.mirna_expression=response.data.mirna_expression_list[0];
            $scope.mirna_expression_count=response.data.mirna_expression_count;
            $scope.mirna_expression_show=1
            if($scope.mirna_expression_count==0){
                $scope.mirna_expression_show=0
            }else if(Number($scope.mirna_expression.exp_mean)==0){
                $scope.mirna_expression_show=0
            }
            /*console.log($scope.mirna_expression.exp_mean)
            var temp;
            var value;
            var array=[];
            var r,g,b;
            temp=$scope.mirna_expression.exp_df;
            console.log($scope.mirna_expression_show)
            for (var key in temp) {
                value=Number(temp[key])
                if(value!=0){
                if(min_value){
                    if(value<min_value){
                        min_value=value
                    }
                }else{
                    var min_value= value
                }
                if(max_value){
                    if (value>max_value){
                        max_value=value
                    }
                }else{
                    var max_value=value
                }
                }}
            console.log(min_value)
            console.log(max_value)
            var w= max_value-min_value
            console.log(w)
            for (var key in temp) {
                if(w==0){
                    r=255
                    g=255
                    b=0
                    }else{
                    value=Number(temp[key])
                    if(value<w/2){
                        r = Math.floor((510/w)*(value-min_value));
                        g = 255
                    }else{
                        r = 255;
                        g = Math.floor((510/w)*(max_value-value))
                    }
                    b = 0;
                }
                    var p = "rgb("+r+","+g+","+b+")";
                    if (Number(temp[key])!=0){
                        array.push({"cancer_type":key,"expression":temp[key],"color":p})
                    }
                }
            
                console.log(array);
                $scope.mirna_profile = array;*/
                if($scope.mirna_expression_show==1){

                    echarts.init(document.getElementById('mirna_expression')).dispose();
                    var myChart = echarts.init(document.getElementById('mirna_expression'));
                    var series_list=[]
                    
            //console.log($scope.gene_expression);
                var mirna_expr = $scope.mirna_expression.exp_df;
               // $scope.exp_item=title;
                
                var cancer_types=['cancer_type'];
                var expr=['RSEM'];
               
                for(var cancer in mirna_expr){
                    var source_data={}
                    var labelOption={}
                    if(mirna_expr[cancer]&&Number(mirna_expr[cancer])!=0){
                        labelOption = {
                            normal: {
                                show: true,
                                position: 'top',
                                distance: 5,
                                align: 'left',
                                verticalAlign: 'middle',
                                rotate: 90,
                                formatter:'{name|{a}}',
                                fontSize: 8,
                                rich: {
                                    name: {
                                        color:'#000000',
                                        textBorderColor: '#000000'
                                    }
                                }
                            }
                        };
                        source_data['data']=[mirna_expr[cancer]]
                        series_list.push(source_data)
                        cancer_types.push(cancer)
                        expr.push(mirna_expr[cancer])
                        source_data['label']=labelOption;
                        source_data['name']=cancer;
                        source_data['type']='bar';
                        source_data['barGap']=0.2;
                        source_data['barWidth']=21
                    }
                    
                }
                //source_data_expr.sort(up)
                console.log(series_list)
                
                myChart.setOption({
                    //dataset:{
                    //    source:[cancer_types,expr]
                    //},
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show:false},
                           
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name:'RSEM',
                            nameTextStyle:{
                                align:'left',
                                fontSize:12,
                                fontWeight:'bold',
                            }}
                        ],
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: series_list,
                        color: ['#600000','#ff79bc','#930093','#b15bff','#000093','#46a3ff','#005757','#1afd9c','#007500',
                                '#b7ff4a','#737300','#ffdc35','#ff8000','#ff9d6f','#984b4b','#c2c287','#408080','5a5aad',
                                '#6c3365','	#ff5151','#820041','#ff00ff','#3a006f','#0000c6','#66b3ff','#00a600','#ce0000',
                                '#b15bff','#00db00','#796400','#004b97','#f9f900','#bb3d00'],
                        tooltip: {
                            trigger: 'item',
                            axisPointer: {
                                type: 'shadow'
                            },
                        },
                        series: series_list,
                        grid:{
                            x:45,
                            y:35,
                            x2:30,
                            y2:20,
                            borderWidth:1,
                            containLabel:true
                           },
                    })
                }
        })
    };
    $scope.fetch_mirna_expression();

    $scope.downFile_target=function(content, filename){
        // 创建隐藏的可下载链接
        var eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        var df_content=[]
        for (var i=0;i<content.length;i++){
            df_content[i]={}
            df_content[i]['mirna_id'] = content[i]['mirna_id']
            df_content[i]['gene_symbol'] = content[i]['gene_symbol']
            df_content[i]['snp_id'] = content[i]['snp_id']
            df_content[i]['gene_acc'] = content[i]['utr_info']['acc']
            df_content[i]['snp_chromosome'] = content[i]['snp_info']['chr']
            df_content[i]['snp_position'] = content[i]['snp_info']['position']
            df_content[i]['snp_ref'] = content[i]['snp_info']['ref']
            if(content[i]['snp_info']['curalt']){
                df_content[i]['snp_alt'] = content[i]['snp_info']['curalt']
            }else{
                df_content[i]['snp_alt'] = content[i]['snp_info']['alt']
            }
            if(content[i]['gene_expression'].length>0){
                df_content[i]['gene_expression_mean'] = content[i]['gene_expression'][0]['exp_mean']

            }else{
                df_content[i]['gene_expression_mean'] = 'null'
            }
            if(content[i]['mirna_expression'].length>0){
                df_content[i]['mirna_expression_mean'] = content[i]['mirna_expression'][0]['exp_mean']

            }else{
                df_content[i]['mrina_expression_mean'] = 'null'
            }
            if(content[i]['corelation_detail']&&content[i]['corelation_detail'].length>0){
                df_content[i]['correlation'] = content[i]['corelation_detail'][0]
            }
            df_content[i]['mirmap_start'] = content[i]['site_info']['mm_start']
            df_content[i]['mirmap_end'] = content[i]['site_info']['mm_end']
            df_content[i]['tgs_start'] = content[i]['site_info']['tgs_start']
            df_content[i]['tgs_end'] = content[i]['site_info']['tgs_end']
            df_content[i]['mm_dg_duplex'] = content[i]['site_info']['dg_duplex']
            df_content[i]['mm_dg_binding'] = content[i]['site_info']['dg_binding']
            df_content[i]['mm_dg_open'] = content[i]['site_info']['dg_open']
            df_content[i]['mm_tgs_score'] = content[i]['site_info']['tgs_score']
            df_content[i]['mm_tgs_au'] = content[i]['site_info']['tgs_au']
            df_content[i]['prob_exac'] = content[i]['site_info']['prob_exac']
        }
        // 字符内容转变成blob地址
        //var blob = new Blob(content);
        var blob = new Blob([JSON.stringify(df_content, null, 2)], {type : 'application/json'});
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    }

    $scope.downFile_target_mut=function(content, filename){
        // 创建隐藏的可下载链接
        var eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        var df_content=[]
        for (var i=0;i<content.length;i++){
            df_content[i]={}
            df_content[i]['mirna_id'] = content[i]['mirna_id']
            df_content[i]['gene_symbol'] = content[i]['gene_symbol']
            df_content[i]['mut_id'] = content[i]['mut_id']
            df_content[i]['gene_acc'] = content[i]['utr_info']['acc']
            df_content[i]['mut_chromosome'] = content[i]['mut_info']['chr']
            df_content[i]['mut_position'] = content[i]['mut_info']['position']
            df_content[i]['mut_ref'] = content[i]['mut_info']['ref']
            if(content[i]['mut_info']['curalt']){
                df_content[i]['mut_alt'] = content[i]['mut_info']['curalt']
            }else{
                df_content[i]['mut_alt'] = content[i]['mut_info']['alt']
            }
            if(content[i]['gene_expression'].length>0){
                df_content[i]['gene_expression_mean'] = content[i]['gene_expression'][0]['exp_mean']

            }else{
                df_content[i]['gene_expression_mean'] = 'null'
            }
            if(content[i]['mirna_expression'].length>0){
                df_content[i]['mirna_expression_mean'] = content[i]['mirna_expression'][0]['exp_mean']

            }else{
                df_content[i]['mrina_expression_mean'] = 'null'
            }
            if(content[i]['corelation_detail']&&content[i]['corelation_detail'].length>0){
                df_content[i]['correlation'] = content[i]['corelation_detail'][0]
            }
            df_content[i]['mirmap_start'] = content[i]['site_info']['mm_start']
            df_content[i]['mirmap_end'] = content[i]['site_info']['mm_end']
            df_content[i]['tgs_start'] = content[i]['site_info']['tgs_start']
            df_content[i]['tgs_end'] = content[i]['site_info']['tgs_end']
            df_content[i]['mm_dg_duplex'] = content[i]['site_info']['dg_duplex']
            df_content[i]['mm_dg_binding'] = content[i]['site_info']['dg_binding']
            df_content[i]['mm_dg_open'] = content[i]['site_info']['dg_open']
            df_content[i]['mm_tgs_score'] = content[i]['site_info']['tgs_score']
            df_content[i]['mm_tgs_au'] = content[i]['site_info']['tgs_au']
            df_content[i]['prob_exac'] = content[i]['site_info']['prob_exac']
        }
        // 字符内容转变成blob地址
        //var blob = new Blob(content);
        var blob = new Blob([JSON.stringify(df_content, null, 2)], {type : 'application/json'});
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    }


    $scope.fetch_target_gain = function (page) {
        console.log("fetch target gain!")
        console.log(page)
        //console.log($scope.query_mirna);
        var flag=0;
                var query_gene_gain = $.trim($('#search_gene_gain').val());
                console.log(query_gene_gain)
                if (/[@#\$%\^&\*<>\.\\\/\(\)]+/g.test(query_gene_gain)) {
                    alert("Invalid input");
                    flag = 1;
                    history.back();
                }
                if(flag==0){
            $http({
               url:base_url+'/api/snp_seed_gain',
               // url:base_url+'/api/snp_seed_gain',
                method: 'GET',
                params: {mirna_id: $scope.query_mirna,page:page,gene:query_gene_gain}
                }).then(
                    function (response) {
                        console.log(response);
                        console.log("snp in seed target")
                        $scope.snp_seed_gain_list = response.data.snp_seed_gain_list;
                        $scope.snp_seed_gain_count=response.data.snp_seed_gain_count;
                        var site_array=$scope.snp_seed_gain_list
                        for(var i=0;i<site_array.length;i++){
                            if(site_array[i].expr_corelation){
                                site_array[i].expr_corelation=Number(site_array[i].expr_corelation).toFixed(2)
                            }
                            if(site_array[i].utr_info.acc.length>1){
                                var deduplicate_arr=distinct(site_array[i].utr_info.acc)
                                site_array[i].utr_info.acc=deduplicate_arr
                            }
                            site_array[i].site_info.dg_binding=Number(site_array[i].site_info.dg_binding).toFixed(2)
                            site_array[i].site_info.dg_duplex=Number(site_array[i].site_info.dg_duplex).toFixed(2)
                            site_array[i].site_info.dg_open=Number(site_array[i].site_info.dg_open).toFixed(2)
                            site_array[i].site_info.prob_exac=Number(site_array[i].site_info.prob_exac).toFixed(2)
                            site_array[i].site_info.tgs_score=Number(site_array[i].site_info.tgs_score).toFixed(2)
                            site_array[i].site_info.tgs_au=Number(site_array[i].site_info.tgs_au).toFixed(2)
                    }
                    })
                }
        }
    $scope.fetch_target_gain(page);

    
        //console.log(query_item);
        $(document).ready(function(){
            var flag=0;
            console.log($scope.currentPage_gain)
            $('#search_gene_gain').on('input propertychange', function() {
                $scope.currentPage_gain=1;
                var query_gene_gain = $.trim($('#search_gene_gain').val());
                console.log(query_gene_gain)
                if (/[@#\$%\^&\*<>\.\\\/\(\)]+/g.test(query_gene_gain)) {
                    alert("Invalid input");
                    flag = 1;
                    history.back();
                }
                if(flag==0){
                    console.log(query_gene_gain)
                    $http({
                       url:base_url+'/api/snp_seed_gain',
                       // url:base_url+'/api/snp_seed_gain',
                        method: 'GET',
                        params: {mirna_id: $scope.query_mirna,page:1,gene:query_gene_gain}
                        }).then(
                            function (response) {
                                console.log(response);
                                $scope.snp_seed_gain_list = response.data.snp_seed_gain_list;
                                $scope.snp_seed_gain_count=response.data.snp_seed_gain_count+1;
                                var site_array=$scope.snp_seed_gain_list
                                for(var i=0;i<site_array.length;i++){
                                    if(site_array[i].expr_corelation){
                                        site_array[i].expr_corelation=Number(site_array[i].expr_corelation).toFixed(2)
                                    }
                                    if(site_array[i].utr_info.acc.length>1){
                                        var deduplicate_arr=distinct(site_array[i].utr_info.acc)
                                        site_array[i].utr_info.acc=deduplicate_arr
                                    }
                                    site_array[i].site_info.dg_binding=Number(site_array[i].site_info.dg_binding).toFixed(2)
                                    site_array[i].site_info.dg_duplex=Number(site_array[i].site_info.dg_duplex).toFixed(2)
                                    site_array[i].site_info.dg_open=Number(site_array[i].site_info.dg_open).toFixed(2)
                                    site_array[i].site_info.prob_exac=Number(site_array[i].site_info.prob_exac).toFixed(2)
                                    site_array[i].site_info.tgs_score=Number(site_array[i].site_info.tgs_score).toFixed(2)
                                    site_array[i].site_info.tgs_au=Number(site_array[i].site_info.tgs_au).toFixed(2)
                            }
                            })
                }
            });
          });
          
          $scope.echart_correlation=function(cor){
            $scope.gene_mir=cor.mir_gene.split('_')[0]+" correlates with "+cor.mir_gene.split('_')[1]+" across 33 cancer types in TCGA.";
            var c=echarts;
            c.init(document.getElementById('correlation')).dispose();
            var cor_echart=c.init(document.getElementById('correlation'));
            var source_data=[]
            //var source_data=[["cancer_types", "correlation"]]
            //cor.cor_df.sort(up)
            console.log(cor.cor_df)
            for(var cancer in cor.cor_df){
                if(cor.cor_df[cancer]){
                    var item=[cancer,Number(cor.cor_df[cancer])]
                    source_data.push(item)
                }
            }
            source_data.sort(up)
            source_data.unshift(["cancer_types", "correlation"])
            console.log(source_data)
           
            var option = {
                dataset: {
                    source:source_data
                },
               
                xAxis:{name:'Correlation',
                min:-1,
                max:1,
                nameTextStyle:{
                    align:'right',
                    fontSize:12,
                    fontWeight:'bold',
                },
                type:'value',
                splitLine:{
                    show:false
                    　　}
                },
                yAxis:{
                    type:'category',
                axisLine:{
                    show:true
                },
                
                /*splitLine:{
                    show:false
                    　　}*/},
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
               /* toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        mark: {show: true},
                        //dataView: {show: true, readOnly: false},
                        //magicType: {show: true, type: ['line', 'bar']},
                        //restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },*/
            color:'#0000c6',
            
            series: [
                {
                 type: 'bar',
                    encode: {
                    x:'correlation',
                    y:'cancer_types' 
                },
                barWidth:10,
                barGap:2
            }],
    };
            cor_echart.setOption(option)
        }

    

        $scope.modal_gene_expression=function(exp){ 
            echarts.init(document.getElementById('gene_expression')).dispose();
            var myChart = echarts.init(document.getElementById('gene_expression'));
            var series_list=[]
            $scope.gene_expression=exp[0];
        //console.log($scope.gene_expression);
            var gene_expr = $scope.gene_expression.exp_df;
           // $scope.exp_item=title;
            
            var cancer_types=['cancer_type'];
            var expr=['RSEM'];
           
            for(var cancer in gene_expr){
                var source_data={}
                var labelOption={}
                if(gene_expr[cancer]&&Number(gene_expr[cancer])!=0){
                    labelOption = {
                        normal: {
                            show: true,
                            position: 'top',
                            distance: 5,
                            align: 'left',
                            verticalAlign: 'middle',
                            rotate: 90,
                            formatter:'{name|{a}}',
                            fontSize: 8,
                            rich: {
                                name: {
                                    color:'#000000',
                                    textBorderColor: '#000000'
                                }
                            }
                        }
                    };
                    source_data['data']=[gene_expr[cancer]]
                    series_list.push(source_data)
                    cancer_types.push(cancer)
                    expr.push(gene_expr[cancer])
                    source_data['label']=labelOption;
                    source_data['name']=cancer;
                    source_data['type']='bar';
                    source_data['barGap']=0.2;
                    source_data['barWidth']=23
                }
                
            }
            //source_data_expr.sort(up)
            console.log(series_list)
            
            myChart.setOption({
                //dataset:{
                //    source:[cancer_types,expr]
                //},
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {show:false},
                       
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name:'RSEM',
                        nameTextStyle:{
                            align:'left',
                            fontSize:12,
                            fontWeight:'bold',
                        }}
                    ],
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series: series_list,
                    color: ['#600000','#ff79bc','#930093','#b15bff','#000093','#46a3ff','#005757','#1afd9c','#007500',
                            '#b7ff4a','#737300','#ffdc35','#ff8000','#ff9d6f','#984b4b','#c2c287','#408080','5a5aad',
                            '#6c3365','	#ff5151','#820041','#ff00ff','#3a006f','#0000c6','#66b3ff','#00a600','#ce0000',
                            '#b15bff','#00db00','#796400','#004b97','#f9f900','#bb3d00'],
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    series: series_list,
                    grid:{
                        x:45,
                        y:35,
                        x2:30,
                        y2:20,
                        borderWidth:1
                       },
                });
        };
    var RULE1={
        'A':'U',
        'T':'A',
        'C':'G',
        'G':'C',
        'N':'N'
    }

    $scope.modal_gain_site=function(site){
        $scope.modal_header="Target gain";
        $scope.target_gain=1;
        $scope.target_loss=0;
		$scope.modal_site=site;
		var align8=site.site_info.align8;
		var distance=align8.length-site.snp_info.distance-1;
		$scope.align8_pre=align8.substring(0,distance);
        $scope.align8_letter=align8[distance];
        $scope.align8_later=align8.substring(distance+1,align8.length);
        }
    $scope.modal_loss_site=function(site){
        $scope.modal_header="Target loss";
        $scope.target_gain=0;
        $scope.target_loss=1;
		$scope.modal_site=site;
        var align8=site.site_info.align8;
        var align7=site.site_info.align7;
        console.log(align7)
        var distance=align8.length-site.snp_info.distance-1;
        $scope.align8_pre=align8.substring(0,distance);
        if(site.strand=='-'){
            $scope.align8_letter=RULE1[site.snp_info.curalt];
        }else{
            $scope.align8_letter=site.snp_info.curalt;
        }
       
        $scope.align8_later=align8.substring(distance+1,align8.length);
        $scope.align7_pre=align7.substring(0,distance);
        console.log($scope.align7_pre)
        $scope.align7_letter='X';
        $scope.align7_later=align7.substring(distance+1,align7.length);
        }

   $scope.fetch_target_loss = function (page) {
    var flag=0
    var query_gene_loss = $.trim($('#search_gene_loss').val());
    console.log(query_gene_loss)
    if (/[@#\$%\^&\*<>\.\\\/\(\)]+/g.test(query_gene_loss)) {
        alert("Invalid input");
        flag = 1;
        history.back();
    }
    if(flag==0){
            $http({
               url:base_url+'/api/snp_seed_loss',
               // url:base_url+'/api/snp_seed_loss',
                method: 'GET',
                params: {mirna_id: $scope.query_mirna,page:page,gene:query_gene_loss}
            }).then(
                function (response) {
                    console.log(response);
                    $scope.snp_seed_loss_list = response.data.snp_seed_loss_list;
                    $scope.snp_seed_loss_count = response.data.snp_seed_loss_count;
                    var site_array=$scope.snp_seed_loss_list
                    for(var i=0;i<site_array.length;i++){
                        site_array[i].has_cor=1
                        if(site_array[i].expr_corelation){
                            console.log(site_array[i].expr_corelation)
                            if(site_array[i].expr_corelation=='Not significant'){site_array[i].expr_corelation="0.00"}
                            else{site_array[i].expr_corelation=Number(site_array[i].expr_corelation).toFixed(2)}
                        }
                        if(site_array[i].gene_expression[0]){
                            if(Number(site_array[i].gene_expression[0].exp_mean)==0){site_array[i].gene_expression[0]=0;site_array[i].has_cor=0} 
                        }else{site_array[i].has_cor=0}
                        if(site_array[i].utr_info.acc.length>1){
                            var deduplicate_arr=distinct(site_array[i].utr_info.acc)
                            site_array[i].utr_info.acc=deduplicate_arr
                        }
                        site_array[i].site_info.dg_binding=Number(site_array[i].site_info.dg_binding).toFixed(2)
                        site_array[i].site_info.dg_duplex=Number(site_array[i].site_info.dg_duplex).toFixed(2)
                        site_array[i].site_info.dg_open=Number(site_array[i].site_info.dg_open).toFixed(2)
                        site_array[i].site_info.prob_exac=Number(site_array[i].site_info.prob_exac).toFixed(2)
                        site_array[i].site_info.tgs_score=Number(site_array[i].site_info.tgs_score).toFixed(2)
                        site_array[i].site_info.tgs_au=Number(site_array[i].site_info.tgs_au).toFixed(2)
                    }
                    
                });
            }
        }
       
    $scope.fetch_target_loss(page);

    $(document).ready(function(){
        var flag=0;
        $('#search_gene_loss').on('input propertychange', function() {
            $scope.currentPage_loss=1
            var query_gene_loss = $.trim($('#search_gene_loss').val());
            console.log(query_gene_loss)
            if (/[@#\$%\^&\*<>\.\\\/\(\)]+/g.test(query_gene_loss)) {
                alert("Invalid input");
                flag = 1;
                history.back();
            }
            if(flag==0){
                $http({
                   url:base_url+'/api/snp_seed_loss',
                   // url:base_url+'/api/snp_seed_loss',
                    method: 'GET',
                    params: {mirna_id: $scope.query_mirna,page:page,gene:query_gene_loss}
                }).then(
                    function (response) {
                        console.log(response);
                        $scope.snp_seed_loss_list = response.data.snp_seed_loss_list;
                        $scope.snp_seed_loss_count = response.data.snp_seed_loss_count+1;
                        var site_array=$scope.snp_seed_loss_list
                        for(var i=0;i<site_array.length;i++){
                            site_array[i].has_cor=1
                            if(site_array[i].expr_corelation){
                                if(site_array[i].expr_corelation=='Not significant'){site_array[i].expr_corelation="0.00"}
                                else{site_array[i].expr_corelation=Number(site_array[i].expr_corelation).toFixed(2)}
                                }
                            if(site_array[i].gene_expression[0]){
                                if(Number(site_array[i].gene_expression[0].exp_mean)==0){site_array[i].gene_expression[0]=0;site_array[i].has_cor=0} 
                            }else{site_array[i].has_cor=0}
                            if(site_array[i].utr_info.acc.length>1){
                                var deduplicate_arr=distinct(site_array[i].utr_info.acc)
                                site_array[i].utr_info.acc=deduplicate_arr
                            }
                            site_array[i].site_info.dg_binding=Number(site_array[i].site_info.dg_binding).toFixed(2)
                            site_array[i].site_info.dg_duplex=Number(site_array[i].site_info.dg_duplex).toFixed(2)
                            site_array[i].site_info.dg_open=Number(site_array[i].site_info.dg_open).toFixed(2)
                            site_array[i].site_info.prob_exac=Number(site_array[i].site_info.prob_exac).toFixed(2)
                            site_array[i].site_info.tgs_score=Number(site_array[i].site_info.tgs_score).toFixed(2)
                            site_array[i].site_info.tgs_au=Number(site_array[i].site_info.tgs_au).toFixed(2)
                        }
                    });
            }
        });
      });

   /* $scope.modal_corelation_detail=function(cor){
        var cancer_count=0;
        var cor_sum=0;
        for(var cancer in cor.cor_df){
            if(cor.cor_df[cancer]){
                cancer_count+=1;
                cor_sum+=Number(cor.cor_df[cancer])
            }
        }
        //$scope.corelation=(cor_sum/cancer_count).toFixed(2);
        $scope.gene_mir=cor.mir_gene;
        console.log($scope.gene_mir)
        var temp;
        var temp_cor;
        var value;
        var array=[];
        var r,g,b;
        temp=cor.cor_df;
            for (var key in temp) {
                if (temp[key]){
                    if(temp[key]>0){
                        temp_cor=Number(temp[key]).toFixed(2)
                    }
                    else{
                        temp_cor=Number(temp[key]*(-1)).toFixed(2)*(-1)
                    }
                    value=Number(temp_cor)+1
                    //console.log(value)
                    r=Math.floor(value*255)/2
                    g=255-r
                    b = 0;
                    var p = "rgb("+r+","+g+","+b+")";
                    array.push({"cancer_type":key,"corelation":temp_cor,"color":p})
                    }
                }
           // console.log(array);
            $scope.corelation_detail = array; 
    }*/


    $scope.modal_gain_site_mut=function(site){
        $scope.modal_header="Target gain";
        $scope.target_gain=1;
        $scope.target_loss=0;
		$scope.modal_site=site;
		var align8=site.site_info.align8;
		var distance=align8.length-site.mut_info.distance-1;
		$scope.align8_pre=align8.substring(0,distance);
        $scope.align8_letter=align8[distance];
        $scope.align8_later=align8.substring(distance+1,align8.length);
        }
    $scope.modal_loss_site_mut=function(site){
        $scope.modal_header="Target loss";
        $scope.target_gain=0;
        $scope.target_loss=1
		$scope.modal_site=site;
        var align8=site.site_info.align8;
        var align7=site.site_info.align7;
        var distance=align8.length-site.mut_info.distance-1;
        $scope.align8_pre=align8.substring(0,distance);
        if(site.strand=='-'){
            $scope.align8_letter=RULE1[site.mut_info.curalt];
        }else{
            $scope.align8_letter=site.mut_info.curalt;
        }
        $scope.align8_later=align8.substring(distance+1,align8.length);
        $scope.align7_pre=align7.substring(0,distance);
        console.log($scope.align7_pre)
        $scope.align7_letter='X';
        $scope.align7_later=align7.substring(distance+1,align7.length);
        }

    $scope.fetch_target_gain_mut = function (page) {
        var flag=0
        console.log($scope.query_mirna);
        var query_gene_gain = $.trim($('#search_gene_gain_mut').val());
            console.log(query_gene_gain)
            if (/[@#\$%\^&\*<>\.\\\/\(\)]+/g.test(query_gene_gain)) {
                alert("Invalid input");
                flag = 1;
                history.back();
            }
            if(flag==0){
    	$http({
           url:base_url+'/api/mut_seed_gain',
           // url:base_url+'/api/mut_seed_gain',
			method: 'GET',
			params: {mirna_id: $scope.query_mirna,page:page,gene:query_gene_gain}
            }).then(
                function (response) {
                    console.log(response);
                    $scope.mut_seed_gain_list = response.data.mut_seed_gain_list;
                    $scope.mut_seed_gain_count=response.data.mut_seed_gain_count;
                    var site_array=$scope.mut_seed_gain_list
                for(var i=0;i<site_array.length;i++){
                    if(site_array[i].expr_corelation){
                        site_array[i].expr_corelation=Number(site_array[i].expr_corelation).toFixed(2)
                    }
                    if(site_array[i].utr_info.acc.length>1){
                        var deduplicate_arr=distinct(site_array[i].utr_info.acc)
                        site_array[i].utr_info.acc=deduplicate_arr
                    }
                    site_array[i].site_info.dg_binding=Number(site_array[i].site_info.dg_binding).toFixed(2)
                    site_array[i].site_info.dg_duplex=Number(site_array[i].site_info.dg_duplex).toFixed(2)
                    site_array[i].site_info.dg_open=Number(site_array[i].site_info.dg_open).toFixed(2)
                    site_array[i].site_info.prob_exac=Number(site_array[i].site_info.prob_exac).toFixed(2)
                    site_array[i].site_info.tgs_score=Number(site_array[i].site_info.tgs_score).toFixed(2)
                    site_array[i].site_info.tgs_au=Number(site_array[i].site_info.tgs_au).toFixed(2)
                    if((/^COSN/).test(site_array[i].mut_id)){site_array[i].mut_url="https://cancer.sanger.ac.uk/cosmic/search?q="+site_array[i].mut_id}
                }
                })
            }
            };
    $scope.fetch_target_gain_mut(page);

    $(document).ready(function(){
        var flag=0;
        $('#search_gene_gain_mut').on('input propertychange', function() {
            $scope.currentPage_mutgain=1
            var query_gene_gain = $.trim($('#search_gene_gain_mut').val());
            console.log(query_gene_gain)
            if (/[@#\$%\^&\*<>\.\\\/\(\)]+/g.test(query_gene_gain)) {
                alert("Invalid input");
                flag = 1;
                history.back();
            }
            if(flag==0){
                console.log(query_gene_gain)
                $http({
                   url:base_url+'/api/snp_seed_gain',
                   // url:base_url+'/api/mut_seed_gain',
                    method: 'GET',
                    params: {mirna_id: $scope.query_mirna,page:page,gene:query_gene_gain}
                    }).then(
                        function (response) {
                            console.log(response);
                            $scope.mut_seed_gain_list = response.data.mut_seed_gain_list;
                            $scope.mut_seed_gain_count=response.data.mut_seed_gain_count+1;
                            var site_array=$scope.mut_seed_gain_list
                            for(var i=0;i<site_array.length;i++){
                                if(site_array[i].expr_corelation){
                                    site_array[i].expr_corelation=Number(site_array[i].expr_corelation).toFixed(2)
                                }
                                if(site_array[i].utr_info.acc.length>1){
                                    var deduplicate_arr=distinct(site_array[i].utr_info.acc)
                                    site_array[i].utr_info.acc=deduplicate_arr
                                }
                                site_array[i].site_info.dg_binding=Number(site_array[i].site_info.dg_binding).toFixed(2)
                                site_array[i].site_info.dg_duplex=Number(site_array[i].site_info.dg_duplex).toFixed(2)
                                site_array[i].site_info.dg_open=Number(site_array[i].site_info.dg_open).toFixed(2)
                                site_array[i].site_info.prob_exac=Number(site_array[i].site_info.prob_exac).toFixed(2)
                                site_array[i].site_info.tgs_score=Number(site_array[i].site_info.tgs_score).toFixed(2)
                                site_array[i].site_info.tgs_au=Number(site_array[i].site_info.tgs_au).toFixed(2)
                                if((/^COSN/).test(site_array[i].mut_id)){site_array[i].mut_url="https://cancer.sanger.ac.uk/cosmic/search?q="+site_array[i].mut_id}
                        }
                        })
            }
        });
      });

    $scope.fetch_target_loss_mut = function (page) {
        var flag=0
        var query_gene_loss = $.trim($('#search_gene_loss_mut').val());
            console.log(query_gene_loss)
            if (/[@#\$%\^&\*<>\.\\\/\(\)]+/g.test(query_gene_loss)) {
                alert("Invalid input");
                flag = 1;
                history.back();
            }
            if(flag==0){
    	$http({
           url:base_url+'/api/mut_seed_loss',
           // url:base_url+'/api/mut_seed_loss',
			method: 'GET',
			params: {mirna_id: $scope.query_mirna,page:page,gene:query_gene_loss}
            }).then(
                function (response) {
                    console.log(response);
                    $scope.mut_seed_loss_list = response.data.mut_seed_loss_list;
                    $scope.mut_seed_loss_count=response.data.mut_seed_loss_count;
                    var site_array=$scope.mut_seed_loss_list
                for(var i=0;i<site_array.length;i++){
                        site_array[i].has_cor=1
                        if(site_array[i].expr_corelation){
                            if(site_array[i].expr_corelation=='Not significant'){site_array[i].expr_corelation="0.00"}
                            else{site_array[i].expr_corelation=Number(site_array[i].expr_corelation).toFixed(2)}
                        }
                        if(site_array[i].gene_expression[0]){
                            if(Number(site_array[i].gene_expression[0].exp_mean)==0){site_array[i].gene_expression[0]=0;site_array[i].has_cor=0} 
                        }else{site_array[i].has_cor=0}
                        if(site_array[i].utr_info.acc.length>1){
                            var deduplicate_arr=distinct(site_array[i].utr_info.acc)
                            site_array[i].utr_info.acc=deduplicate_arr
                        }
                    site_array[i].site_info.dg_binding=Number(site_array[i].site_info.dg_binding).toFixed(2)
                    site_array[i].site_info.dg_duplex=Number(site_array[i].site_info.dg_duplex).toFixed(2)
                    site_array[i].site_info.dg_open=Number(site_array[i].site_info.dg_open).toFixed(2)
                    site_array[i].site_info.prob_exac=Number(site_array[i].site_info.prob_exac).toFixed(2)
                    site_array[i].site_info.tgs_score=Number(site_array[i].site_info.tgs_score).toFixed(2)
                    site_array[i].site_info.tgs_au=Number(site_array[i].site_info.tgs_au).toFixed(2)
                    if((/^COSN/).test(site_array[i].mut_id)){site_array[i].mut_url="https://cancer.sanger.ac.uk/cosmic/search?q="+site_array[i].mut_id}
                }
                })
            }
            };
    $scope.fetch_target_loss_mut(page);

    $(document).ready(function(){
        var flag=0;
        $('#search_gene_loss_mut').on('input propertychange', function() {
            $scope.currentPage_mutloss=1
            var query_gene_loss = $.trim($('#search_gene_loss_mut').val());
            console.log(query_gene_loss)
            if (/[@#\$%\^&\*<>\.\\\/\(\)]+/g.test(query_gene_loss)) {
                alert("Invalid input");
                flag = 1;
                history.back();
            }
            if(flag==0){
                console.log(query_gene_loss)
                $http({
                   url:base_url+'/api/snp_seed_gain',
                   // url:base_url+'/api/mut_seed_loss',
                    method: 'GET',
                    params: {mirna_id: $scope.query_mirna,page:page,gene:query_gene_loss}
                    }).then(
                        function (response) {
                            console.log(response);
                            $scope.mut_seed_loss_list = response.data.mut_seed_loss_list;
                            $scope.mut_seed_loss_count=response.data.mut_seed_loss_count+1;
                            var site_array=$scope.snp_seed_gain_list
                            for(var i=0;i<site_array.length;i++){
                                site_array[i].has_cor=1
                                if(site_array[i].expr_corelation){
                                    if(site_array[i].expr_corelation=='Not significant'){site_array[i].expr_corelation="0.00"}
                                    else{site_array[i].expr_corelation=Number(site_array[i].expr_corelation).toFixed(2)}
                                }
                                if(site_array[i].gene_expression[0]){
                                    if(Number(site_array[i].gene_expression[0].exp_mean)==0){site_array[i].gene_expression[0]=0;site_array[i].has_cor=0} 
                                }else{site_array[i].has_cor=0}
                                if(site_array[i].utr_info.acc.length>1){
                                    var deduplicate_arr=distinct(site_array[i].utr_info.acc)
                                    site_array[i].utr_info.acc=deduplicate_arr
                                }
                                site_array[i].site_info.dg_binding=Number(site_array[i].site_info.dg_binding).toFixed(2)
                                site_array[i].site_info.dg_duplex=Number(site_array[i].site_info.dg_duplex).toFixed(2)
                                site_array[i].site_info.dg_open=Number(site_array[i].site_info.dg_open).toFixed(2)
                                site_array[i].site_info.prob_exac=Number(site_array[i].site_info.prob_exac).toFixed(2)
                                site_array[i].site_info.tgs_score=Number(site_array[i].site_info.tgs_score).toFixed(2)
                                site_array[i].site_info.tgs_au=Number(site_array[i].site_info.tgs_au).toFixed(2)
                                if((/^COSN/).test(site_array[i].mut_id)){site_array[i].mut_url="https://cancer.sanger.ac.uk/cosmic/search?q="+site_array[i].mut_id}
                        }
                        })
            }
        });
      });
    
    $scope.fetch_enrich_result=function(){
        $http({
           url:base_url+'/api/enrich_result',
           // url:base_url+'/api/enrich_result',
            method:'GET',
            params:{mirna_id:$scope.query_mirna}
        }).then(function (response) {
            console.log(response);
            $scope.enrich_result_list=response.data.enrich_result_list;
            $scope.enrich_result_count=response.data.enrich_result_count;
            var data_list=$scope.enrich_result_list
            for(var j=0;j<data_list.length;j++){
                for(var i=0;i<data_list[j].csv_table.length;i++){
                    //data_list[j].csv_table[i].pvalue_fix=Number(data_list[j].csv_table[i].pvalue).toExponential(3)
                    //data_list[j].csv_table[i].qvalue_fix=Number(data_list[j].csv_table[i].qvalue).toExponential(3)
                    //data_list[j].csv_table[i].padjust_fix=Number(data_list[j].csv_table[i].padjust).toExponential(3)
                    if((/^rs/).test(data_list[j].variation_id)){
                        data_list[j].variate_url="https://www.ncbi.nlm.nih.gov/snp/?term="+data_list[j].variation_id
                    }else{
                        data_list[j].variate_url="https://cancer.sanger.ac.uk/cosmic/search?q="+data_list[j].variation_id
                    }
                }
            }
        })
    };
    $scope.fetch_enrich_result();
    $scope.enrich_init=function(){
        $scope.show_dot=0;
        $scope.show_cnet=0;
        $scope.show_emap=0;
        $scope.show_table=0;
    }
    $scope.enrich_init()

    $scope.enrichment_view=function(e){
        console.log('enrichment result')
        $scope.enrich_item=e
        $scope.csv_table=e.csv_table
        console.log($scope.csv_table)
        $scope.enrich_clear()
        $scope.show_dot=0;
        $scope.show_cnet=0;
        $scope.show_emap=0;
        $scope.show_table=1;
        $scope.enrich_table=1;
        if(Number(e.go_pathway_count)>5){$scope.show_dot=1}
       
        $('#enrich_table').addClass('active')
        $("#enrich_dot").removeClass('active')
       // if(e.chet_file){$scope.show_cnet=1}
       // if(e.emap_file){$scope.show_emap=1}
        //console.log($scope.enrich_filename)
    }
$scope.premir_sequence=function(v){
    $scope.cur_pre=v
}

/*var base_color={
    'A':'red',
    'U':'yellow',
    'C':'green',
    'G':'blue',
    'indel':'#7A0099'
}

$scope.mirna_let7_7a_3p=[
    {'base':'C','pos':1,'snp_list':[{'snp_id':'snp_1','ref':'C','curalt':'A','color':base_color['A'],'count':'1'}]},
    {'base':'U','pos':2,'snp_list':[]},
    {'base':'A','pos':3,'snp_list':[{'snp_id':'snp_1','ref':'A','curalt':'U','color':base_color['U'],'count':'1'}]},
    {'base':'U','pos':4,'snp_list':[{'snp_id':'snp_2','ref':'T','curalt':'A','color':base_color['A'],'count':'1'}]},
    {'base':'C','pos':5,'snp_list':[{'snp_id':'snp_1','ref':'C','curalt':'A','color':base_color['indel'],'count':'1'},{'count':'2','snp_id':'snp_4','ref':'C','curalt':'G','color':base_color['G']}]}
]*/
$scope.snp_distribution=function(){
    $http({
        url:base_url+'/api/snp_distribute',
        method:'GET',
        params:{mirna_id:$scope.query_mirna}
    }).then(function(response){
        console.log(response)
        $scope.snp_distribute_list=response.data.snp_distribute_list
        $scope.snp_distribute_count=response.data.snp_distribution_count
        var dataset=$scope.snp_distribute_list
        for(var i=0;i<dataset.length;i++){
            if(Number(dataset[i].pos)==-2&&dataset[i].var_list.length==0){
                dataset[i]={}
        }else if(Number(dataset[i].pos)==-2){
            dataset[i].pos=-1
        }
    }
        $scope.snp_distribute_list=dataset
    })
}
$scope.snp_distribution()
}

