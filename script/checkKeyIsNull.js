const fs = require('fs')
const ps = require('path')

const path = ps.resolve(process.cwd(), 'src', 'key', 'key.json')

fs.readFile(path, (error, data) => {
  if (error) throw new Error(error)

  if (!data.toString().trim() === '') {
    throw new Error('请在提交代码前删除 key.json 中的内容')
  }
})
