const path = require('path');
const { Ollama } = require('ollama');
const express = require('express');

const router = express.Router();

const ollama = new Ollama({ host: 'http://127.0.0.1:11434'})
async function fetchChatResponse() {
  const response = await ollama.chat({
  model: 'llama3.2:latest',
  messages: [{ role: 'user', content: 'Give 3 short sentences about current finance news' }],
  })
  return response.message.content;
}

router.get('/news', async (req, res, next) => {
  try{
    const news = await fetchChatResponse();
    res.render(path.join(__dirname, '../', 'views', 'news.ejs'), {
              pageTitle: 'AI Finance News',
              aiNews: news
          })
    } catch(err){
      console.log(err);
    }
})

module.exports = router;
