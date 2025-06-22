const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// Моковые данные для новостей
const mockNews = [
  {
    id: 1,
    title: "Bitcoin hits $85,000 ATH!",
    description: "Massive institutional inflows push Bitcoin to new highs.",
    fullText: "Bitcoin's price reached unprecedented levels amid growing institutional adoption. Long-term bullish outlook remains strong.",
    aiStatus: "✅ Verified"
  },
  {
    id: 2,
    title: "Ethereum 2.0 fully deployed!",
    description: "Scalability upgrade successfully launched.",
    fullText: "Ethereum fully transitioned to proof-of-stake with sharding. Massive improvement in scalability and energy consumption.",
    aiStatus: "✅ Verified"
  },
  {
    id: 3,
    title: "Regulators investigate new DeFi project",
    description: "SEC looking into compliance of new DeFi platform.",
    fullText: "SEC is reviewing a new DeFi project for possible regulatory violations after a rapid token sale attracted huge attention.",
    aiStatus: "⚠️ Questionable"
  }
];

// Моковые данные для премиум-аналитики
const analytics = {
  gold: "$2,375",
  silver: "$29.85",
  platinum: "$1,020",
  palladium: "$1,410",
  sp500: "5,310"
};

app.get("/api/news", (req, res) => {
  res.json(mockNews);
});

app.get("/api/news/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = mockNews.find(n => n.id === id);
  if (item) res.json(item);
  else res.status(404).send("Not found");
});

app.get("/", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>GoGoAI Crypto News</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { font-family: 'Arial', sans-serif; background: #f5f7fa; margin: 0; padding: 0; }
      .header { background: #111; color: white; padding: 15px; text-align: center; font-size: 20px; }
      .analytics { background: #fff3cd; padding: 10px; font-size: 14px; text-align: center; }
      .news-list { padding: 10px; }
      .card { background: white; padding: 15px; margin-bottom: 10px; border-radius: 10px; box-shadow: 0 0 5px rgba(0,0,0,0.1); }
      .card-title { font-weight: bold; font-size: 16px; margin-bottom: 5px; }
      .card-desc { margin-bottom: 10px; }
      .ai-status { font-weight: bold; }
      .button { padding: 10px; background: #ff6600; color: white; border: none; border-radius: 5px; font-weight: bold; width: 100%; }
    </style>
  </head>
  <body>
    <div class="header">🐰 GoGoAI Crypto News</div>
    <div class="analytics">
      Gold: ${analytics.gold} | Silver: ${analytics.silver} | Platinum: ${analytics.platinum} | Palladium: ${analytics.palladium} | S&P500: ${analytics.sp500}
    </div>
    <div class="news-list" id="news"></div>

    <script>
      async function loadNews() {
        const res = await fetch('/api/news');
        const data = await res.json();
        const container = document.getElementById('news');
        data.forEach(item => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = \`
            <div class="card-title">\${item.title}</div>
            <div class="card-desc">\${item.description}</div>
            <div class="ai-status">\${item.aiStatus}</div>
            <button class="button" onclick="window.location.href='/news/\${item.id}'">OPEN</button>
          \`;
          container.appendChild(card);
        });
      }
      loadNews();
    </script>
  </body>
  </html>
  `);
});

app.get("/news/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = mockNews.find(n => n.id === id);
  if (!item) return res.status(404).send("Not found");
  res.send(`
  <html>
  <head>
    <title>${item.title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { font-family: 'Arial', sans-serif; background: #f5f7fa; margin: 0; padding: 0; }
      .header { background: #111; color: white; padding: 15px; text-align: center; font-size: 20px; }
      .card { background: white; padding: 15px; margin: 15px; border-radius: 10px; box-shadow: 0 0 5px rgba(0,0,0,0.1); }
      .title { font-weight: bold; font-size: 18px; margin-bottom: 10px; }
      .desc { margin-bottom: 15px; }
      .ai-status { font-weight: bold; color: green; }
      .affiliate { background: #ffeaa7; padding: 10px; border-radius: 10px; margin-top: 20px; }
      .button { margin-top: 15px; padding: 10px; background: #ff6600; color: white; border: none; border-radius: 5px; font-weight: bold; width: 100%; }
    </style>
  </head>
  <body>
    <div class="header">📰 News Details</div>
    <div class="card">
      <div class="title">${item.title}</div>
      <div class="desc">${item.fullText}</div>
      <div class="ai-status">AI: ${item.aiStatus}</div>
      <div class="affiliate">
        Affiliate Offers:<br/>
        - <a href="https://binance.com" target="_blank">Trade on Binance</a><br/>
        - <a href="https://ledger.com" target="_blank">Store Crypto Securely</a>
      </div>
      <button class="button" onclick="alert('Forum coming soon!')">DISCUSS</button>
    </div>
  </body>
  </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
