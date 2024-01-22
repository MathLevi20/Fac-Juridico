// BotaoCalcularRota.tsx
import React from 'react';

interface CalculateRouteButtonProps {
    onClick: () => void;
}

const CalculateRouteButton: React.FC<CalculateRouteButtonProps> = ({ onClick }) => {
    return (
        <button
            className="bg-green-500 text-white px-4 py-2 mt-4 mr-4 rounded hover:bg-blue-600"
            onClick={onClick}
        >
            Calculate Route
        </button>
    );
};

export default CalculateRouteButton;
