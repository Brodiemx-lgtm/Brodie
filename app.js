const express = require("express");
const app = express();

// Middleware JSON
app.use(express.json());

// Puerto dinámico (Render asigna PORT)
const port = process.env.PORT || 3000;

// HTML raíz (definido antes de usar)
const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Brodiemx - Webhook</title>
</head>
<body>
  <section style="font-family: Arial, sans-serif; padding:20px;">
    🎉 Webhook activo en Render. Endpoints: /webhook (GET/POST) y /privacy
  </section>
</body>
</html>
`;

// Ruta raíz
app.get("/", (req, res) => res.type("html").send(html));

// Webhook GET (verificación Meta)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "mi_token_seguro";

  console.log("GET /webhook → query:", req.query);
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (!mode || !token) {
    console.log("❌ Parámetros incompletos en GET /webhook");
    return res.sendStatus(400);
  }

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verificado por Meta. Enviando challenge:", challenge);
    return res.status(200).send(challenge);
  } else {
    console.log("❌ Token inválido. Recibido:", token, "Esperado:", VERIFY_TOKEN);
    return res.sendStatus(403);
  }
});

// Webhook POST (recibe eventos y mensajes)
app.post("/webhook", (req, res) => {
  console.log("POST /webhook → body:", JSON.stringify(req.body, null, 2));
  // procesa aquí los eventos si quieres...
  return res.sendStatus(200);
});

// Ruta de Política de Privacidad (para Meta)
app.get("/privacy", (req, res) => {
  res.type("html").send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Política de Privacidad - Brodiemx</title>
      <style>
        body { font-family: Arial, sans-serif; line-height:1.6; padding:20px; max-width:900px; margin:auto; }
        h1,h2 { color:#222; }
      </style>
    </head>
    <body>
      <h1>Política de Privacidad</h1>
      <p>En <strong>Brodiemx</strong> respetamos y protegemos la privacidad de nuestros usuarios. 
      Esta política explica cómo recopilamos, usamos y protegemos tu información.</p>
      <h2>1. Información que recopilamos</h2>
      <ul>
        <li>Números de teléfono asociados a mensajes de WhatsApp.</li>
        <li>Mensajes y contenido enviado a través de la integración con WhatsApp Business API.</li>
        <li>Datos técnicos mínimos necesarios para el funcionamiento del servicio.</li>
      </ul>
      <h2>2. Uso de la información</h2>
      <p>La información recopilada se utiliza únicamente para responder a tus consultas, mejorar el servicio y mantener la comunicación entre la empresa y los usuarios.</p>
      <h2>3. Compartición de datos</h2>
      <p>No compartimos, vendemos ni alquilamos tu información a terceros, salvo requerimiento legal.</p>
      <h2>4. Retención</h2>
      <p>Conservamos la información solo durante el tiempo necesario para los fines descritos.</p>
      <h2>5. Seguridad</h2>
      <p>Implementamos medidas técnicas y organizativas razonables para proteger la información.</p>
      <h2>6. Derechos</h2>
      <p>Tienes derecho a acceder, rectificar y solicitar la eliminación de tus datos. Para ejercerlos, contáctanos en: contacto@brodiemx.com</p>
      <p><em>Última actualización: Septiembre 2025</em></p>
    </body>
    </html>
  `);
});

// Iniciar servidor y ajustar timeouts
const server = app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en puerto ${port}`);
});
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
