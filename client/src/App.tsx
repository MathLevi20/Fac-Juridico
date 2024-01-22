// App.tsx
import React, { useState, useEffect } from 'react';
import { customer } from './models/customer';
import api from './services/api';
import ListCustomer from './components/ListCustomer';
import CalculateRouteButton from './components/Buttons/CalculateRouteButton';
import NewRegistrationButton from './components/Buttons/NewRegistrationButton';

interface RouteResponse {
  visitOrder: customer[];
}

const App: React.FC = () => {
  const [Customers, setCustomers] = useState<customer[]>([]);
  const [visitOrder, setVisitOrder] = useState<customer[]>([]);
  const [modalVisitOrderActive, setModalVisitOrderActive] = useState<boolean>(false);
  const [modalEditActive, setModalEditActive] = useState<boolean>(false);
  const [modalRegistrationActive, setModalRegistrationActive] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');
  const [editingCustomer, setEditingCustomer] = useState<customer | null>(null);
  const [updatedData, setUpdatedData] = useState<Partial<customer>>({
    name: '',
    email: '',
    phone: '',
    coord_x: 0,
    coord_y: 0,
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get('/api/Customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching Customer list:', error);
      }
    };

    fetchCustomers();
  }, []);

  const calculateOptimalRoute = async () => {
    try {
      const response = await api.get<RouteResponse>('/api/calculate-route');
      setVisitOrder(response.data.visitOrder);
      setModalVisitOrderActive(true);
    } catch (error) {
      console.error('Error calculating optimal route:', error);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleEditCustomer = (Customer: customer) => {
    setEditingCustomer(Customer);
    setUpdatedData({
      name: Customer.name,
      email: Customer.email,
      phone: Customer.phone,
      coord_x: Customer.coord_x,
      coord_y: Customer.coord_y,
    });
    setModalEditActive(true);
  };

  const handleUpdateCustomer = async () => {
    if (!editingCustomer) {
      return;
    }

    try {
      await api.patch(`api/Customers/${editingCustomer.id}`, updatedData);
      const updatedCustomers = Customers.map(c =>
        c.id === editingCustomer.id ? { ...c, ...updatedData } : c
      );
      setCustomers(updatedCustomers);
      setEditingCustomer(null);
      setUpdatedData({
        name: '',
        email: '',
        phone: '',
        coord_x: 0,
        coord_y: 0,
      });
      setModalEditActive(false);
    } catch (error) {
      console.error('Error updating Customer:', error);
      // Logic to handle errors, for example, display a message to the user
    }
  };

  const cancelEditing = () => {
    setEditingCustomer(null);
    setUpdatedData({
      name: '',
      email: '',
      phone: '',
      coord_x: 0,
      coord_y: 0,
    });
    setModalEditActive(false);
  };

  const handleDeleteCustomer = async (Customer: customer) => {
    try {
      await api.delete(`/api/Customers/${Customer.id}`);
      const updatedCustomers = Customers.filter(c => c.id !== Customer.id);
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error(`Error deleting Customer ${Customer.name}:`, error);
    }
  };

  const handleNewRegistration = () => {
    setModalRegistrationActive(true);
  };

  const handleRegisterCustomer = async () => {
    try {
      await api.post('/api/Customers', updatedData);
      setModalRegistrationActive(false);
      setUpdatedData({
        name: '',
        email: '',
        phone: '',
        coord_x: 0,
        coord_y: 0,
      });
      // Update the Customer list after successful registration
      const response = await api.get('/api/Customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error registering Customer:', error);
      // Logic to handle errors, for example, display a message to the user
    }
  };

  const filteredCustomers = Customers.filter(Customer => {
    const name = Customer.name.toString().toLowerCase();
    const phone = Customer.phone.toString().toLowerCase();
    const email = Customer.email.toString().toLowerCase();
    const coord_x = Customer.coord_x.toString().toLowerCase();
    const coord_y = Customer.coord_y.toString().toLowerCase();

    return (
      name.includes(filter.toLowerCase()) ||
      phone.includes(filter.toLowerCase()) ||
      email.includes(filter.toLowerCase()) ||
      coord_x.includes(filter.toLowerCase()) ||
      coord_y.includes(filter.toLowerCase())
    );
  });

  return (
    <div className="p-5 container mx-auto mt-8 sm:w-full md:w-2/3 lg:w-1/2">
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Filter by name:</label>
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter the Customer's name..."
        />
      </div>

      <ListCustomer
        customer={filteredCustomers}
        handleEditCustomer={handleEditCustomer}
        handleDeleteCustomer={handleDeleteCustomer}
      />
      <CalculateRouteButton onClick={calculateOptimalRoute} />
      <NewRegistrationButton onClick={handleNewRegistration} />

      {/* Modal to display visitation order */}
      {modalVisitOrderActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-140">
            <h2 className="text-2xl font-bold mb-4">Visitation Order</h2>
            <ul className="space-y-2">
              {visitOrder.map(Customer => (
                <li key={Customer.id} className="border-b py-2">
                  <div className="flex justify-between items-center">
                    <div className='mr-4'>
                      <span className="font-bold">{Customer.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Coordinates X: {Customer.coord_x}</span>
                      <span className="mx-2 text-gray-500">-</span>
                      <span className="text-gray-500">Coordinates Y: {Customer.coord_y}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
              onClick={() => setModalVisitOrderActive(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Customer editing */}
      {modalEditActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Edit Customer</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input
                  type="text"
                  value={updatedData.name}
                  onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <input
                  type="text"
                  value={updatedData.email}
                  onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
                <input
                  type="text"
                  value={updatedData.phone}
                  onChange={(e) => setUpdatedData({ ...updatedData, phone: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Coordinates X:</label>
                <input
                  type="text"
                  value={updatedData.coord_x}
                  onChange={(e) => setUpdatedData({ ...updatedData, coord_x: parseFloat(e.target.value) })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Coordinates Y:</label>
                <input
                  type="text"
                  value={updatedData.coord_y}
                  onChange={(e) => setUpdatedData({ ...updatedData, coord_y: parseFloat(e.target.value) })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleUpdateCustomer}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalRegistrationActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">New Registration</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input
                  type="text"
                  value={updatedData.name}
                  onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <input
                  type="text"
                  value={updatedData.email}
                  onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
                <input
                  type="text"
                  value={updatedData.phone}
                  onChange={(e) => setUpdatedData({ ...updatedData, phone: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Coordinate X:</label>
                <input
                  type="text"
                  value={updatedData.coord_x}
                  onChange={(e) => setUpdatedData({ ...updatedData, coord_x: parseFloat(e.target.value) })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Coordinate Y:</label>
                <input
                  type="text"
                  value={updatedData.coord_y}
                  onChange={(e) => setUpdatedData({ ...updatedData, coord_y: parseFloat(e.target.value) })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={handleRegisterCustomer}
                >
                  Register
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setModalRegistrationActive(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
