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

## Calcular a Rota Ótima

- **Rota:** `POST /api/calculate-route`
- **Descrição:** Calcula a rota ótima para visitar todos os clientes.
- **Resposta de Sucesso (200):**
  ```json
    {
    "visitOrder": [
        {
        "id": 0,
        "name": "Company A",
        "coord_x": 0,
        "coord_y": 0
        },
        {
        "id": 1,
        "name": "MATHEUS LEVI DA SILVA BARBOSA",
        "email": "matheuslevi@gmail.com",
        "phone": "+55 11 98765-4321",
        "coord_x": 15,
        "coord_y": 10
        },
        {
        "id": 2,
        "name": "Maria Eduarda",
        "email": "mariaeduarda@gmail.com",
        "phone": "+55 11 98765-6789",
        "coord_x": 20,
        "coord_y": 15
        },
        {
        "id": 0,
        "name": "Company B",
        "coord_x": 0,
        "coord_y": 0
        }
    ]
    }
