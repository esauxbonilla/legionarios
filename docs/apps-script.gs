/**
 * LEGIONARIOS — Recolector de leads de los quizzes
 * -------------------------------------------------
 * Pega este código en Extensiones → Apps Script de tu Google Sheet.
 * Publícalo como Web App (ver docs/google-sheets-setup.md) y usa la URL /exec
 * en la constante SHEETS_URL del quiz.
 *
 * Cada envío del quiz se agrega como una fila nueva.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    var respuestas = data.respuestas || [];
    var preguntas = data.preguntas || [];

    // Encabezados legibles. Si no llegan enunciados, cae a P1, P2, ...
    var colsPreguntas = preguntas.length
      ? preguntas
      : respuestas.map(function (_, i) { return 'P' + (i + 1); });
    var headers = ['Fecha', 'Resultado', 'Etapa', 'Palabra', 'Lead Score', 'Tier'].concat(colsPreguntas);

    // Refrescar la fila 1 en cada envío: así, si cambias el texto de una
    // pregunta, el encabezado de la hoja se mantiene en sync automáticamente.
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Armar la fila con los datos recibidos
    var row = [
      data.fecha || new Date().toLocaleString('es-MX'),
      data.resultado || '',
      data.etapa || '',
      data.palabra || '',
      data.leadScore != null ? data.leadScore : '',
      data.tier || '',
    ].concat(respuestas);

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Permite abrir la URL en el navegador para verificar que está viva.
function doGet() {
  return ContentService.createTextOutput('Legionarios endpoint activo ✅');
}
