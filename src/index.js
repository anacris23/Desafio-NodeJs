const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
nunjucks.configure('views', {
  autoscape: true,
  express: app,
  watch: true
})
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')
const checkMiddleware = (req, res, next) => {
  const anos = req.query
  if (!anos) {
    return res.redirect('/')
  }
  return next()
}

app.get('/', (req, res) => res.render('inicio'))
app.get('/maior', checkMiddleware, (req, res) => {
  const { anos } = req.query
  return res.render('maior', { anos })
})
app.get('/menor', checkMiddleware, (req, res) => {
  const { anos } = req.query
  return res.render('menor', { anos })
})
app.post('/check', (req, res) => {
  const { anos } = req.body
  if (anos >= 18) {
    return res.redirect(`/maior?anos=${anos}`)
  } else {
    return res.redirect(`/menor?anos=${anos}`)
  }
})

app.listen(3000)
