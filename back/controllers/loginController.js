const clienteModel = require('../models/clienteModel');
const auth = require('../auth/auth');
const bcryptjs = require('bcryptjs');

class LoginController {

    async login(req, res) {
        const { email, password } = req.body;
        const cliente = await clienteModel.findOne({ 'email': email }).select('+password')
        
        if (!cliente) {
            return res.status(400).send({ error: 'Usuário não encontrado!' });
        }

        if (!await bcryptjs.compare(password, cliente.password)) {
            return res.status(400).send({ error: 'Senha inválida!' });
        }

        await auth.incluirToken(cliente);
        res.status(200).json(cliente);
    }
}

module.exports = new LoginController();

