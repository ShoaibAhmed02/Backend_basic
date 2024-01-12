const Tesseract = require("tesseract.js");
// const axios = require('axios');

Tesseract.recognize("./uploads/Capture.png")
  .then(async function (result) {
    const text = result.data.text;
    // const data = await chatGPT(text);
    console.log("Extracted text is:", text);
  })
  .catch(function (err) {
    console.error("Error during OCR:", err);
  });

const prompt = "tell me a joke";

const API_KEY = "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";

async function generateChatResponse(prompt) {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    };

    const data = {
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    };

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      data,
      { headers }
    );

    const responseData = response.data;
    return responseData.choices[0].message.content;
  } catch (error) {
    throw new Error(`Error calling OpenAI API: ${error.message}`);
  }
}

// Usage example
(async () => {
  try {
    const user_input = "tell me a joke"; // Replace with your actual user input
    const response = await generateChatResponse(user_input);
    console.log("ChatGPT:", response);
  } catch (error) {
    console.error(error.message);
  }
})();
