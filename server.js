const mongojs = require('mongojs')
const db = mongojs('mydb', ['templates'])
const templates = db.collection('templates')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(port)

app.get('/template', (req, res) => {
  templates.find({ }, (err, docs) => res.send(docs))
})

app.post('/template/update', (req, res) => {
  templates.drop(() => 
    templates.insert({ 
      template: req.body, 
      created_at: new Date().toJSON(), 
    }, (err, docs) => res.send(docs))
  )
})

app.post('/template/drop', (req, res) => {
  templates.drop(() => res.send('CAIU CARAI'))
})