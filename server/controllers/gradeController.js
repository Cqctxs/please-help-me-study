const ai = require('../lib/UseAI');

const grade = async (req, res) => {
    const { prompt, source } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "prompt is required" });
    }
    if (!source) {
      return res.status(400).json({ error: "source is required" });
    }
    if (source === "http://localhost:3000/" || source === "https://pleasehelpme.study/" || source === "http://localhost:3000/problem" || source === "https://pleasehelpme.study/problem") {
      return res.status(201).json({ response: "productive" });
    }
    const response = await ai.generateContent(`You are going now going to act as a judge to determine whether a website's text data contains "brainrot" or is generally productive. Please respond in one word. The text is from this website: ${source} Here is the text: ${prompt}`);
    res.status(201).json({ response });
  };
  
  module.exports = {
    grade,
  };