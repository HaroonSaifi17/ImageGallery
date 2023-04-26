const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
require('dotenv').config()

const app = express()
const port = 4040
let name

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './images')
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    name = file.fieldname + '-' + uniqueSuffix + ext
    cb(null, name)
  },
})

const upload = multer({ storage: storage })

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
)

app.get('/', (req, res) => {
  try {
    let data = fs.readFileSync('./data.json', { encoding: 'utf8', flag: 'r' })
    res.status(200).send(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
})

app.post('/add', upload.single('image'), async (req, res) => {
  try {
    let data = fs.readFileSync('./data.json', { encoding: 'utf8', flag: 'r' })
    let obj = JSON.parse(data)
    obj.push({ url: name, description: req.body.description })
    data = JSON.stringify(obj)
    fs.writeFileSync('./data.json',data)
    res.status(200).end()
  } catch (err) {
    res.status(500).json(err.message)
  }
})

app.get('/:name', (req, res) => {
  try {
    const name = req.params.name
    res.sendFile(`images/${name}`, { root: './' })
  } catch (err) {
    res.status(500).json(err.message)
  }
})

app.listen(process.env.PORT || port, () => {
  console.log(`Server is listening at http://localhost:${port} `)
})
