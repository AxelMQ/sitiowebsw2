import { ai } from '../config/ai.js';
import { checkTicketStatusTool, mockCheckTicketStatus } from '../tools/ticketTools.js';

export async function handleChatSession(history, message) {
  const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  const companyName = process.env.COMPANY_NAME || 'Lumos Logic | Software Development';
  const companySlogan = process.env.COMPANY_SLOGAN || 'Iluminamos el camino digital de nuestros clientes. Desarrollamos soluciones de software claras y eficientes para resolver tus problemas más oscuros.';

  const SYSTEM_PROMPT = `Eres el agente principal de Call Center de ${companyName}, una agencia de desarrollo de software innovadora. Tu slogan/filosofía es: "${companySlogan}". Tu objetivo es dar soporte de primer nivel, derivar clientes al área de ventas o guiar en descargas. Eres corporativo, eficiente, pero con un toque amistoso y tecnológico. Si un usuario tiene un problema técnico, pídele su número de ticket. Nunca respondas preguntas fuera del ámbito de la empresa o del desarrollo de software.`;

  const chat = ai.chats.create({
    model: modelName,
    history: history || [],
    config: {
      systemInstruction: SYSTEM_PROMPT,
      tools: [checkTicketStatusTool]
    }
  });

  let response = await chat.sendMessage({ message });

  if (response.functionCalls && response.functionCalls.length > 0) {
    const call = response.functionCalls[0];

    if (call.name === 'checkTicketStatus') {
      const { ticketNumber } = call.args;
      console.log(`[AI-Tool] Gemini invocó checkTicketStatus para: ${ticketNumber}`);

      const ticketResult = mockCheckTicketStatus(ticketNumber);

      response = await chat.sendMessage({
        message: [
          {
            role: 'function',
            parts: [{
              functionResponse: {
                name: 'checkTicketStatus',
                response: ticketResult
              }
            }]
          }
        ]
      });
    }
  }

  return response.text;
}
