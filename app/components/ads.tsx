import { useEffect } from 'react';

export default function Ads() {
  useEffect(() => {
    // Definir la configuración
    window.atOptions = {
      'key': '2e9fa580f3b3a97461d075e127c77c1a',
      'format': 'iframe',
      'height': 60,
      'width': 468,
      'params': {}
    };

    // Crear e inyectar el script
    const script = document.createElement('script');
    script.src = 'https://www.highperformanceformat.com/2e9fa580f3b3a97461d075e127c77c1a/invoke.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup (opcional)
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []); // El array vacío asegura que se ejecute una sola vez al montar

  return <div id="ad-container"></div>;
}