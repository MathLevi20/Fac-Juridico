// ListaClientes.tsx
import React from 'react';
import { customer } from '../models/customer';

interface ListCustomerProps {
    customer: customer[];
    handleEditCustomer: (customer: customer) => void;
    handleDeleteCustomer: (customer: customer) => void;
}

const ListCustomer: React.FC<ListCustomerProps> = ({
    customer,
    handleEditCustomer,
    handleDeleteCustomer,
}) => {
    return (
        <ul className="space-y-2">
            {customer.map((customer) => (
                <li key={customer.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-100 p-3 rounded mb-2">
                    <div className="flex-grow grid grid-flow-cols">
                        <span className="mr-2">{customer.name}</span>
                        <span className="text-gray-500 mr-4">Email: {customer.email}</span>
                        <span className="text-gray-500 mr-4">Phone: {customer.phone}</span>
                        <span className="text-gray-500 mr-4">Coordinates x: {customer.coord_x}</span>
                        <span className="text-gray-500 mr-4">Coordinates y: {customer.coord_y}</span>
                    </div>
                    <div className="flex justify-end items-center">
                        <button
                            className="bg-blue-500 text-white px-3 py-1 mr-2 rounded hover:bg-blue-600"
                            onClick={() => handleEditCustomer(customer)}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            onClick={() => handleDeleteCustomer(customer)}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ListCustomer;
