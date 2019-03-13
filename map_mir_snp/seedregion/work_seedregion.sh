#!/bin/bash

cd /home/fux/fux/miRNASNP3/data/dbsnp/VCF
bedfiles=$(ls x*.bed)
for bed in ${bedfiles};do
	bedtools coverage -a /home/fux/fux/miRNASNP3/data/miRbase/remap_ncbi/grch38p12.seedregion.bed -b ${bed} > ${bed}.seedregion.coverage 
done

coveragefile=$(ls *.seedregion.coverage)
for coverage in ${coveragefile};do
	awk '$5>0{print $0}' ${coverage} >${coverage}.filter
done

mv *.seedregion.coverage.filter /home/fux/fux/miRNASNP3/map_mir_snp/seedregion/
 
