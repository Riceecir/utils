const os = require('os')

/* 获取IP地址(ipv4) */
const getIpAddress = function () {
  const networkInterfaces = os.networkInterfaces()
  for (const i in networkInterfaces) {
    const faces = networkInterfaces[i]
    let stop = false
    for (const j in faces) {
      const item = faces[j]
      if (item.address !== '127.0.0.1' && item.family.toLocaleLowerCase() === 'ipv4') {
        ip = item.address
        stop = true
        break
      }
    }
  
    if (stop) break
  }
}