var dotenv = require('dotenv')
dotenv.load()

var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var stylus = require('stylus')
var hbs = require('hbs')

// set up routes
var index = require('./routes/index')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

var blocks = {}
hbs.registerHelper('extend', function (name, context) {
  var block = blocks[name]
  if (!block) {
    block = blocks[name] = []
  }
  block.push(context.fn(this))
})

hbs.registerHelper('block', function (name) {
  var val = (blocks[name] || []).join('\n')
  blocks[name] = []
  return val
})

hbs.registerHelper('json', function(data) {
  return JSON.stringify(data)
})

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(stylus.middleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules/chart.js/dist')))

app.use('/', index)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
