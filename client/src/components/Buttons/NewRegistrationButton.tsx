
import React from 'react';

interface NewRegistrationButtonProps {
    onClick: () => void;
}

const NewRegistrationButton: React.FC<NewRegistrationButtonProps> = ({ onClick }) => {
    return (
        <button
            className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
            onClick={onClick}
        >
            Registration
        </button>
    );
};

export default NewRegistrationButton;
