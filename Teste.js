require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Importando o pacote CORS

const app = express();
// Config JSON response
app.use(express.json());
app.use(cors()); // Habilitando o CORS

// Models
const User = require('./src/model/User');
const Rest = require('./src/model/Rest');

// Open Route - Public Route
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a nossa API' });
});

// VALIDAÇÃO DE TOKEN
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado!" });
    }

    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();
    } catch (error) {
        res.status(400).json({ msg: 'Token inválido' });
    }
}

// Rota privada
app.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id;

    // check if user exists
    const user = await User.findById(id, '-pass');

    if (!user) {
        console.log("entrei no if!!!!!")
        return res.status(404).json({ msg: "Usuário não encontrado" });
    }
    res.status(200).json({ user });
});


// Registro Restaurante

app.post('/auth/register_rest', async (req, res) => {
    const { name, email, cnpj, cep, pass, confirmPass, cidade, bairro, rua, numero } = req.body;

    if (pass !== confirmPass) {
        return res.status(400).json({ error: 'Senhas não conferem' });
    }

    const userExists = await Rest.findOne({ email: email });
    if (userExists) {
        return res.status(422).json({ msg: "Por favor, utilize outro e-mail" });
    }

    // Validação do CEP
    try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        if (!response.ok) {
            throw new Error('CEP inválido');
        }
        const data = await response.json();
        if (!data.cep) {
            return res.status(400).json({ msg: "CEP inválido" });
        }
    } catch (error) {
        return res.status(400).json({ msg: "CEP inválido" });
    }

    const salt = await bcrypt.genSalt(12);
    const passHash = await bcrypt.hash(pass, salt);

    const newRestaurant = new Rest({
        name,
        email,
        cnpj,
        cep,
        pass: passHash,
        cidade,
        bairro,
        rua,
        numero
    });

    try {
        await newRestaurant.save();
        res.status(201).json({ msg: "Restaurante cadastrado com sucesso" });
    } catch (e) {
        res.status(500).json({ msg: "Ocorreu um erro no servidor, tente novamente mais tarde", e });
    }
})

// Register
app.post('/auth/register', async (req, res) => {
    const { name, email, pass, confirmPass } = req.body;

    // Validação
    if (!name || !email || !pass || !confirmPass) {
        return res.status(422).json({ msg: 'Preencha todos os campos' });
    }
    if (pass !== confirmPass) {
        return res.status(422).json({ msg: "As senhas não conferem" });
    }

    // Checando existência de usuário
    const userExists = await User.findOne({ email: email });
    if (userExists) {
        return res.status(422).json({ msg: "Por favor, utilize outro e-mail" });
    }

    // Criando senha
    const salt = await bcrypt.genSalt(12);
    const passHash = await bcrypt.hash(pass, salt);

    // Criar Usuário
    const user = new User({
        name,
        email,
        pass: passHash
    });

    try {
        await user.save();
        console.log(name, email, pass, passHash);
        res.status(201).json({ msg: "Usuário criado com sucesso" });

    } catch (e) {
        res.status(500).json({ msg: "Ocorreu um erro no servidor, tente novamente mais tarde", e });
    }
});

// Login User
app.post("/auth/login", async (req, res) => {
    const { email, pass } = req.body;

    // Validação
    if (!email || !pass) {
        return res.status(422).json({ msg: 'O email e a senha são obrigatórios' });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(404).json({ msg: 'Usuário não existe' });
    }

    // Check de senha
    const checkPass = await bcrypt.compare(pass, user.pass);

    if (!checkPass) {
        res.status(422).json({ msg: "Senha incorreta" });
        return;
    }

    try {
        const secret = process.env.SECRET;
        const token = jwt.sign({
            id: user._id
        }, secret);
        res.status(200).json({ msg: "Autenticação realizada com sucesso", token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Ocorreu um erro no servidor", err });
    }
});

//Login Rest
app.post("/auth/login_rest", async (req, res) => {
    const { email, pass } = req.body;

    // Validação
    if (!email || !pass) {
        return res.status(422).json({ msg: 'O email e a senha são obrigatórios' });
    }

    try {
        // Busca pelo restaurante no banco de dados
        const rest = await Rest.findOne({ email: email }); // Certifique-se de usar 'Rest' e não 'newRestaurant'
        if (!rest) {
            return res.status(404).json({ msg: 'Usuário não existe' });
        }

        // Verificação de senha
        const checkPass = await bcrypt.compare(pass, rest.pass);
        if (!checkPass) {
            return res.status(422).json({ msg: "Senha incorreta" });
        }

        // Geração do token JWT
        const secret = process.env.SECRET;
        const token = jwt.sign({ id: rest._id }, secret, { expiresIn: '1h' }); // Token expira em 1 hora

        return res.status(200).json({ msg: "Autenticação realizada com sucesso", token });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Ocorreu um erro no servidor", err });
    }
});



// Credenciais 
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.bo7gooi.mongodb.net/TesteLogin?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        app.listen(3000);
        console.log("BD conectado");
    })
    .catch((e) => {
        console.error("Erro ao conectar no servidor", e);
    });
