const {VertexAI} = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({project: 'please-help-me-study', location: 'us-central1'});
const model = 'gemini-1.5-pro-preview-0409';

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    'maxOutputTokens': 8192,
    'temperature': 1,
    'topP': 0.95,
  },
  safetySettings: [
    {
        'category': 'HARM_CATEGORY_HATE_SPEECH',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
        'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
        'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
        'category': 'HARM_CATEGORY_HARASSMENT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    }
  ],
});


async function generateContent(prompt) {
  const req = {
    contents: [
      {role: 'user', parts: [{text: `${prompt}`}]}
    ],
  };

  const streamingResp = await generativeModel.generateContentStream(req);
  //process.stdout.write('aggregated response: ' + JSON.stringify(await streamingResp.response));
  const response = await streamingResp.response;
  const text = response.candidates[0].content.parts[0].text;
  //process.stdout.write('\n\n' + JSON.stringify(text));
  return text;
}

module.exports = {
    generateContent
}