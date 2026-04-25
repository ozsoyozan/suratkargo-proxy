const https = require('https');
https.get('https://api.ipify.org', (res) => {
  res.on('data', (d) => console.log('SUNUCU IP:', d.toString()));
});
