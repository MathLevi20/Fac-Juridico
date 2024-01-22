// populacaoBanco.mjs
import  pool  from '../config/database.js';

async function popularBanco() {
  try {
    // Insere dados fictícios na tabela clientes
    await pool.query(`
      INSERT INTO clientes (nome, email, telefone, coord_x, coord_y)
      VALUES
        ('Cliente 1', 'cliente1@example.com', '123456789', 10, 20),
        ('Cliente 2', 'cliente2@example.com', '987654321', 30, 40),
        ('Cliente 3', 'cliente3@example.com', '555555555', 50, 60);
    `);

    console.log('Dados inseridos no banco de dados com sucesso.');
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
    throw error;
  } finally {
    // Certifique-se de fechar a conexão com o banco de dados após a execução
    await pool.end();
  }
}

// Chama a função para popular o banco de dados
popularBanco();
