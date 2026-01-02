import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const convertPhysicsText = async (inputText: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    const systemInstruction = `
      You are an expert Physics and Math Symbol Converter.
      Task: Replace "slash codes" in the text with their correct Unicode math/physics symbols.
      
      Rules:
      1. **Preserve Text:** Keep all Arabic and English words exactly as they are. Only change tokens starting with "/".
      2. **General Conversion:** Treat any other token starting with "/" (e.g., /alpha, /sum, /approx) as a standard LaTeX command and convert it to its visual Unicode symbol.
      3. **Fractions:** Convert "/frac{a}{b}" to Phsical text format by adding a fraction bar instead of slash or use fraction symbols if available.
      4. If a code looks like a standard LaTeX command (e.g., \`/leftarrow\`), convert it to its Unicode equivalent.
      5. If a code is completely unrecognized and does not resemble a math symbol request, leave it as is or try to approximate the best matching math symbol.
      6. If you find a sympol in LaTeX sympols than dosn't start with "/" convert it to it's sympol
      7. If you find "/frac{A}{B}" i want you to write the a fraction bar instead of a slash.

      Output: Return only the processed text string.
      **Input Example:**
      "القوة والزاوية /alpha. نحسب /sum القوى حيث /nabla V = 0. /lambda = 500/nm. A /rightarrow B."

      **Output Example:**
      "القوة والزاوية α. نحسب ∑ القوى حيث ∇ V = 0. λ = 500nm. A → B."
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: inputText,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.1, // Keep it deterministic
      },
    });

    return response.text || inputText;
  } catch (error) {
    console.error("Gemini Conversion Error:", error);
    throw error;
  }
};