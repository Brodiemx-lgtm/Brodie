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

// ✅ Política de privacidad
app.get("/privacy", (req, res) => {
  res.type("html").send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Política de Privacidad</title>
    </head>
    <body style="font-family: Arial, sans-serif; padding: 20px;">
      <h1>Política de Privacidad</h1>
      <p>En <strong>Brodiemx</strong> respetamos tu privacidad.</p>
      <p>La información que recibimos a través de esta aplicación 
      (como mensajes y números de teléfono) se utiliza únicamente 
      para responder a tus consultas.</p>
      <p>No compartimos tu información con terceros.</p>
      <p>Si tienes dudas, contáctanos en: contacto@brodiemx.com</p>
    </body>
    </html>
  `);
});

// Servidor
app.listen(port, () => console.log(`🚀 Servidor corriendo en puerto ${port}`));

// HTML raíz
const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Hello from Render!</title>
</head>
<body>
  <section>🎉 Webhook activo en Render</section>
</body>
</html>
`; // <- Este backtick final es obligatorio

