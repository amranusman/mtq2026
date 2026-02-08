
/**
 * SISTEM e-MTQ PROV. SULAWESI SELATAN - BACKEND ENGINE V3.0
 * Fitur: Multi-Entity Sync & Audit Trail
 */

const SHEETS = {
  PESERTA: "Peserta",
  HAKIM: "DewanHakim",
  EVENTS: "Events",
  INFO: "Pengumuman",
  USERS: "Users"
};

function getSheetSafe(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    setupInitialData();
    sheet = ss.getSheetByName(name);
  }
  return sheet;
}

function setupInitialData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const setup = (name, headers, color) => {
    let sheet = ss.getSheetByName(name) || ss.insertSheet(name);
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers])
           .setFontWeight("bold").setBackground(color).setFontColor("white");
      sheet.setFrozenRows(1);
    }
  };

  setup(SHEETS.PESERTA, ["ID", "NIK", "Nama Lengkap", "Gender", "Wilayah", "Kecamatan", "Cabang ID", "Status", "Tahun", "Skor", "Log_Verifikasi", "Last_Update"], "#059669");
  setup(SHEETS.HAKIM, ["ID", "NIK", "Nama Hakim", "Wilayah", "Spesialisasi", "Status", "WhatsApp", "Last_Update"], "#1e293b");
  setup(SHEETS.EVENTS, ["ID", "Nama Event", "Level", "Tahun", "Status", "Batas_Usia", "Mulai", "Selesai"], "#0284c7");
  setup(SHEETS.INFO, ["ID", "Judul", "Konten", "Tanggal", "Status", "Target", "Aktif", "Author"], "#dc2626");

  return "✅ Database e-MTQ Sulawesi Selatan Siap!";
}

function doGet(e) {
  if (!e || !e.parameter || !e.parameter.action) {
    return createJsonResponse({ status: "ONLINE", message: "e-MTQ Sulsel Engine is Running." });
  }

  const action = e.parameter.action;
  try {
    switch (action) {
      case "getInitialData": 
        return createJsonResponse({
          participants: getAllData(SHEETS.PESERTA),
          judges: getAllData(SHEETS.HAKIM),
          events: getAllData(SHEETS.EVENTS),
          announcements: getAllData(SHEETS.INFO)
        });
      case "status": 
        return createJsonResponse({ status: "ONLINE", version: "3.0.0" });
      default: 
        return createJsonResponse({ error: "Action not found" });
    }
  } catch (err) {
    return createJsonResponse({ error: err.message });
  }
}

function doPost(e) {
  try {
    if (!e.postData || !e.postData.contents) {
       return createJsonResponse({ success: false, message: "No data received" });
    }
    const request = JSON.parse(e.postData.contents);
    const { action, payload } = request;

    switch (action) {
      case "saveParticipant": 
        return createJsonResponse(upsertData(SHEETS.PESERTA, payload, 0)); // ID di kolom A (index 0)
      case "saveJudge": 
        return createJsonResponse(upsertData(SHEETS.HAKIM, payload, 0));
      case "saveEvent": 
        return createJsonResponse(upsertData(SHEETS.EVENTS, payload, 0));
      case "saveAnnouncement": 
        return createJsonResponse(upsertData(SHEETS.INFO, payload, 0));
      default: 
        return createJsonResponse({ success: false, message: "Invalid action" });
    }
  } catch (err) {
    return createJsonResponse({ success: false, message: err.message });
  }
}

/**
 * Update data jika ID ditemukan, atau Tambah jika tidak ada.
 */
function upsertData(sheetName, data, idIndex) {
  const sheet = getSheetSafe(sheetName);
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  
  // Tambahkan timestamp update
  data.last_update = new Date().toISOString();
  
  // Format data sesuai urutan header
  const rowToSave = headers.map(h => {
    const key = h.toLowerCase().replace(/ /g, "_");
    let val = data[key];
    if (typeof val === 'object' && val !== null) return JSON.stringify(val);
    return val !== undefined ? val : "";
  });

  // Cari index berdasarkan ID
  let foundRow = -1;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][idIndex].toString() === data.id.toString()) {
      foundRow = i + 1;
      break;
    }
  }

  if (foundRow > 0) {
    sheet.getRange(foundRow, 1, 1, rowToSave.length).setValues([rowToSave]);
    return { success: true, mode: "UPDATE" };
  } else {
    sheet.appendRow(rowToSave);
    return { success: true, mode: "INSERT" };
  }
}

function getAllData(sheetName) {
  const sheet = getSheetSafe(sheetName);
  const rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return [];
  const headers = rows.shift();
  return rows.map(r => {
    let obj = {};
    headers.forEach((h, i) => {
      const key = h.toLowerCase().replace(/ /g, "_");
      let val = r[i];
      // Auto-parse JSON string jika kolom berisi object
      try {
        if (typeof val === 'string' && (val.startsWith('{') || val.startsWith('['))) {
          val = JSON.parse(val);
        }
      } catch(e) {}
      obj[key] = val;
    });
    return obj;
  });
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
