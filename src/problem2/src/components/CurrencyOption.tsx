import React from "react";

interface CurrencyOptionProps {
  currency: string;
}

const CurrencyOption: React.FC<CurrencyOptionProps> = ({ currency }) => {
  return (
    <div className="currency-option">
      <img
        src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`}
        alt={currency}
        className="currency-icon"
      />
      <span>{currency}</span>
    </div>
  );
};

export default CurrencyOption;
