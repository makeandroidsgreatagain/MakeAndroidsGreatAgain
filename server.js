const express = require('express')
const app = express()
const bot = require('./bot')
const format = require('string-format')

const invite_link = "https://discordapp.com/api/oauth2/authorize?client_id=451529707557748737&permissions=0&scope=bot"

app.get('/', (req, res) => {
  res.redirect(invite_link)
})

app.listen(process.env.PORT || 6969, () => console.log('Server started!'))
