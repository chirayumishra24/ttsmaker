// ⚠️ put your real Render backend URL here:
const API_BASE_URL = "https://ttsmaker-t8h5.onrender.com";

const textInput = document.getElementById("textInput");
const generateBtn = document.getElementById("generateBtn");
const statusText = document.getElementById("statusText");
const audioWrapper = document.getElementById("audioWrapper");
const audioPlayer = document.getElementById("audioPlayer");
const downloadLink = document.getElementById("downloadLink");

async function generateSpeech() {
  const text = textInput.value.trim();
  if (!text) {
    statusText.textContent = "Please enter some text.";
    return;
  }

  generateBtn.disabled = true;
  statusText.textContent = "Generating audio...";
  audioWrapper.style.display = "none";

  try {
    const res = await fetch(`${API_BASE_URL}/api/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Server error");
    }

    const arrayBuffer = await res.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);

    audioPlayer.src = url;
    downloadLink.href = url;

    audioWrapper.style.display = "block";
    statusText.textContent = "Done!";
  } catch (err) {
    console.error(err);
    statusText.textContent = "Error: " + err.message;
  } finally {
    generateBtn.disabled = false;
  }
}

generateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  generateSpeech();
});

