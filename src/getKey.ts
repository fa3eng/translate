import * as fs from 'fs'
import * as ps from 'path'

const filePath = ps.resolve(__dirname, 'key', 'key.json')

interface KeyType {
  keyApp: string
  key: string
}

const writeData = (keyApp: string, key: string): undefined => {
  const jsonKey = JSON.stringify({
    keyApp,
    key
  })

  fs.writeFile(filePath, jsonKey, (error) => {
    if (error != null) return console.error(error)

    console.log('设置成功!')
  })

  return undefined
}

const readData = async (): Promise<KeyType> => {
  return await new Promise<KeyType>((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
      if (error != null) reject(error)

      try {
        const json: KeyType = JSON.parse(data.toString())
        resolve(json)
      } catch {
        reject(new Error('请先设置 APPkey 与 key'))
      }
    })
  })
}

export { writeData, readData }
