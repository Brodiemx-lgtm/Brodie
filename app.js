const express = require("express");
const app = express();

// Puerto que Render asigna automáticamente
const port = process.env.PORT || 3001;

// Middleware para procesar JSON
app.use(express.json());

// Ruta principal (opcional, solo para probar que corre)
app.get("/", (req, res) => {
  res.send("🚀 Webhook activo en Render. Usa /webhook para Meta.");
});

// ✅ Endpoint de verificación de Webhook (Meta llamará aquí con GET)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN; // Defínelo en Render

  // Parámetros que envía Meta
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ Webhook verificado correctamente.");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

// ✅ Endpoint para recibir mensajes/eventos (POST de Meta)
app.post("/webhook", (req, res) => {
  console.log("📩 Evento recibido:", JSON.stringify(req.body, null, 2));

  // Siempre responde 200 para que Meta no lo reintente
  res.sendStatus(200);
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});

`
