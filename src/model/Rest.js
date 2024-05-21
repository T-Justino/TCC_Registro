const mongoose = require('mongoose');

const RestSchema = new mongoose.Schema({
    name: String,
    email: String,
    cep: String,
    cnpj: String,
    pass: String,
    cidade: String,
    bairro: String,
    rua: String,
    numero: String
});

const Rest = mongoose.model('Rest', RestSchema);

module.exports = Rest;