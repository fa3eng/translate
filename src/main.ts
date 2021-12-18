import * as https from 'https'
import { constructRequest } from './constructRequest'

const translate = async (searchString: string): Promise<undefined> => {
  const url = await constructRequest(searchString)
  if (url === 'error') return

  const request = https.request(url, { method: 'POST' }, res => {
    const chunks: Buffer[] = []

    res.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
    })

    res.on('end', () => {
      const str = Buffer.concat(chunks).toString()
      console.log(JSON.parse(str).basic.explains)
    })
  })

  request.on('error', e => {
    console.error(e)
  })

  request.end()
}

export { translate }
