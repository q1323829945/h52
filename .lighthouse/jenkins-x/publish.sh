#!/bin/bash
###
 # @Author: lizheng2 lizheng2@sunline.cn
 # @Date: 2022-12-19 10:18:13
 # @LastEditors: lizheng2 lizheng2@sunline.cn
 # @LastEditTime: 2022-12-19 10:18:24
 # @FilePath: \jx3-pipeline-catalog\packs\javascript-ui-nginx\.lighthouse\jenkins-x\publish.sh
 # @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
### 
# https://registry.npmjs.org/ npm
# https://packages.aliyun.com/xxxx/npm/npm-registry/ aliyun

while getopts ":r:u:p:" opt; do
        case $opt in
                r) registry="$OPTARG"
                ;;
                u) username="$OPTARG"
                ;;
                p) password="$OPTARG"
                ;;
        esac
done

params='{"name": "'$username'", "password": "'$password'" }'

# echo $params

loginResult=$(curl -s \
  -H "Accept: application/json" \
  -H "Content-Type:application/json" \
  -X PUT --data "$params" \
  "$registry-/user/org.couchdb.user:$username"
)

tokenVal=$loginResult
if [[ $tokenVal == *token* ]]
then
  tokenVal=${tokenVal#*token\":\"}
  tokenVal=${tokenVal/\"\}/}
  echo "login success!!"
else
  echo "login fail!"
  echo $loginResult
fi

authRegistryPath=${registry/https:\/\//}
npm set registry $registry 
npm set //$authRegistryPath:_authToken=$tokenVal 

#echo $tokenVal
#echo "//$authRegistryPath:_authToken=$tokenVal"

npm publish --registry $registry 