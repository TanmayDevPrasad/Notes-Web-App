const express = require('express')
const app = express()
const port = 3000

//Sign Up / Login Route
app.get('/', (req, res) => {
  res.send('This is Sign-Up / Login Page')
})

// User Home Page Route
app.get('/home', (req, res) => {
  res.send('This is User Home Page')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})