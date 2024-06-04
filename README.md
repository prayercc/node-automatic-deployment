# node-automatic-deployment
> node脚本简单实现多项目自动化部署，参考[项目](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Faotianwinter%2Fauto-deploy-app)
# 简介
普通的人工部署通常有以下几个步骤：

1. 把打包后的文件进行压缩
2. 通过ftp工具上传服务器指定位置
3. 将以前的网站文件进行备份处理
4. 解压上传后的压缩包

本次脚本也将按照这四个步骤进行自动处理。根据需求选取了以下几个包进行辅助开发：

1. [archiver](https://www.npmjs.com/package/archiver) 处理本地文件压缩
2. [node-ssh](https://www.npmjs.com/package/node-ssh) 连接服务器，并执行远程命令
3. [inquirer](https://www.npmjs.com/package/inquirer) 提供命令行选项，实现项目选择



# 目录结构介绍：
- utils 
    - compressFile.js  负责本地文件压缩
    - handleCommand.js 执行远程命令
    - helper.js  提供命令行选项
    - ssh.js  连接服务器
    - uploadFile.js 上传文件
- config.js 部署配置文件
- main.js 主程序入口文件
