const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

//  Middleware-uri
app.use(express.json());

//  FIX CORS — permite cereri de oriunde (sau setează un domeniu specific mai jos)
app.use(cors({
  origin: 'https://alexzinca.github.io', // sau înlocuiește cu 'https://alexzinca.github.io' pentru securitate
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

//  Endpoint pentru frontend
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Mesajul este gol.' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content;
    res.json({ reply });
  } catch (err) {
    console.error('Eroare OpenAI:', err.response?.data || err.message);
    res.status(500).json({ error: 'Eroare la OpenAI' });
  }
});

//  Port din Render sau fallback local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Serverul rulează pe portul ${PORT}`);
});
