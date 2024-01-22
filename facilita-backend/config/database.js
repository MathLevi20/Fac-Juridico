// src/config/database.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432, 
});

// Função para verificar se a tabela existe
export async function tabelaExiste() {
  try {
    const result = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'clientes'
      );
    `);

    return result.rows[0].exists;
  } catch (error) {
    console.error('Erro ao verificar se a tabela existe:', error);
    throw error;
  }
}

// Função para criar a tabela
export async function criarTabela() {
  try {
    await pool.query(`
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    coord_x DOUBLE PRECISION NOT NULL, 
    coord_y DOUBLE PRECISION NOT NULL 
);


    `);
    console.log('Tabela "clientes" criada com sucesso.');
  } catch (error) {
    console.error('Erro ao criar a tabela "clientes":', error);
    throw error;
  }
}

// Função principal para criar a tabela se não existir
export async function main() {
  try {
    const tabelaJaExiste = await tabelaExiste();

    if (!tabelaJaExiste) {
      await criarTabela();
    }
      
  } catch (error) {
    console.error('Erro durante a inicialização:', error);
    process.exit(1); // Encerra o processo Node.js em caso de erro
  }
}
export default pool;
