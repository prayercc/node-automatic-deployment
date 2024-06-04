const runCommand = require ('./handleCommand');
async function uploadFile(ssh,config) {
    return new Promise((resolve,reject) => {
        console.log('---开始上传文件');
        handleSourceFile(ssh,config);
        //上传文件
        let source = config.sourceDir + config.sourceFile + '.zip';
        let target = config.deployDir + config.sourceFile + '.zip';
        ssh.putFile(source, target).then(() => {
            console.log('------文件上传完成')
            resolve()
        }, (err) => {
            console.log('------文件上传失败',err)
            reject();
            process.exit()
        })
    })
}
//处理之前的文件
async function handleSourceFile(ssh,config) {
    //开启远端备份
    if(config.openBackUp) {
        console.log('------已开启远端备份!');
        //备份文件
        //-d 如果 FILE 存在且是一个目录则返回为真
        await runCommand(
            ssh, 
            `
            if [ -d ${config.releaseDir} ];
            then mv ${config.releaseDir} ${config.releaseDir}_${getCurrentTime()}
            fi
            `,
            config.deployDir);
    } else {
        console.log('------未开启远端备份!');
        //还是放一份到tmp目录
        await runCommand(
            ssh,
            `
            if [ -d ${config.releaseDir} ];
            then mv ${config.releaseDir} /tmp/${config.releaseDir}_${getCurrentTime()}
            fi
            `,
            config.deployDir)
    }
}
// 获取当前时间
function getCurrentTime () {
    const date = new Date
    const yyyy = date.getFullYear()
    const MM = coverEachUnit(date.getMonth() + 1)
    const dd = coverEachUnit(date.getDate())
    const HH = coverEachUnit(date.getHours())
    const mm = coverEachUnit(date.getMinutes())
    const ss = coverEachUnit(date.getSeconds())
    return `${yyyy}-${MM}-${dd}_${HH}:${mm}:${ss}`
  }
  
// 转换时间中一位至两位
function coverEachUnit (val) {
    return val < 10 ? '0' + val : val
}
module.exports = uploadFile