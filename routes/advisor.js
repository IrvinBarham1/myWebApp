const path = require('path');

const express = require('express');

const router = express.Router();

const getDb = require('../util/database').getDb;

const { Ollama } = require('ollama');

const ollama = new Ollama({ host: 'http://127.0.0.1:11434'})

async function fetchChatResponse(userMsg) {
  const response = await ollama.chat({
  model: 'llama3.2:latest',
  messages: [{ role: 'user', content: userMsg }],
  })
  console.log(">>> AI Response Generated")
  return response.message.content;
}

router.post('/ai-response', async (req, res, next) => {
    try {
        console.log(">>> User Chat Logged");
        const response = await fetchChatResponse(req.body.message);
        res.json({ response });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error fetching AI response' });
      }
})

router.get('/advisor', (req, res, next) => {
    res.render(path.join(__dirname, '../', 'views', 'advisor.ejs'), {
        pageTitle: 'AI Chat',
    })
})

module.exports = router;