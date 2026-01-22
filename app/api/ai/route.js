
import axios from "axios";

// Load Gemini API key from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req) {
  try {
    const metrics = await req.json();
    // const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
     if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is missing');
     } 

   const prompt = `
Analyse les ventes avec ces données :
Stock: ${metrics.totalStock}
Valeur stock: ${metrics.stockValue} MAD
Ventes: ${metrics.soldProducts}
Chiffre d'affaires: ${metrics.salesValue} MAD

Donne un commentaire professionnel en 1 phrase.
`;


    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const comment =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    return new Response(
      JSON.stringify({ comment: comment || "Analyse indisponible." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Gemini API error:", error.response?.data || error.message);

    return new Response(
      JSON.stringify({ message: "AI analysis failed" }),
      { status: 500 }
    );
  }
}
