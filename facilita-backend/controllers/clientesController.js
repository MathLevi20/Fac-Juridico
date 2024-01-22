import pool from './../config/database.js';

// Listar todos os clientes
async function listarClientes(req, res) {
  try {
    const result = await pool.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
}

// Cadastrar um novo cliente
async function cadastrarCliente(req, res) {
  const { nome, email, telefone, coord_x, coord_y } = req.body;
  console.log(coord_x)
     console.log(coord_y)

  try {
    if (!nome || !email || telefone === undefined || coord_x === undefined || coord_y === undefined) {
      console.log(coord_y);
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }
    console.log()
    await pool.query(
      'INSERT INTO clientes (nome, email, telefone, coord_x, coord_y) VALUES ($1, $2, $3, $4, $5)',
      [nome, email, telefone, coord_x, coord_y]
    );

    return res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso.' });
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

// Atualizar um cliente existente
async function atualizarCliente(req, res) {
  const clienteId = req.params.id;
  const { nome, email, telefone, coord_x, coord_y } = req.body;

  try {
    const result = await pool.query(
      'UPDATE clientes SET nome = $1, email = $2, telefone = $3, coord_x = $4, coord_y = $5 WHERE id = $6',
      [nome, email, telefone, coord_x, coord_y, clienteId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
    }

    return res.json({ mensagem: 'Cliente atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

// Excluir um cliente
async function excluirCliente(req, res) {
  const clienteId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM clientes WHERE id = $1', [clienteId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
    }

    return res.json({ mensagem: 'Cliente excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

export { listarClientes, cadastrarCliente, atualizarCliente, excluirCliente };
