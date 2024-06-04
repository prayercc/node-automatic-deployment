const config = require('./config')
const helper = require('./utils/helper')
const compressFile = require('./utils/compressFile')
const ssh = require('./utils/ssh')
const uploadFile = require ('./utils/uploadFile')
const runCommand = require ('./utils/handleCommand')
//主程序
async function main(){
    try {
        console.log('==================自动部署程序开启==================');
        // 选择项目
        const SELECT_CONFIG = (await helper(config)).type;
        // 压缩文件
        await compressFile(SELECT_CONFIG.sourceDir,SELECT_CONFIG.sourceFile);
        // ssh连接
        await ssh.connectServer(SELECT_CONFIG.ssh);
        // 上传文件
        await uploadFile(ssh.sshServer,SELECT_CONFIG);
        //解压文件
        await runCommand(ssh.sshServer, `unzip ${SELECT_CONFIG.sourceFile}.zip -d ${SELECT_CONFIG.sourceFile}`, SELECT_CONFIG.deployDir) // 解压
        //修改文件
        await runCommand(ssh.sshServer, `mv dist ${SELECT_CONFIG.releaseDir}`, SELECT_CONFIG.deployDir) // 修改文件名称
        //删除压缩文件
        await runCommand(ssh.sshServer, `rm -f ${SELECT_CONFIG.sourceFile}.zip`, SELECT_CONFIG.deployDir) // 删除
    } catch(e) {
        console.log('部署程序出错',e)
    } finally {
        console.log('==================自动部署程序结束==================');
        process.exit();
    }
}
main();