import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "শুধু POST অনুরোধ গ্রহণযোগ্য।" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "সার্ভারে GEMINI_API_KEY সেট করা নেই।" });
  }

  try {
    const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
    if (!message) {
      return res.status(400).json({ error: "অনুগ্রহ করে একটি প্রশ্ন লিখুন।" });
    }
    if (message.length > 4000) {
      return res.status(413).json({ error: "প্রশ্নটি খুব বড়। ৪০০০ অক্ষরের মধ্যে লিখুন।" });
    }

    const prompt = `You are Doctor AI, a careful educational assistant for Bengali and English speakers.
Answer in the same language as the user's question. Help with medical learning, exam practice, and general health education.
Be accurate, clear, and appropriately cautious. Never claim certainty when uncertain. Do not provide a definitive diagnosis or prescribe personalized treatment. Encourage a qualified clinician for personal medical concerns and emergency services for urgent symptoms. Do not ask users to share identifying patient information.
User question: ${message}`;

    const response = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: prompt
    });

    return res.status(200).json({ reply: response.output_text || "দুঃখিত, এই মুহূর্তে উত্তর তৈরি করা যায়নি।" });
  } catch (error) {
    console.error("Doctor AI request failed:", error?.message || "unknown error");
    return res.status(500).json({ error: "AI উত্তর তৈরি করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।" });
  }
}
