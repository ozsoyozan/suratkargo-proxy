const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

const SURAT_API = 'https://api01.suratkargo.com.tr/api';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.get('/', (req, res) => res.send('Surat Kargo Proxy aktif'));

app.get('/myip', async (req, res) => {
  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();
  res.json(data);
});

app.post('/OrtakBarkodOlustur', async (req, res) => {
  try {
    const response = await fetch(`${SURAT_API}/OrtakBarkodOlustur`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ isError: true, Message: err.message });
  }
});

app.post('/KargoTakipHareketDetayi', async (req, res) => {
  try {
    const { CariKodu, Sifre, WebSiparisKodu } = req.query;
    const response = await fetch(
      `${SURAT_API}/KargoTakipHareketDetayi?CariKodu=${CariKodu}&Sifre=${Sifre}&WebSiparisKodu=${WebSiparisKodu}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' } }
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ isError: true, Message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy ${PORT} portunda çalışıyor`));
