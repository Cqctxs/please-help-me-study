const ai = require("../lib/UseAI");

const generate = async (req, res) => {
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({ error: "topic is required" });
  }
  const response = await ai.generateContent(
    `Create a fun problem about ${topic} that you think would be interesting to solve. Make sure to include the problem and the solution in JSON formatting. It should look something like this: { "problem": "How many moles of oxygen is required to have a total mass of 16.00 grams?", "solution": "The answer is 1 mole. This is because the molar mass of oxygen is 16.00 g/mol, so multiplying by 1 mol will give 16.00 grams" } `
  );
  res.status(201).json({ response });
};

const answer = async (req, res) => {
  const { userResponse, solution } = req.body;
  if (!userResponse) {
    return res.status(400).json({ error: "no user solution recieved" });
  }
  if (!solution) {
    return res.status(400).json({ error: "no solution recieved for the problem" });
  }
  const response = await ai.generateContent(
    `You are going now going to act as a teacher to grade a student's response to a problem. The solution is: ${solution}. The student's response is: ${userResponse}. Please give constructive criticism and a percentage grade.`
  );
  res.status(201).json({ response });
};

module.exports = {
  generate,
  answer,
};
