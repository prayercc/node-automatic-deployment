const { NodeSSH } = require('node-ssh')
const sshServer = new NodeSSH()
function connectServer(sshConfig) {
    console.log('---开始连接服务器')
    return new Promise((resolve,reject) => {
        sshServer.connect({...sshConfig}).then(()=>{
            console.log('------' + sshConfig.host + ' 连接成功')
            resolve()
        }).catch((err) => {
            console.error('------' + sshConfig.host + ' 连接失败', err)
            reject()
        })
    })
}
module.exports = {
    connectServer,
    sshServer
}