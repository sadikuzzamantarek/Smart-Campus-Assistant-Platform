import axios from "axios";

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || "/api/chat";

export async function sendChatMessage(question) {
  const response = await axios.post(
    CHAT_API_URL,
    { question },
    {
      headers: { "Content-Type": "application/json" },
      timeout: 60000,
    }
  );

  const data = response.data;

  if (data?.answer) {
    return data.answer;
  }

  throw new Error("No answer received from the chat API.");
}
