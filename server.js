const express = require('express');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

const configuration = new Configuration({
    apiKey: process.env.apiKey
});
const openai = new OpenAIApi(configuration);


app.get('/listModels', async (req, res) => {
  try {
    const response = await openai.listModels();
    res.json({
      models: response.data.data
    });
  } catch (error) {
    res.status(500).send('Error getting engines from OpenAI API');
  }
});

app.get('/listFiles', async (req, res) => {
  try {
    const response = await openai.listFiles();
    res.json({
      files: response.data.data
    });
  } catch (error) {
    res.status(500).send('Error getting engines from OpenAI API');
  }
});

app.post('/prompt', async (req, res) => {
  try {
    const { prompt, model } = req.body;
    console.log(`Prompt: ${prompt}, Model: ${model}`);
    const response = await openai.createCompletion({
      model: model || 'text-davinci-003',
      prompt,
      max_tokens: 256,
      // temperature: 0.5
    });

    // Send the response from the OpenAI API back to the client
    console.log('Response: ', response.data.choices[0].text);
    res.json({
      message: response.data.choices[0].text.replace(/(\r\n|\n|\r)/gm, "")
    });
  } catch (error) {
    res.status(500).send('Error sending prompt to OpenAI API');
  }
});

app.listen(1337, () => {
  console.log('Server listening on port 1337');
});