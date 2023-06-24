const Categoria = require('../models/categoriaModel');

// Cadastrar uma nova categoria
const cadastrarCategoria = async (req, res) => {
  try {
    const { codigo, nome, descrição } = req.body;

    // Verificar se já existe uma categoria com o mesmo código
    const categoriaExistente = await Categoria.findOne({ codigo });
    if (categoriaExistente) {
      return res.status(400).json({ message: 'Categoria com código já existente' });
    }

    // Criar uma nova categoria
    const novaCategoria = new Categoria({ codigo, nome, descrição });

    // Salvar a nova categoria no banco de dados
    await novaCategoria.save();

    res.status(201).json({ message: 'Categoria cadastrada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Editar uma categoria por código
const editarCategoria = async (req, res) => {
  try {
    const { codigo } = req.params;
    const { nome, descrição } = req.body;

    // Verificar se a categoria existe
    const categoria = await Categoria.findOne({ codigo });
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    // Atualizar os dados da categoria
    categoria.nome = nome;
    categoria.descrição = descrição;

    // Salvar as alterações no banco de dados
    await categoria.save();

    res.status(200).json({ message: 'Categoria atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Retornar a lista de categorias completa
const listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Retornar uma categoria por código
const getCategoriaByCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const categoria = await Categoria.findOne({ codigo });
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Deletar uma categoria por código
const deletarCategoriaPorCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const categoria = await Categoria.findOneAndDelete({ codigo });
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = {
  cadastrarCategoria,
  editarCategoria,
  listarCategorias,
  getCategoriaByCodigo,
  deletarCategoriaPorCodigo,
};

