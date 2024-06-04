const fs = require('fs')
const archiver = require('archiver')
/**
 * 压缩文件
 * @param {*} sourceDir  压缩目录
 * @param {*} sourceFile  压缩文件名称
 */
function compressFile(sourceDir, sourceFile) {
    return new Promise((resolve, reject) => {
        console.log('---检测到本地压缩配置')
        // 第一步，创建可写流来写入数据
        let output = fs.createWriteStream(sourceDir + sourceFile + '.zip');
        const archive = archiver('zip', {zlib: {level: 9}})
        output.on('close', () => {
            resolve(
                console.log('------压缩完成！共计 ' + (archive.pointer() / 1024 / 1024).toFixed(2) + 'MB')
            )
        }).on('error', (err) => {
            reject(console.error('------压缩失败', err))
        })        
        // 第二步，管道连接
        archive.pipe(output) // 管道存档数据到文件
        // 第三步，压缩目录到压缩包中
        archive.directory(sourceDir + sourceFile, false);

        // 第四步，完成压缩
        archive.finalize();
    })
}
module.exports = compressFile