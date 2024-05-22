import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const { imageData } = await req.json();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
  const prompt = "Find the closest matching human emoji with a face to this image. Only one emoji will be returned. If no emoji is found, the response will be empty.";
  const image = {
    inlineData: {
      data: imageData,
      mimeType: "image/png",
    },
  };

  const result = await model.generateContent([prompt, image]);
  console.log(result.response.text());

  return new Response(result.response.text(), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
