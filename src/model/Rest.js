const mongoose = require('mongoose')

const Rest = mongoose.model('Rest',{
    name: String,
    email: String,
    cnpj: String,
    cep: String,
    pass: String,
})

module.exports = Rest