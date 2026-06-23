export const checkTicketStatusTool = {
  functionDeclarations: [{
    name: 'checkTicketStatus',
    description: 'Checks the status of a technical support ticket using its code.',
    parameters: {
      type: 'OBJECT',
      properties: {
        ticketNumber: {
          type: 'STRING',
          description: 'The support ticket number to search for (e.g., TK-4829, TK-1024).'
        }
      },
      required: ['ticketNumber']
    }
  }]
};

export function mockCheckTicketStatus(ticketNumber) {
  const statuses = ['En Progreso', 'Resuelto', 'Esperando respuesta del cliente', 'En Análisis del Core Team'];
  const developers = ['Fernando Daniel Cossio Aranda', 'Axel Alexander Mamani Quispia'];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  const randomDevIndex = Math.floor(Math.random() * developers.length);
  return {
    ticketNumber: ticketNumber,
    status: statuses[randomIndex],
    updatedAt: new Date().toLocaleDateString(),
    assignedDeveloper: developers[randomDevIndex],
    description: 'Verificación de recursos y contenedores en la nube.'
  };
}
