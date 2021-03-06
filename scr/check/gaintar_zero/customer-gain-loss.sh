#!/usr/bin/bash

#用于预测不同miRNA序列的靶点差异

#wild_mir_seq=CCUGCUGGUCAGGAGUGGAUACUG #hsa-miR-3692-5p
#alt_mir_seq=CCUGCUAGUCAGGAGUGGAUACUG #one of rs185691679 's alt

#test hsa-miR-4472_rs11068023
wild_mir_seq=GGUGGGGGGUGUUGUUUU
alt_mir_seq=GGGGGGGGGUGUUGUUUU

#be sure base_path exist
base_path=/home/fux/fux/miRNASNP3/online_predict/test_single

#to store temp tgs file with filename tmp.tgs.txt
echo "check tmp directory ..."
tmp_path=${base_path}/tmp
[ ! -d ${tmp_path} ] && mkdir ${tmp_path}
#[ "$(ls -A ${tmp_path})" ] && rm ${tmp_path}/*  
tgs_utr_file=/home/fux/fux/miRNASNP3/data/genome/total_grch38_over6.autosome.longest.tgs.txt #there are 18206 transcripts

echo "check result directory ..."
result_path=${base_path}/predict_result
[ ! -d ${result_path} ] && mkdir ${result_path}
#[ "$(ls -A ${result_path})" ] && rm ${result_path}/*
#[ "$(ls -A ${result_path})" ] && rm ${result_path}/*


wild_mirmap_result=${result_path}/wild_mirmap_result.txt
alt_mirmap_result=${result_path}/alt_mirmap_result.txt
wild_tgs_result=${result_path}/wild_tgs_result.txt
alt_tgs_result=${result_path}/alt_tgs_result.txt

wild_mirmap_table=${result_path}/wild_mirmap_table.txt
alt_mirmap_table=${result_path}/alt_mirmap_table.txt

wild_tgs_bed=${result_path}/wild_tgs_result.bed
wild_tgs_bed_sort=${result_path}/wild_tgs_result.bed.sort
alt_tgs_bed=${result_path}/alt_tgs_result.bed
alt_tgs_bed_sort=${result_path}/alt_tgs_result.bed.sort
wild_mirmap_bed=${result_path}/wild_mirmap_result.bed
wild_mirmap_bed_sort=${result_path}/wild_mirmap_result.bed.sort
alt_mirmap_bed=${result_path}/alt_mirmap_result.bed
alt_mirmap_bed_sort=${result_path}/alt_mirmap_result.bed.sort

#predict info json
wild_mm_bed_json=${result_path}/wild_mirmap_bed.json
alt_mm_bed_json=${result_path}/alt_mirmap_bed.json

wild_tgs_gene=${result_path}/wild_tgs.gene
wild_mirmap_gene=${result_path}/wild_mirmap.gene
alt_tgs_gene=${result_path}/alt_tgs.gene
alt_mirmap_gene=${result_path}/alt_mirmap.gene

wt_unin_wm_gene=${result_path}/wt_unin_wm_gene
st_unin_sm_gene=${result_path}/st_unin_sm_gene

wt_intersect_wm=${result_path}/wt_intersec_wm
st_intersect_sm=${result_path}/st_intersect_sm
wt_intersect_wm_clear=${result_path}/wt_intersect_wm_clear
st_intersect_sm_clear=${result_path}/st_intersect_sm_clear

loss_site=${result_path}/loss_site.txt
gain_site=${result_path}/gain_site.txt

scr_mirmap=/home/fux/fux/github/miRNASNP3/scr/mirmap_predict/run_mirmap.py
scr_targetscan=/home/fux/fux/miRNASNP3/TargetScan/targetscan_70.pl
scr_gettable=/home/fux/fux/github/miRNASNP3/scr/check/03-getTable.py
scr_tgs_bed=/home/fux/fux/github/miRNASNP3/scr/check/04-tgs-bed.py
scr_mm_bed=/home/fux/fux/github/miRNASNP3/scr/check/05-mirmap-bed.py
scr_gl=/home/fux/fux/github/miRNASNP3/scr/check/06-loss-gain.py

echo "execute mirmap prediction for wildseq ..."
#predict wildseq's target with mirmap
#python2 ${scr_mirmap} ${wild_mir_seq} ${wild_mirmap_result}
echo "wm done"

#predict wildseq's target with targetscan
seed=${wild_mir_seq:1:7}
echo -e "wildmirseq\t${seed}\t9606">${tmp_path}/tmp.wild.tgs.txt
echo "execute targetscan prediction for wildseq ..."
#${scr_targetscan} ${tmp_path}/tmp.wild.tgs.txt ${tgs_utr_file} ${wild_tgs_result}
echo "wt done"

#predict altseq's targets with mirmap
echo "execute mirmap prediction for altseq ..."
#python2 ${scr_mirmap} ${alt_mir_seq} ${alt_mirmap_result}
echo "sm done"

#predict altdeq's targets with targetscan
seed=${alt_mir_seq:1:7}
echo -e "altmirseq\t${seed}\t9606">${tmp_path}/tmp.alt.tgs.txt
echo "execute targetscan prediction for altseq ..."
#${scr_targetscan} ${tmp_path}/tmp.alt.tgs.txt ${tgs_utr_file} ${alt_tgs_result}
echo "st done"

#get table from mirmap result
echo "parse mirmap prediction result ..."
#python ${scr_gettable} ${wild_mirmap_result} ${wild_mirmap_table}
#python ${scr_gettable} ${alt_mirmap_result} ${alt_mirmap_table}
echo "done"

#bed file of wt wm st sm
echo "convert predition result to bed format ..."
#python ${scr_tgs_bed} ${wild_tgs_result} ${wild_tgs_bed}
#python ${scr_tgs_bed} ${alt_tgs_result} ${alt_tgs_bed}
#python ${scr_mm_bed} ${wild_mirmap_table} ${wild_mirmap_bed} ${wild_mm_bed_json}
#python ${scr_mm_bed} ${alt_mirmap_table} ${alt_mirmap_bed} ${alt_mm_bed_json}
echo "done"

#gene of wt wm st sm
echo "extract gene from prediction file" 
#sed '1d' ${wild_tgs_result}|cut -d'#' -f3|sort -u>${wild_tgs_gene}
#sed '1d' ${alt_tgs_result}|cut -d'#' -f3|sort -u >${alt_tgs_gene}
#sed '1d' ${wild_mirmap_table}|cut -d'#' -f3|sort -u >${wild_mirmap_gene}
#sed '1d' ${alt_mirmap_table}|cut -d'#' -f3|sort -u>${alt_mirmap_gene}
echo "done"

#bed sort
echo "sort bed files ..."
#bedtools sort -i ${wild_mirmap_bed}>${wild_mirmap_bed_sort}
#bedtools sort -i ${wild_tgs_bed} >${wild_tgs_bed_sort}
#bedtools sort -i ${alt_mirmap_bed}>${alt_mirmap_bed_sort}
#bedtools sort -i ${alt_tgs_bed}>${alt_tgs_bed_sort}
echo "done"

#bed intersect
echo "bedtools intersect ..."
#bedtools intersect -sorted -a ${wild_mirmap_bed_sort} -b ${wild_tgs_bed_sort} -wa -wb -u>${wt_intersect_wm}
#bedtools intersect -sorted -a ${alt_mirmap_bed_sort} -b ${alt_tgs_bed_sort} -wa -wb -u>${st_intersect_sm}
echo "done"

#gene unin target
echo "get unin genes ..."
#cat ${wild_mirmap_gene} ${wild_tgs_gene}|sort -u >${wt_unin_wm_gene}
#cat ${alt_mirmap_gene} ${alt_tgs_gene}|sort -u >${st_unin_sm_gene}
echo "done"

#clear intersect
echo "clear intersect files ..." 
#awk '$4==$8{print $0}' ${wt_intersect_wm}>${wt_intersect_wm_clear}
#awk '$4==$8{print $0}' ${st_intersect_sm}>${st_intersect_sm_clear}
echo "done"

#gain loss site info
echo "caculate loss target information ..."
echo "python ${scr_gl} ${wt_intersect_wm_clear} ${loss_site} ${wild_mm_bed_json} ${st_unin_sm_gene}"
echo "caculate gain target information ..."
echo "python ${scr_gl} ${st_intersect_sm_clear} ${gain_site} ${alt_mm_bed_json} ${wt_unin_wm_gene}"
echo "done"
echo "check result in ${result_path}"
#report



