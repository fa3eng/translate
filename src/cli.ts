#!/usr/bin/env node
import * as commander from 'commander'
import { writeData } from './getKey'
import { translate } from './main'

const program = new commander.Command()

program
  .version('0.0.1')
  .name('trans')
  .usage('<English...>')
  .argument('<English...>')
  .action(function (...english) {
    translate(
      english.slice(0, -2).flat().join(' ')
    )
      .then(data => {
        console.log(data)
      })
      .catch(() => {
        console.log()
      })
  })

// 初始化命令, 用于设置app key
program
  .command('init <keyApp> <key>')
  .description('设置有道词典 API 的APP 和 APP key')
  .action(async (keyApp, key) => {
    writeData(keyApp, key)
  })

program.parse(process.argv)
