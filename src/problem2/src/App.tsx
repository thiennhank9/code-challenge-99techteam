import React from "react";
import CurrencySwapForm from "./CurrencySwapForm";

const App: React.FC = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      <CurrencySwapForm />
    </div>
  );
};

export default App;
