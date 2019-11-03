const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')


const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cookieParser())

// app.use(multipart({
//   uploadDir: path.resolve(__dirname, 'upload-file')
// }))

const router = express.Router()

registerSimpleRouter()
registerBaseRouter()

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})


function registerSimpleRouter () {
  router.get('/simple/get', function(req, res) {
    res.json({
      msg: `hello world`
    })
  })
}

function registerBaseRouter () {
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })

  router.post('/base/post', function(req, res) {
    // 这里req.body是空的
    // 因为Content-Type默认是text/plain，表示接收字符串，而请求的是data是对象，所以不显示
    res.json(req.body)
  })

  router.post('/base/buffer', function(req, res) {
    let msg = []
    req.on('data', (chunk) => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}
