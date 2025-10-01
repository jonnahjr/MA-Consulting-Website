import { Router } from 'express'
import fetch from 'node-fetch'

const router = Router();

router.post('/', async (req, res) => {
  const { message } = req.body as any;
  if (!message) return res.status(400).json({ error: 'Message required' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // fallback simple assistant
    return res.json({ reply: `I received your message: "${message}". We're a premium consulting firm — how can we help you further?` });
  }

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: message }], max_tokens: 400 })
    })
    const data = await resp.json();
    const reply = data?.choices?.[0]?.message?.content || 'Sorry, no reply';
    res.json({ reply });
  } catch (err){
    res.status(500).json({ error: 'AI request failed' })
  }
});

export default router;
