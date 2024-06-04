function runCommand(ssh,command,path) {
    return new Promise((resolve,reject) => {
        ssh.execCommand(command, {
            cwd: path
          }).then((res) => {
            if (res.stderr) {
              console.error('命令执行发生错误:' + res.stderr)
              reject()
              process.exit()
            } else {
              console.log(command + ' 执行完成！')
              resolve()
            }
          })
    })
}
module.exports = runCommand