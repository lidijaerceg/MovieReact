import React, { useState, useEffect } from "react"; // Import useEffect

function AmountBorders({ initialValue, minValue, maxValue, onAmountChange, name } : AmountBordersProps) {
  const [amount, setAmount] = useState(initialValue || minValue);

  useEffect(() => {
    // Handle any side effects related to amount changes here
    // Example: onAmountChange(amount);
  }, [amount]);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(event.target.value, 10) || minValue;
    newValue = Math.min(Math.max(newValue, minValue), maxValue);
    setAmount(newValue);
    onAmountChange(newValue);
  };
  

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div>{name}</div> {/* Display the name */}
      <input
        type="number"
        placeholder={`Enter amount (${minValue}-${maxValue})`}
        value={amount}
        onChange={handleAmountChange}
        min={minValue}
        max={maxValue}
      />
    </div>
  );
}

export default AmountBorders;

interface AmountBordersProps {
  initialValue?: number; // Specify the type explicitly as a number
  minValue: number;
  maxValue: number;
  onAmountChange: (newValue: number) => void;
  name: string; // Add a name property
}
