import { transporter } from '../config/mail.js';

export async function sendEmailHandler(req, res) {
  const { name, email, ticketNumber, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Nombre, Correo y Mensaje son campos obligatorios." });
  }

  const companyName = process.env.COMPANY_NAME || 'Lumos Logic';
  const companyEmail = process.env.MAIL_USERNAME;

  if (!companyEmail) {
    return res.status(500).json({ error: "El correo del administrador no está configurado en el servidor backend." });
  }

  // Support ticket info HTML
  const ticketDisplay = ticketNumber ? `<strong>Ticket Relacionado:</strong> ${ticketNumber}` : '<em>Sin número de ticket anterior</em>';

  const mailToAdminOptions = {
    from: `"Portal de Soporte - ${companyName}" <${companyEmail}>`,
    to: companyEmail, // Send to the company inbox
    subject: `[Soporte Incidente] Nuevo caso de ${name} (${ticketNumber || 'Nuevo'})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b;">
        <h2 style="color: #0d9488; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Nueva Solicitud de Soporte</h2>
        <p>Se ha registrado un nuevo incidente desde el formulario web de <strong>${companyName}</strong>:</p>
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p style="margin: 5px 0;"><strong>Remitente:</strong> ${name} (&lt;${email}&gt;)</p>
          <p style="margin: 5px 0;">${ticketDisplay}</p>
        </div>
        <p><strong>Descripción del problema:</strong></p>
        <p style="white-space: pre-wrap; background-color: #f1f5f9; padding: 15px; border-radius: 8px; border-left: 4px solid #0d9488;">${message}</p>
        <p style="font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 10px;">
          Lumos Logic Software Ticket System - Responder directamente a este correo para contactar al cliente en: ${email}
        </p>
      </div>
    `
  };

  const mailToUserOptions = {
    from: `"${companyName} Support" <${companyEmail}>`,
    to: email, // Send copy to user
    subject: `Confirmación de Recepción - ${companyName} (Ticket ${ticketNumber || 'Pendiente'})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b;">
        <h2 style="color: #0f172a;">Recibimos tu solicitud de Soporte</h2>
        <p>Estimado/a <strong>${name}</strong>,</p>
        <p>Gracias por contactarte con el equipo de ingeniería de <strong>${companyName}</strong>. Hemos registrado tu solicitud exitosamente:</p>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #6366f1;">
          <p style="margin: 5px 0;">${ticketDisplay}</p>
          <p style="margin: 5px 0;"><strong>Estado:</strong> Registrado en Análisis</p>
        </div>
        
        <p>Un ingeniero de nuestro Core Team evaluará tu reporte y se pondrá en contacto contigo a la brevedad.</p>
        <p style="margin-top: 25px;">Atentamente,<br/><strong>El equipo de Lumos Logic</strong></p>
        
        <p style="font-size: 11px; color: #94a3b8; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 10px;">
          Este es un correo automático. Por favor no lo respondas directamente a menos que necesites agregar información adicional.
        </p>
      </div>
    `
  };

  try {
    // Send email to administrator
    await transporter.sendMail(mailToAdminOptions);
    
    // Attempt sending confirmation copy to user (fail silently if user email is fake or blocklist, to avoid breaking flow)
    try {
      await transporter.sendMail(mailToUserOptions);
    } catch (errUser) {
      console.warn("No se pudo enviar copia al correo del cliente:", errUser.message);
    }

    res.json({ success: true, message: "Solicitud registrada y notificada por correo exitosamente." });
  } catch (error) {
    console.error("Error al enviar correos de soporte SMTP:", error);
    res.status(500).json({ 
      error: "Ocurrió un error en el servidor de correo SMTP al intentar enviar tu solicitud. Verifica las credenciales de Gmail." 
    });
  }
}
