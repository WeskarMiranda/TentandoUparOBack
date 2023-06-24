const Produto = require('../models/produtoModel');
const Categoria = require("../models/categoriaModel");
const fs = require('fs');

// Cadastrar produto
const cadastrarProduto = async (req, res) => {

  try {
    const max = await Produto.findOne({}).sort({ codigo: -1 });
      const produto = req.body;
      const file = req.file.buffer;
      produto.codigo = max == null ? 1 : max.codigo + 1;
      produto.imagem = file

      

        const resultado = await Produto.create(produto);
        if (resultado) {
          res.status(201).json('Produto cadastrado com sucesso');
        } else {
          res.status(404).json({ error: 'Dado não encontrado' });
        }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao cadastrar o produto' });
    }
  }


const editarProduto = async (req, res) => {
  const codigo = req.params.codigo;

        try {
            const produtoExistente = await Produto.findOne({ 'codigo': codigo });

            if (!produtoExistente) {
                res.status(404).json({ mensagem: `Nenhum produto com o codigo: ${codigo} encontrado para alteração!` });
                return;
            }

            const _id = String(produtoExistente._id);
            const edicao = req.body;

            if (req.body.imagem) {
              try {


                  // Obter os dados da imagem
                  const imagemPath = edicao.imagem.data;
                  const imagemData = fs.readFileSync(imagemPath);

                  // Definir os dados da imagem no objeto do produto
                  edicao.imagem = {
                      data: imagemData,
                      contentType: 'image/jpg' // Substitua pelo tipo de conteúdo correto da sua imagem
                  };


              } catch (error) {
                  console.error(error);
                  res.status(500).json({ mensagem: 'Erro ao carregar a imagem.' });
                  return;
              }
          }

          await Categoria.findOne({ codigo: edicao.categoria })
              .then((categoria) => {
                  edicao.categoria = categoria._id;
                  return edicao;
              })

          await Produto.findByIdAndUpdate(String(_id), edicao);

          res.status(200).json({ mensagem: 'Produto atualizado com sucesso' });
      } catch (error) {
          console.error(error);
          res.status(500).json({ mensagem: 'Erro ao realizar alteração de produto.' });
      }
  }

              
            






// Retornar lista de produtos completa
const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar produtos' });
  }
};

// Retornar produto por código
const getProdutoByCodigo = async (req, res) => {
  const { codigo } = req.params;
  try {
    const produto = await Produto.findOne({ codigo });
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto' });
  }
};

// Deletar produto por código
const deletarProdutoPorCodigo = async (req, res) => {
  
  try {
    const { codigo } = req.params;
    const produto = await Produto.findOneAndDelete({ codigo });
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto' });
  }
};

module.exports = {
  cadastrarProduto,
  editarProduto,
  listarProdutos,
  getProdutoByCodigo,
  deletarProdutoPorCodigo,
};
