const ai = require('../lib/UseAI');

const grade = async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "prompt is required" });
    }
    const response = await ai.generateContent(`You are going now going to act as a judge to determine whether a website's text data contains "brainrot" or is generally productive. Please respond in one word. Here is the text: ${prompt}`);
    res.status(201).json({ response });
  };
  
  module.exports = {
    grade,
  };
  