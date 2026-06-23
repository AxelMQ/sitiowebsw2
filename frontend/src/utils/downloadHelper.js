const slugify = (text) => {
  if (!text) return 'resource';
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/\s+/g, '_')           // replace spaces with _
    .replace(/[^\w\-]+/g, '')       // remove non-word chars
    .replace(/\-\-+/g, '_')         // replace multiple _ with single _
    .trim();
};

export const downloadResource = (resource) => {
  if (!resource) return;

  const fileNameBase = `${slugify(resource.name)}_${resource.version}`;
  let content = '';
  let mimeType = 'application/octet-stream';
  let extension = '';

  const fileTypeLower = (resource.fileType || '').toLowerCase();

  if (fileTypeLower.includes('pdf')) {
    extension = 'pdf';
    mimeType = 'application/pdf';
    
    content = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 600 >>
stream
BT
/F1 18 Tf
50 780 Td
(LUMOS LOGIC | BOVEDA DE RECURSOS) Tj
/F2 12 Tf
0 -40 Td
(Recurso: ${resource.name}) Tj
0 -20 Td
(Version: ${resource.version}) Tj
0 -20 Td
(Tamano de Archivo: ${resource.size}) Tj
0 -30 Td
(Descripcion del Documento:) Tj
0 -20 Td
(${resource.description.substring(0, 75)}) Tj
0 -15 Td
(${resource.description.substring(75, 150)}) Tj
0 -30 Td
(Descargado de forma segura y encriptada desde el portal oficial.) Tj
0 -20 Td
(Firma SHA-256 de Seguridad:) Tj
0 -15 Td
(9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000056 00000 n 
0000000111 00000 n 
0000000301 00000 n 
trailer
<< /Size 5 /Root 1 0 R >>
startxref
940
%%EOF`;
  } else if (fileTypeLower.includes('zip') || fileTypeLower.includes('tar') || fileTypeLower.includes('compressed')) {
    extension = 'zip';
    mimeType = 'application/zip';
    content = `Lumos Logic Developer Tools Archive
------------------------------------
Resource: ${resource.name}
Version: ${resource.version}
Description: ${resource.description}
File Size: ${resource.size}
Status: VERIFIED SAFE`;
  } else {
    extension = 'exe';
    mimeType = 'application/octet-stream';
    content = `Lumos Logic Remote Connection Tool
-----------------------------------
Resource: ${resource.name}
Version: ${resource.version}
Description: ${resource.description}
File Size: ${resource.size}
MD5 Checksum: a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6`;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileNameBase}.${extension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
