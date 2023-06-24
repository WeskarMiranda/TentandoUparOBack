const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../auth/auth');

router.use(auth.autorizar);

// Efetuar pedido
router.post('/', pedidoController.efetuarPedido);

// Editar status do pedido
router.patch('/:pedidoId', pedidoController.editarStatusPedido);

// Retornar pedido por cliente
router.get('/cliente/:clienteId', pedidoController.retornarPedidoPorCliente);

// Retornar lista de pedido completa
router.get('/', pedidoController.retornarListaPedidos);

router.delete('/:codigo', pedidoController.deletarPedidoPorCodigo);

module.exports = router;
