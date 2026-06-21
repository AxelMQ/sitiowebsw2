import { handleChatSession } from '../services/geminiService.js';

export async function chatHandler(req, res) {
  const { history, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "El mensaje es requerido." });
  }

  try {
    const reply = await handleChatSession(history, message);
    res.json({ reply });
  } catch (error) {
    console.error("Error en el Controlador de Chat:", error);
    res.status(500).json({ 
      error: error.message || "Ocurrió un error al procesar el mensaje con el Agente de IA." 
    });
  }
}

export function healthHandler(req, res) {
  const companyName = process.env.COMPANY_NAME || 'Lumos Logic | Software Development';
  res.json({
    status: "OK",
    service: "Servicio de API del Backend",
    company: companyName,
    hasApiKey: !!process.env.GEMINI_API_KEY,
    configuredModel: process.env.GEMINI_MODEL || 'gemini-1.5-flash'
  });
}
