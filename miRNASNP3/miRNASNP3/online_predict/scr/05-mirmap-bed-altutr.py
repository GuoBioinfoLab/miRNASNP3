import sys,re,json

with open(sys.argv[2],"a") as out:
    temp_json={}
    with open(sys.argv[1]) as infile:
        for line in infile:
            if line.startswith('hsa'):
                nline=line.strip().split()
                site_end=int(nline[2])
                site_start=site_end-int(nline[3])
                newline=nline[0]+'\t'+str(site_start)+'\t'+str(site_end)
                out.write(newline+'\n')
                lkey=nline[0]+'_'+str(site_start)+'_'+str(site_end)
                if lkey in temp_json.keys():
                    temp_json[lkey].append(line.strip())
                else:
                    temp_json[lkey]=[line.strip()]
with open(sys.argv[3],"a") as outj:
    json.dump(temp_json,outj)
            