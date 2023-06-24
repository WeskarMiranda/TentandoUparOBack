const auth = require('../auth/auth');
const Cliente = require('../models/clienteModel');
const fs = require('fs');

// Função para cadastrar um cliente
async function cadastrarCliente(req, res) {

try {
  const max = await Cliente.findOne({}).sort({ codigo: -1 });
  const cliente = req.body;
  const file = req.file.buffer;
  cliente.codigo = max == null ? 1 : max.codigo + 1;
  cliente.imagem = file; 

  if (await Cliente.findOne({ email: cliente.email })) {
    res.status(400).send({ error: 'Cliente já cadastrado!' });
    return;
}

const resultado = await Cliente.create(cliente);

  // Incluir o token de autenticação
  await auth.incluirToken(cliente);

  res.status(201).json(resultado);
} catch (error) {
  console.error(error);
  res.status(500).json({ mensagem: 'Erro ao realizar cadastro do cliente.' });
}

}

// Função para editar um cliente
async function editarCliente(req, res) {
  try {
    const codigo = req.params.codigo;
    const _id = String((await Cliente.findOne({ 'codigo': codigo }))._id);

    const cliente = req.body;

    await clienteModel.findByIdAndUpdate(String(_id), cliente);

    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar cliente' });
  }
}






// Função para listar todos os clientes
async function listarClientes(req, res) {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar clientes' });
  }
}

// Função para obter um cliente pelo código
async function obterClientePorCodigo(req, res) {
  try {
    const codigo = req.params.codigo;
    const cliente = await Cliente.findOne({ codigo });

    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter cliente' });
  }
}

// Função para deletar um cliente pelo código
async function deletarClientePorCodigo(req, res) {
  try {
    const codigo = req.params.codigo;
    const cliente = await Cliente.findOneAndDelete({ codigo });

    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
}

module.exports = {
  cadastrarCliente,
  editarCliente,
  listarClientes,
  obterClientePorCodigo,
  deletarClientePorCodigo
};

