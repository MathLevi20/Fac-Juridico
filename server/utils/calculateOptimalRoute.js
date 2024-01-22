function calculateOptimalRoute(customers) {
  const company = { id: 0, name: 'Company', coord_x: 0, coord_y: 0 };
  customers.unshift(company);

  const n = customers.length;
  const visited = new Array(n).fill(false);
  const visitOrder = [];
  let totalDistance = 0;

  const calculateDistance = (customer1, customer2) => {
    const deltaX = customer1.coord_x - customer2.coord_x;
    const deltaY = customer1.coord_y - customer2.coord_y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  const findNearestNeighbor = (currentCustomer) => {
    let minDistance = Infinity;
    let nearestNeighbor = null;

    customers.forEach((customer, index) => {
      if (!visited[index]) {
        const distance = calculateDistance(currentCustomer, customer);
        if (distance < minDistance) {
          minDistance = distance;
          nearestNeighbor = index;
        }
      }
    });

    return nearestNeighbor;
  };

  let currentCustomer = customers[0];
  visited[0] = true;
  visitOrder.push(currentCustomer);

  for (let i = 1; i < n; i++) {
    const nearestNeighborIndex = findNearestNeighbor(currentCustomer);
    currentCustomer = customers[nearestNeighborIndex];
    visited[nearestNeighborIndex] = true;
    visitOrder.push(currentCustomer);
    totalDistance += calculateDistance(customers[nearestNeighborIndex - 1], currentCustomer);
  }

  visitOrder.push(customers[0]);
  totalDistance += calculateDistance(currentCustomer, customers[0]);

  console.log('Visit order:', visitOrder);
  console.log('Total distance:', totalDistance);

  return visitOrder;
}

export default calculateOptimalRoute;
