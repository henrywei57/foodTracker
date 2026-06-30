const API_KEY = "AQ.Ab8RN6KWNQXllfhguIcMDpa8T0K7qcm4wpuLODbUpFafE7C_Zw"; // ⚠️ replace this

async function runGemini() {
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");
  const status = document.getElementById("status");

  if (!input) return;

  output.innerText = "";
  status.innerText = "Thinking...";

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: input }]
            }
          ]
        })
      }
    );

    const data = await res.json();

    const text = data.candidates[0].content.parts[0].text;

    output.innerText = text;
    status.innerText = "";

  } catch (err) {
    status.innerText = "Error occurred";
    output.innerText = err.message;
  }
}