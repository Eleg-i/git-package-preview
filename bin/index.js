#!/usr/bin/env node

const { execSync } = require('child_process'),
      systemDialog = require('@cailiao/system-dialog'),
      args = process.argv.slice(2),
      result = execSync('git diff --name-only ORIG_HEAD HEAD', { cwd: __dirname, encoding: 'utf-8' }),
      files = result.split('\n')
var message = '项目依赖已修改！请重新安装依赖： npm run install',
    customFiles = ['package.json', 'package-lock.json']

files.forEach(file => file.replace('\r', ''))

args.forEach(arg => {
  message = arg.match(/^-message=(\S+)$/)?.[1] ?? message
  customFiles = arg.match(/^-files=(\S+)$/)?.[1]?.split(',') ?? customFiles
})

customFiles.some(customFile => {
  if (files.find(file => new RegExp(customFile).test(file))) {
    systemDialog({ info: '', text: message })

    return true
  }
})
