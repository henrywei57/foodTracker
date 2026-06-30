const FIXED_PROMPT = "Analyze this image of my food and tell me the calorie and protein.";

async function uploadToGemini(file) {
  const reader = new FileReader();

  reader.onload = async function () {
    const base64 = reader.result.split(",")[1];

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AQ.Ab8RN6KWNQXllfhguIcMDpa8T0K7qcm4wpuLODbUpFafE7C_Zw",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: FIXED_PROMPT },
                {
                  inline_data: {
                    mime_type: file.type,
                    data: base64
                  }
                }
              ]
            }
          ]
        })
      }
    );

    const data = await res.json();

    document.getElementById("output").innerText =
      data.candidates[0].content.parts[0].text;
  };

  reader.readAsDataURL(file);
}