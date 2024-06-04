/**
 * 配置项介绍
 * 
 * name 项目名称
 * ssh node-ssh插件相关配置项
 * sourceDir 需要部署的源文件目录
 * sourceFile 源文件名称
 * openBackUp 是否开启服务器备份
 */
const config = [
    {
        name: '项目1', //选项名称
        ssh: { //node-ssh配置项
            host: 'ip',
            port: 22,
            username: 'username',
            password: 'password',
            // privateKey: 'C:/Users/prayer/.ssh/id_rsa', // ssh私钥(不使用此方法时请勿填写， 注释即可)
            // passphrase: '' // ssh私钥对应解密密码(不存在设为''即可)
        },
        sourceDir: 'C:/Users/prayer/Desktop/projects/prayer/personal-space/', // 目标目录
        sourceFile: 'dist',//文件名称
        openBackUp: true, // 是否开启远端备份
        deployDir: '/var/www/', // 远端目录
        releaseDir: 'html' // 发布目录
    },
    {
        name: '项目2',
        ssh: {
            host: 'ip',
            port: 22,
            username: 'username',
            password: 'password',
            // privateKey: 'C:/Users/prayer/.ssh/id_rsa', // ssh私钥(不使用此方法时请勿填写， 注释即可)
            // passphrase: '' // ssh私钥对应解密密码(不存在设为''即可)
        },
        sourceDir: 'C:/Users/prayer/Desktop/auto-display/', // 目标文件
        sourceFile: 'dist',
        openBackUp: true, // 是否开启远端备份
        deployDir: '/var/www/', // 远端目录
        releaseDir: 'demo2' // 发布目录
    }
]

module.exports = config