import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ai } from '../config/ai.js';
import { checkTicketStatusTool, mockCheckTicketStatus } from '../tools/ticketTools.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let companyContext = "";
try {
  const contextPath = path.join(__dirname, '../data/companyContext.json');
  const data = JSON.parse(fs.readFileSync(contextPath, 'utf8'));
  companyContext = `
INFORMACIÓN DETALLADA DE LA EMPRESA:
- Ubicación: ${data.company.location}
- Horarios de atención: ${data.company.hours}
- Email de contacto: ${data.company.contact.email}
- Página web: ${data.company.contact.website}

SERVICIOS QUE OFRECEMOS:
${data.services.map(s => `- ${s.name}: ${s.description}`).join('\n')}

EQUIPO DE DESARROLLO (Desarrolladores Core):
${data.team.map(m => `- ${m.name} (${m.role}): ${m.bio} GitHub: ${m.github}`).join('\n')}
`;
} catch (err) {
  console.error("Error al cargar el contexto de la empresa:", err.message);
}

export async function handleChatSession(history, message) {
  const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  const companyName = process.env.COMPANY_NAME || 'Lumos Logic | Software Development';
  const companySlogan = process.env.COMPANY_SLOGAN || 'Iluminamos el camino digital de nuestros clientes. Desarrollamos soluciones de software claras y eficientes para resolver tus problemas más oscuros.';

  const SYSTEM_PROMPT = `Eres el agente principal de Call Center de ${companyName}, una agencia de desarrollo de software innovadora. Tu slogan/filosofía es: "${companySlogan}".

${companyContext}

Tu objetivo es dar soporte de primer nivel, derivar clientes al área de ventas o guiar en descargas. Eres corporativo, eficiente, pero con un toque amistoso y tecnológico. Si un usuario pregunta sobre los integrantes del equipo o desarrolladores, bríndale sus nombres, detalles de especialidad y sus perfiles de GitHub. Si preguntan sobre qué servicios ofrecemos, descríbelos de forma atractiva. Si un usuario tiene un problema técnico, pídele su número de ticket. Nunca respondas preguntas fuera del ámbito de la empresa o del desarrollo de software.`;

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
