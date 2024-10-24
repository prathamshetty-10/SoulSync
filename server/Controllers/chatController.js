import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';



async function sendMessageToGemini(message) {
  try {
    // Initialize the model (Gemini 1.5 Pro)
    const key=process.env.GOOGLE_API_KEY;
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Send the message and get the response
    const result = await model.generateContent(message);
    const response = await result.response;

    // Return the generated text
    return response.text();
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    throw error;
  }
}

// Example usage



export const sendMesg = async (req, res, next) => {
  try {
    const  {message}=req.body;
    const response = await sendMessageToGemini(message);
    console.log("Gemini's response:", response);
    return res.status(200).json({resp:response});
    
  } catch (err) {
    console.error("Error occurred:", err.response ? err.response.data : err.message);

    // Return detailed error message to client
    return res.status(200).json({
      resp:"Please try again in some time"
    });
  }
};








