const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are a website-generation agent. Given a user's description of a website,
generate a COMPLETE, working, self-contained static website.

Rules:
- Output ONLY valid JSON, no markdown fences, no commentary before or after.
- JSON shape: { "appName": string, "files": [ { "path": string, "content": string } ] }
- Always include an "index.html" file that is a complete, valid HTML document.
- Inline all CSS in a <style> tag and all JS in a <script> tag inside index.html,
  UNLESS the site genuinely needs multiple pages — in that case create additional
  .html files and link between them with relative hrefs.
- Do NOT reference any external build tools, bundlers, or npm packages. Plain HTML/CSS/JS only.
- Make it visually complete and production-quality, not a placeholder — real layout,
  real copy text relevant to the prompt, real styling.
- Keep total output reasonably sized (a handful of files, not a sprawling app).`;

/**
 * Calls Gemini once to generate a complete static website from a prompt.
 * Returns { appName, files: [{ path, content }] }
 */
async function generateWebsite(prompt) {
  const model = genAI.getGenerativeModel({
   model: process.env.AI_MODEL || 'gemini-3.6-flash',
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      responseMimeType: 'application/json',
    },
  });

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  if (!text) {
    throw new Error('AI agent returned no text content');
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    // Recover if the model wrapped JSON in fences despite instructions.
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('AI agent response was not valid JSON');
    parsed = JSON.parse(match[0]);
  }

  if (!parsed.files || !Array.isArray(parsed.files) || parsed.files.length === 0) {
    throw new Error('AI agent response did not include any files');
  }
  if (!parsed.files.some((f) => f.path === 'index.html')) {
    throw new Error('AI agent response did not include an index.html');
  }

  return {
    appName: parsed.appName || 'Generated App',
    files: parsed.files,
  };
}

module.exports = { generateWebsite };
