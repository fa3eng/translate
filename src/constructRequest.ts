import { readData } from './getKey'
import { truncate } from './utility'
import * as CryptoJS from 'crypto-js'

const constructRequest = async (
  searchString: string
): Promise<URL | 'error'> => {
  let result
  try {
    result = await readData()
  } catch (error) {
    console.error(error)
    return 'error'
  }

  const appKey = result.keyApp
  const key = result.key
  const query = searchString.toString()
  const salt = new Date().getTime()
  const curTime = Math.round(new Date().getTime() / 1000)
  const from = 'en'
  const to = 'zh-CHS'
  const str1 = `${appKey}${truncate(query)}${salt}${curTime}${key}`
  const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex)

  const params: Record<string, string | number> = {
    q: query,
    from: from,
    to: to,
    curtime: curTime,
    signType: 'v3',
    appKey,
    salt,
    sign
  }

  const url = new URL('https://openapi.youdao.com/api/?')

  for (const index in params) {
    url.searchParams.append(index, params[index].toString())
  }

  return url
}

export { constructRequest }
