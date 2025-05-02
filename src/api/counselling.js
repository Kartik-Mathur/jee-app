const express = require("express");
const { google } = require("googleapis");

const router = express.Router();

const auth = new google.auth.JWT(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  ["https://www.googleapis.com/auth/spreadsheets"]
);

const sheets = google.sheets({ version: "v4", auth });

router.post("/", async (req, res) => {
  const { name, email, phone, rank, preferences } = req.body;

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [
            name,
            email,
            phone,
            rank,
            preferences,
            new Date().toLocaleString(),
          ],
        ],
      },
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Google Sheets Error:", err.message);
    return res.status(500).json({ error: "Failed to write to Google Sheet." });
  }
});

module.exports = router;
