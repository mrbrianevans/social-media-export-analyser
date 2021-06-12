const express = require('express')
const app = express()

app.all('*', (req, res, next)=> {
  console.debug(new Date().toUTCString(), 'Received request on ', req.url)
  next()
})
app.use(express.static('dist'))
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
const port = 3000
app.listen(port, ()=>{
  console.log(`Listening on http://localhost:${port}`)
})