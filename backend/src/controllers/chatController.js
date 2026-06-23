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
    let userFriendlyError = "Ocurrió un error al procesar el mensaje con el Agente de IA.";
    const errMsg = typeof error === 'string' ? error : (error.message || "");
    
    if (errMsg.includes("429") || errMsg.includes("quota") || errMsg.includes("Quota") || errMsg.includes("RESOURCE_EXHAUSTED")) {
      userFriendlyError = "El agente de soporte inteligente ha excedido su límite de consultas gratuitas de hoy. Por favor, intenta de nuevo en unos minutos o contáctanos por correo electrónico.";
    } else if (errMsg.includes("API key") || errMsg.includes("key not found") || errMsg.includes("API_KEY")) {
      userFriendlyError = "Error de autenticación con el proveedor de IA. Por favor, verifica la configuración de la API Key en el servidor.";
    } else {
      userFriendlyError = "El agente de soporte no pudo responder a tu solicitud en este momento. Por favor, intenta de nuevo.";
    }

    res.status(500).json({ 
      error: userFriendlyError
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
