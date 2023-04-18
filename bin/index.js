#!/usr/bin/env node
const { spawnSync } = require('child_process'),
      systemDialog = require('@cailiao/system-dialog'),
      args = process.argv.slice(2)
var message = '项目依赖已修改！请重新安装依赖： npm run install',
    customFiles = ['package.json', 'package-lock.json'],
    status

args.forEach(arg => {
  message = arg.match(/^-message=(.+)$/)?.[1] ?? message
  customFiles = arg.match(/^-files=(.+)$/)?.[1]?.split(',') ?? customFiles
})

try {
  ({ status } = spawnSync('git', ['diff', 'HEAD^', 'HEAD', '--exit-code', '--', ...customFiles], {
    cwd: process.cwd(),
    encoding: 'utf-8'
  }))
} catch {}

if (status) systemDialog({ info: '', text: message })
