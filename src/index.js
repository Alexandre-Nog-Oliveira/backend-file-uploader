const express = require('express')

const app = express()

app.get('/', (req, res) =>{
    return res.status(200).send({message: "Rota padrão"})
})

app.listen(3300)