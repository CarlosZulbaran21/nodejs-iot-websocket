'use strict'

const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
// const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you sure?'
    }
  ])

  if (!answer.setup) {
    return console.log('Nothing happened :)')
  }
  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'czulbaran',
    password: process.env.DB_PASS || 'admin123',
    host: process.env.DB_HOST || '172.19.0.2',
    dialect: 'postgres',
    logging: (s) => debug(s),
    setup: true
  }
  await db(config).catch(handleFatalError)

  console.log('DB setup')
  process.exit(0)
}

function handleFatalError (err) {
  //   console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.log(`${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
