## Listar todos os clientes

- **Rota:** `GET /api/customers`
- **Descrição:** Retorna todos os clientes cadastrados.
- **Resposta de Sucesso (200):**

  ```json
  [
    {
      "id": 1,
      "name": "Nome do Cliente",
      "email": "cliente@email.com",
      "phone": "123456789",
      "coord_x": 12.34,
      "coord_y": 56.78
    },
    // ... Outros clientes ...
  ]



## Registrar um novo cliente

- **Rota:** `POST /api/customers`
- **Descrição:** Registra um novo cliente.
- **Corpo da Requisição:**
  ```

  json
  {
    "name": "Nome do Cliente",
    "email": "cliente@email.com",
    "phone": "123456789",
    "coord_x": 12.34,
    "coord_y": 56.78
  }

## Atualizar um cliente existente

- **Rota:** `PATCH /api/customers/{id}`
- **Descrição:** Atualiza as informações de um cliente existente.
- **Parâmetros da URL:**
  - `{id}`: Identificador único do cliente.
- **Corpo da Requisição:**

  ```json
  {
    "name": "Novo Nome do Cliente",
    "email": "novo@email.com",
    "phone": "987654321",
    "coord_x": 45.67,
    "coord_y": 89.01
  }
## Excluir um cliente

- **Rota:** `DELETE /api/customers/{id}`
- **Descrição:** Remove um cliente existente.
- **Parâmetros da URL:**
  - `{id}`: Identificador único do cliente.
- **Resposta de Sucesso (200):**
  ```json
  {
    "message": "Customer deleted successfully."
  }
