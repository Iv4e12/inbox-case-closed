const CONFIG = {
  CASE_ID: "001",
  SPREADSHEET_ID: "", // Add your Google Sheets ID later.
  GEMINI_API_KEY_PROPERTY: "GEMINI_API_KEY",
  SHEET_NAME: "Players",
  PROCESSED_SHEET: "ProcessedEmails"
};

function setupSheets() {
  const props = PropertiesService.getScriptProperties();
  const id = CONFIG.SPREADSHEET_ID || props.getProperty("SPREADSHEET_ID");
  if (!id) throw new Error("Set SPREADSHEET_ID in Script Properties first.");

  const ss = SpreadsheetApp.openById(id);
  ensureSheet_(ss, CONFIG.SHEET_NAME,
    ["Email", "Stage", "Status", "HintLevel", "UpdatedAt"]);
  ensureSheet_(ss, CONFIG.PROCESSED_SHEET,
    ["MessageId", "ProcessedAt"]);
}

function ensureSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
}

function getGeminiApiKey_() {
  const key = PropertiesService.getScriptProperties()
    .getProperty(CONFIG.GEMINI_API_KEY_PROPERTY);

  if (!key) throw new Error("Missing GEMINI_API_KEY in Script Properties.");
  return key;
}
