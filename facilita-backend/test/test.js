import request from 'supertest';
import app from '../app.js';

// Teste para verificar se a rota '/clientes' retorna status 200
describe('GET /api/clientes', () => {
  it('Deve retornar status 200', async () => {
    const res = await request(app).get('/api/clientes');
    expect(res.status).toBe(200);
  });

  it('Deve retornar uma lista de clientes', async () => {
    const res = await request(app).get('/api/clientes');
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// Teste para verificar se a rota '/api/calcular-rotas' retorna status 200
describe('GET /api/calcular-rotas', () => {
  it('Deve retornar status 200', async () => {
    const res = await request(app).get('/api/calcular-rotas');
    expect(res.status).toBe(200);
  });
});

// Teste para verificar se a rota '/api/clientes' retorna status 201 após a inserção de um novo cliente
describe('POST /api/clientes', () => {
  it('Deve retornar status 201 após a inserção de um novo cliente', async () => {
    const randomEmailNumber = Math.floor(Math.random() * 1000);
    const novoCliente = {
      nome: 'Novo Cliente',
      email: `novo_cliente_${randomEmailNumber}@cliente.com`,
      telefone: '123456789',
      coord_x: 5,
      coord_y: 5,
    };

    const res = await request(app).post('/api/clientes').send(novoCliente);
    expect(res.status).toBe(201);
  });
});

// Teste para verificar se a rota '/api/clientes/:id' retorna status 200 após a atualização de um cliente
describe('PATCH /api/clientes/:id', () => {
    let clienteId; // Variável para armazenar o ID do cliente a ser excluído

  // Antes do teste, faça um pedido GET para listar os clientes
  beforeAll(async () => {
    const listaClientes = await request(app).get('/api/clientes');
    // Assumindo que a lista de clientes não está vazia
    // Pegue o ID do último cliente na lista
    clienteId = listaClientes.body[listaClientes.body.length - 1].id;
  });

  it('Deve retornar status 200 após a atualização de um cliente', async () => {
    // Certifique-se de que o ID do cliente está definido
    expect(clienteId).toBeDefined();
    console.log(clienteId)
    // Modifique os dados do cliente
    const clienteAtualizado = {
      nome: 'Cliente Modificado',
      email: 'cliente_modificado@example.com',
      telefone: '999999999',
      coord_x: 20,
      coord_y: 20,
    };

    // Faça o pedido PUT usando o ID do cliente e os dados atualizados
    const res = await request(app).patch(`/api/clientes/${clienteId}`).send(clienteAtualizado);
    expect(res.status).toBe(200);

  });

// Depois do teste, restaure os detalhes originais do cliente


});


// Teste para verificar se a rota '/api/clientes/:id' retorna status 404 ao tentar atualizar um cliente inexistente
describe('PUT /api/clientes/:id', () => {
  it('Deve retornar status 404 ao tentar atualizar um cliente inexistente', async () => {
    const clienteInexistente = {
      nome: 'Cliente Inexistente',
      email: 'cliente_inexistente@example.com',
      telefone: '111111111',
      coord_x: 20,
      coord_y: 20,
    };

    const res = await request(app).put('/api/clientes/999').send(clienteInexistente);
    expect(res.status).toBe(404);
  });
});

// Teste para verificar se a rota '/api/clientes/:id' retorna status 200 após a exclusão de um cliente
describe('DELETE /api/clientes/:id', () => {
  let clienteId; // Variável para armazenar o ID do cliente a ser excluído

  // Antes do teste, faça um pedido GET para listar os clientes
  beforeAll(async () => {
    const listaClientes = await request(app).get('/api/clientes');
    // Assumindo que a lista de clientes não está vazia
    // Pegue o ID do último cliente na lista
    clienteId = listaClientes.body[listaClientes.body.length - 1].id;
  });

  it('Deve retornar status 200 após a exclusão de um cliente', async () => {
    // Certifique-se de que o ID do cliente está definido
    expect(clienteId).toBeDefined();

    // Faça o pedido DELETE usando o ID do cliente
    const res = await request(app).delete(`/api/clientes/${clienteId}`);
    expect(res.status).toBe(200);
  });
});


// Teste para verificar se a rota '/api/clientes/:id' retorna status 404 ao tentar excluir um cliente inexistente
describe('DELETE /api/clientes/:id', () => {
  it('Deve retornar status 404 ao tentar excluir um cliente inexistente', async () => {
    const res = await request(app).delete('/api/clientes/99');
    expect(res.status).toBe(404);
  });
});
