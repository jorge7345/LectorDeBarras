import { useState } from "react";
import BarcodeScanner from "./BarcodeScanner";
import './App.css'

function App () {
  const [barcode, setBarcode] = useState("");

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Escáner de Código de Barras</h2>
      
      {/* Escáner de código de barras */}
      <BarcodeScanner onScan={setBarcode} />

      {/* Input donde se mostrará el código escaneado */}
      <input
        type="text"
        value={barcode}
        placeholder="Código escaneado"
        readOnly
        style={{ marginTop: "20px", padding: "10px", fontSize: "18px", width: "80%" }}
      />
    </div>
  );
};

export default App;