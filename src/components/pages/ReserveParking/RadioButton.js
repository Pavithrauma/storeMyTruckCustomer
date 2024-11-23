// src/RadioButton.js
import React, { useState } from 'react';

const RadioButton = ({ onOptionChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        onOptionChange(value); // Pass the selected option (amount) to the parent component
    };

    return (
        <div>
            <h5>Select Service:</h5>

            <label>
                <input
                    type="radio"
                    value="$50"
                    checked={selectedOption === '$50'}
                    onChange={handleOptionChange}
                />
                Space within our locked gates ($50 per Month)
                First Payment of $100 includes Last Month Payment. Assigned space inside gates.
                $100.00 for the first month then, $50.00 for each month
            </label>

            <label>
                <input
                    type="radio"
                    value="$75"
                    checked={selectedOption === '$75'}
                    onChange={handleOptionChange}
                />
                Locker Space Outside our locked gates ($75 per Month)
                First Payment of $150 includes Last Month Payment. Assigned space outside gates with chain & lock.
                $150.00 for the first month then, $75.00 for each month
            </label>

            <label>
                <input
                    type="radio"
                    value="$100"
                    checked={selectedOption === '$100'}
                    onChange={handleOptionChange}
                />
                Locker Space Inside our locked gates ($100 per Month)
                First Payment of $200 includes Last Month Payment. Assigned space inside gates with chain and lock.
                $200.00 for the first month then, $100.00 for each month
            </label>

            <div>
                <b>Total Amount: {selectedOption}</b>
            </div>
        </div>
    );
};

export default RadioButton;
