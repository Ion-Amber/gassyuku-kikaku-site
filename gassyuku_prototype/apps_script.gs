/**
 * Google Sheets の events シートを JSON として返す Apps Script の試作例
 * デプロイ後の URL を index.html の DATA_URL に設定してください。
 */
function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('events');
  const values = sheet.getDataRange().getDisplayValues();
  const headers = values.shift();

  const rows = values
    .filter(row => row.some(cell => cell !== ''))
    .map(row => Object.fromEntries(headers.map((h, i) => [h, row[i]])));

  return ContentService
    .createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON);
}
