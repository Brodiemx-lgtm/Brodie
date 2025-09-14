const express = require("express");
const app = express();

// Middleware JSON
app.use(express.json());

// Puerto
const port = process.env.PORT || 3000;

// Ruta raíz
app.get("/", (req, res) => res.type("html").send(html));

// Webhook GET (verificación Meta)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "mi_token_seguro";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ Webhook verificado por Meta");
      return res.status(200).send(challenge);
    } else {
      console.log("❌ Token inválido", token);
      return res.sendStatus(403);
    }
  }
});

// Webhook POST (mensajes)
app.post("/webhook", (req, res) => {
  console.log("📩 Evento recibido:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// ✅ Política de privacidad (formal/legal)
app.get("/privacy", (req, res) => {
  res.type("html").send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Política de Privacidad</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: auto; }
        h1, h2 { color: #333; }
      </style>
    </head>
    <body>
      <h1>Política de Privacidad</h1>
      <p>En <strong>Brodiemx</strong> respetamos y protegemos la privacidad de nuestros usuarios. 
      Esta política explica cómo recopilamos, usamos y protegemos tu información.</p>

      <h2>1. Información que recopilamos</h2>
      <ul>
        <li>Números de teléfono asociados a mensajes de WhatsApp.</li>
        <li>Mensajes enviados a través de la integración con WhatsApp Business API.</li>
        <li>Datos técnicos mínimos necesarios para el funcionamiento del servicio.</li>
      </ul>

      <h2>2. Uso de la información</h2>
      <p>La información recopilada se utiliza únicamente para:</p>
      <ul>
        <li>Responder a tus consultas o mensajes.</li>
        <li>Mejorar la calidad del servicio.</li>
        <li>Mantener la comunicación entre la empresa y los usuarios.</li>
      </ul>

      <h2>3. Compartición de datos</h2>
      <p>No compartimos, vendemos ni alquilamos tu información a terceros, 
      salvo que sea requerido por ley.</p>

      <h2>4. Retención de datos</h2>
      <p>Conservamos la información únicamente durante el tiempo necesario 
      para cumplir con los fines descritos en esta política.</p>

      <h2>5. Seguridad</h2>
      <p>Implementamos medidas de seguridad técnicas y organizativas 
      para proteger tu información contra accesos no autorizados.</p>

      <h2>6. Derechos del usuario</h2>
      <p>Como usuario, tienes derecho a acceder, rectificar o solicitar la eliminación de tus datos. 
      Para ejercer estos derechos, contáctanos en el correo indicado abajo.</p>

      <h2>7. Contacto</h2>
      <p>Si tienes dudas sobre esta política de privacidad, puedes escribirnos a:<br>
      <strong>📧 contacto@brodiemx.com</strong></p>

      <p><em>Última actualización: Septiembre 2025</em></p>
    </body>
    </html>
  `);
});


