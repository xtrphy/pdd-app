import React from 'react';

const Spinner = () => {
    return (
        <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-400 animate-bounce [animation-delay:.4s]"></div>
            <div className="w-4 h-4 rounded-full bg-orange-400 animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-orange-400 animate-bounce [animation-delay:.7s]"></div>
        </div>
    );
};

export default Spinner;