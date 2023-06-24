require("./mongodb");
const mongoose = require("mongoose");
const clienteModel = require("../models/clienteModel");
const categoriaModel = require("../models/categoriaModel");
const produtoModel = require("../models/produtoModel");
const pedidoModel = require("../models/pedidoModel");

const clientes = require("./clientes.json");
const categorias = require("./categorias.json");
const produtos = require("./produtos.json");
const pedidos = require("./pedidos.json");

async function carregarDados() {
  try {
    await clienteModel.deleteMany({});
    for (const cliente of clientes) {
      await clienteModel.create(cliente);
    }
    console.log("Carga de clientes concluída!");

    await categoriaModel.deleteMany({});
    for (const categoria of categorias) {
      await categoriaModel.create(categoria);
    }
    console.log("Carga de categorias concluída!");

    await produtoModel.deleteMany({});
    for (const produto of produtos) {
      const categoria = await categoriaModel.findOne({ codigo: produto.categoria });
      produto.categoria = categoria._id;
      await produtoModel.create(produto);
    }
    console.log("Carga de produtos concluída!");

    await pedidoModel.deleteMany({});
    for (const pedido of pedidos) {
      const cliente = await clienteModel.findOne({ codigo: pedido.cliente });
      const produtosDoPedido = [];
      for (const produtoPedido of pedido.produtos) {
        const produto = await produtoModel.findOne({ codigo: produtoPedido.produto });
        produtosDoPedido.push({ produto: produto._id, quantidade: produtoPedido.quantidade });
      }
      pedido.cliente = cliente._id;
      pedido.produtos = produtosDoPedido;
      await pedidoModel.create(pedido);
    }
    console.log("Carga de pedidos concluída!");

  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
}

carregarDados();
