const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())

app.use('/api', require('./routes/contact'))


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})