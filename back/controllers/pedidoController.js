const Pedido = require('../models/pedidoModel');
const Cliente = require('../models/clienteModel');

// Efetuar pedido
const efetuarPedido = async (req, res) => {
  const { codigo, produtos, cliente } = req.body;

  try {
    const pedido = new Pedido({
      codigo,
      produtos,
      cliente,
      dataHora: new Date(),
      status: "Aguardando Pagamento"
    });

    const pedidoSalvo = await novoPedido.save();

    res.status(201).json({ message: 'Pedido efetuado com sucesso', pedido: pedidoSalvo });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao efetuar o pedido' });
  }
};

// Editar status do pedido
const editarStatusPedido = async (req, res) => {
  const { pedidoId } = req.params;
  const { status } = req.body;

  try {
    const pedido = await Pedido.findByIdAndUpdate(
      pedidoId,
      { status },
      { new: true }
    );

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    res.json({ message: 'Status do pedido atualizado com sucesso', pedido });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o status do pedido' });
  }
};

// Retornar pedido por cliente
const retornarPedidoPorCliente = async (req, res) => {
  const { clienteId, codigo } = req.params;

    try {
      const cliente = await Cliente.findOne({ codigo: clienteId });

      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      const pedido = await Pedido.findOne({ cliente: cliente._id, codigo });

      if (pedido) {
        res.json(pedido);
      } else {
        res.status(404).json({ error: 'Pedido não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pedido do cliente' });
    }
};

// Retornar lista de pedido completa
const retornarListaPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();

    res.json({ pedidos });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar a lista de pedidos' });
  }
};

// Deletar pedido por código
const deletarPedidoPorCodigo = async (req, res) => {
  const { codigo } = req.params;
  try {
    const pedido = await Pedido.findOneAndDelete({ codigo });
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    res.json({ message: 'Pedido deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar pedido' });
  }
};

module.exports = {
  efetuarPedido,
  editarStatusPedido,
  retornarPedidoPorCliente,
  retornarListaPedidos,
  deletarPedidoPorCodigo,
};



