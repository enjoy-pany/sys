# sys
General system framework for vue

##LOG
### 一、初始化git目录
	1. 生成 ssh-keygen -t rsa -C "xxx.xxx@xx.com" 
	2. cd ~/.ssh
	3. 复制 id_rsa.pub 内容 ==> GitHub -> settings -> ssh and GPG keys -> New ssh key
	4. git clone
	5. cd sys
	6. git checkout -b pany
	
### 二、引入vue-cli
	1. npm/cnpm install -g vue-cli
	2. vue init webpack //在当前项目目录 直接初始化
	3. npm/cnpm i
	4. npm run dev -> runing -> vue-cli done
	5. git add .
	6. git commit -m "init vue cli"
	7. git push origin pany