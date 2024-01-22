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

Resposta de Erro (500):

{
  "message": "Internal server error."
}
```