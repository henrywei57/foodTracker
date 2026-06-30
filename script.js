const API_KEY = "AQ.Ab8RN6KWNQXllfhguIcMDpa8T0K7qcm4wpuLODbUpFafE7C_Zw"; // ⚠️ put your key here

// 🔥 FIXED PROMPT (you said no custom prompt)
const FIXED_PROMPT = "Analyze this image's food and output in this format 'Calories: [] Protein: [].";

async function analyzeImage() {
  const file = document.getElementById("imageInput").files[0];
  const output = document.getElementById("output");
  const status = document.getElementById("status");

  if (!file) {
    alert("Please upload an image");
    return;
  }

  status.innerText = "Analyzing...";

  const reader = new FileReader();

  reader.onload = async function () {
    const base64 = reader.result.split(",")[1];

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

      const text = data.candidates[0].content.parts[0].text;

      output.innerText = text;
      status.innerText = "";

    } catch (err) {
      status.innerText = "Error occurred";
      output.innerText = err.message;
    }
  };

  reader.readAsDataURL(file);
}