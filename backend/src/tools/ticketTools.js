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
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return {
    ticketNumber: ticketNumber,
    status: statuses[randomIndex],
    updatedAt: new Date().toLocaleDateString(),
    assignedDeveloper: 'Alex Mercer',
    description: 'Verificación de recursos y contenedores en la nube.'
  };
}
