import { google } from "googleapis";
import secret from "../../secrets.json";

export default function handler(req, res) {
  try {
    const client = new google.auth.JWT(
      secret.client_email,
      null,
      secret.private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    client.authorize(async function (err, tokens) {
      if (err) {
        return res.status(400).send(JSON.stringify({ error: true }));
      }

      const gsapi = google.sheets({ version: "v4", auth: client });

      //CUSTOMIZATION FROM HERE
      const opt = {
        spreadsheetId: "1xGOcVbS-Ys8pOPJVswxJMFG8qznRwWF8--DrqFuyrCE",
        range: "Hoja1!A2:V99",
      };

      let data = await gsapi.spreadsheets.values.get(opt);
      return res
        .status(400)
        .send(JSON.stringify({ error: false, data: data.data.values }));
    });
  } catch (e) {
    return res
      .status(400)
      .send(JSON.stringify({ error: true, message: e.message }));
  }
}
