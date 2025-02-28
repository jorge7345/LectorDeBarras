import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const BarcodeScanner = ({ onScan }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    
    codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
      if (result) {
        onScan(result.getText()); // Enviar el código escaneado al input
      }
    }).catch((error) => console.error("Error al acceder a la cámara:", error));

    return () => codeReader.reset();
  }, [onScan]);

  return <video ref={videoRef} style={{ width: "100%", maxWidth: "400px" }} autoPlay playsInline></video>;
};

export default BarcodeScanner;
