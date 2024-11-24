// script.js

document.getElementById("audio-upload-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form from reloading the page
  
    // Get the selected file
    const fileInput = document.getElementById("audio-file");
    const file = fileInput.files[0];
    
    if (!file) {
      alert("Please select an audio file.");
      return;
    }
  
    // Disable the button while processing
    const uploadButton = document.getElementById("upload-button");
    uploadButton.textContent = "Uploading...";
    uploadButton.disabled = true;
  
    try {
      // Prepare the form data
      const formData = new FormData();
      formData.append("audio_file", file);
  
      // Make the POST request to the webhook
      const response = await fetch("https://hook.eu2.make.com/hynvat7x7zymjjz4d8es8q1wyco98q7i", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload file. Please try again.");
      }
  
      // Get the plain text response
      const result = await response.text();
  
      // Display the response in the container
      document.getElementById("response").textContent = result;
      document.getElementById("response-container").style.display = "block";
    } catch (error) {
      alert(error.message);
    } finally {
      // Reset the button
      uploadButton.textContent = "Upload & Analyze";
      uploadButton.disabled = false;
    }
  });
  