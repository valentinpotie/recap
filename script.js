// script.js

let mediaRecorder;
let audioChunks = [];

// Buttons
const recordButton = document.getElementById("record-button");
const stopButton = document.getElementById("stop-button");
const responseContainer = document.getElementById("response-container");
const responseText = document.getElementById("response");

// Audio recording management
recordButton.addEventListener("click", async () => {
  try {
    // Request microphone access
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Configure MediaRecorder
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    // Collect audio data
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    // Update button states
    recordButton.classList.add("hidden");
    stopButton.classList.remove("hidden");

    console.log("Recording started...");
  } catch (error) {
    alert("Error: Unable to access the microphone.");
  }
});

stopButton.addEventListener("click", () => {
  // Stop the recording
  mediaRecorder.stop();

  // Update button states
  stopButton.classList.add("hidden");
  recordButton.classList.remove("hidden");

  mediaRecorder.onstop = async () => {
    console.log("Recording stopped.");

    // Create an audio file
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    const formData = new FormData();
    formData.append("audio_file", audioBlob, "recorded_audio.webm");

    // Reset audio chunks
    audioChunks = [];

    // Send the audio file to the webhook
    try {
      const response = await fetch("https://hook.eu2.make.com/hynvat7x7zymjjz4d8es8q1wyco98q7i", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error analyzing the audio file.");

      const result = await response.text();
      responseText.textContent = result;
      responseContainer.classList.remove("hidden");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
});

// File upload management
document.getElementById("audio-upload-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("audio-file");
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select an audio file.");
    return;
  }

  const formData = new FormData();
  formData.append("audio_file", file);

  try {
    const response = await fetch("https://hook.eu2.make.com/hynvat7x7zymjjz4d8es8q1wyco98q7i", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Error analyzing the audio file.");

    const result = await response.text();
    responseText.textContent = result;
    responseContainer.classList.remove("hidden");
  } catch (error) {
    alert("Error: " + error.message);
  }
});
