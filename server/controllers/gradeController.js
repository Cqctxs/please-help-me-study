const ai = require('../lib/UseAI');

const grade = async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "prompt is required" });
    }
    const response = await ai.generateContent(prompt);
    res.status(201).json({ response });
  };
  
  module.exports = {
    grade,
  };
  