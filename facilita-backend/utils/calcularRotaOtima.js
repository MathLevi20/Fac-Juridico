function calcularRotaOtima(clientes) {
  // Adicione a empresa como (0,0)
  const empresa = { id: 0, nome: 'Empresa', coord_x: 0, coord_y: 0 };
  clientes.unshift(empresa);

  const n = clientes.length;
  const visitados = new Array(n).fill(false);
  const ordemVisita = [];
  let distanciaTotal = 0;

  // Função para calcular a distância entre dois pontos
  const calcularDistancia = (cliente1, cliente2) => {
    const deltaX = cliente1.coord_x - cliente2.coord_x;
    const deltaY = cliente1.coord_y - cliente2.coord_y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  // Encontrar o vizinho mais próximo a partir de um cliente
  const encontrarVizinhoMaisProximo = (clienteAtual) => {
    let menorDistancia = Infinity;
    let vizinhoMaisProximo = null;

    for (let i = 0; i < n; i++) {
      const cliente = clientes[i];
      if (!visitados[i]) {
        const distancia = calcularDistancia(clienteAtual, cliente);
        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          vizinhoMaisProximo = i;
        }
      }
    }

    return vizinhoMaisProximo;
  };

  // Escolher o primeiro cliente como ponto de partida
  let clienteAtual = clientes[0];
  visitados[0] = true;
  ordemVisita.push(clienteAtual);

  // Encontrar a rota ótima
  for (let i = 1; i < n; i++) {
    const vizinhoMaisProximoIndex = encontrarVizinhoMaisProximo(clienteAtual);
    clienteAtual = clientes[vizinhoMaisProximoIndex];
    visitados[vizinhoMaisProximoIndex] = true;
    ordemVisita.push(clienteAtual);
    distanciaTotal += calcularDistancia(clientes[vizinhoMaisProximoIndex - 1], clienteAtual);
  }

  // Retornar à empresa (ponto inicial)
  ordemVisita.push(clientes[0]);
  distanciaTotal += calcularDistancia(clienteAtual, clientes[0]);

  console.log('Ordem de visita:', ordemVisita);
  console.log('Distância total:', distanciaTotal);

  return ordemVisita;
}

export default calcularRotaOtima