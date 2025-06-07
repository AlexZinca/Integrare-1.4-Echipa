const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors()); // permite cereri din browser

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Eroare la OpenAI');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
