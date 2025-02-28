import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const BarcodeScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  let stream = null;

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
      if (result) {
        onScan(result.getText());
      }
    }).catch((error) => console.error("Error al acceder a la cámara:", error));

    return () => codeReader.reset();
  }, [onScan]);

  // 📌 Función para enfocar manualmente al tocar la pantalla
  const handleFocus = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      stream = videoRef.current.srcObject;
      const [track] = stream.getVideoTracks();

      if (track && track.getCapabilities) {
        const capabilities = track.getCapabilities();

        if (capabilities.focusMode) {
          try {
            await track.applyConstraints({
              advanced: [{ focusMode: "continuous" }]
            });
            console.log("🔍 Enfoque activado");
          } catch (error) {
            console.error("⚠️ No se pudo ajustar el enfoque:", error);
          }
        } else {
          console.warn("⚠️ El enfoque manual no es compatible con este dispositivo.");
        }
      }
    }
  };

  return (
    <video 
      ref={videoRef} 
      style={{ width: "100%", maxWidth: "400px", cursor: "pointer" }} 
      autoPlay 
      playsInline 
      onClick={handleFocus} // 📌 Enfocar al tocar la pantalla
    ></video>
  );
};

export default BarcodeScanner;
