const express = require('express')
const app = express()
const port = 8080;

// Todo: require('hbs')
// Renderizar con hbs - La idea de hbs es utilizar el patron MVC
app.set('view engine', 'hbs');

// midleware para hacer publica la carpeta public, con index.html
// Servir contenido estatico
app.use( express.static('public') );

app.get('/', (req, res) => {
  res.render('home', {
    nombre: 'Franco de la Rosa',
    titulo: 'Curso de Node'
  })
})

app.get('/generic', (req, res) => {
  res.sendFile(__dirname + '/public/generic.html')
})

app.get('/elements', (req, res) => {
  res.sendFile(__dirname + '/public/elements.html')
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})