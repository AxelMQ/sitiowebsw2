import dotenv from 'dotenv';

dotenv.config();

const brevoApiKey = process.env.BREVO_API_KEY;

if (!brevoApiKey) {
  console.warn("ADVERTENCIA: La variable BREVO_API_KEY no está configurada en el archivo .env. El envío de correos fallará.");
}

/**
 * Envía un correo electrónico utilizando la API HTTP de Brevo (puerto 443).
 * Compatible con entornos locales y en la nube sin bloqueo de puertos.
 */
export async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.MAIL_USERNAME || 'soporte@lumoslogic.com';
  const companyName = process.env.COMPANY_NAME || 'Lumos Logic';

  if (!apiKey) {
    throw new Error("La API Key de Brevo (BREVO_API_KEY) no está configurada.");
  }

  const payload = {
    sender: {
      name: `Portal de Soporte - ${companyName}`,
      email: senderEmail
    },
    to: [
      {
        email: to
      }
    ],
    subject: subject,
    htmlContent: html
  };

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Error en la API de Brevo: ${response.status} - ${errorDetails}`);
  }

  return await response.json();
}
