const express = require('express');
const redis = require('redis');
const path = require('path');
const PORT = process.env.PORT || 5173;

const app = express();
const client = redis.createClient();

client.set('visitorCount', 0);

app.use((req, res, next) => {
  client.incr('visitorCount', (err, count) => {
    if (err) {
      console.error('Error incrementing visitor count:', err);
      res.status(500).send('Error incrementing visitor count');
      return;
    }
    next();
  });
});

app.get('/visitorCount', (req, res) => {
  client.get('visitorCount', (err, count) => {
    if (err) {
      console.error('Error retrieving visitor count:', err);
      res.status(500).send('Error retrieving visitor count');
      return;
    }
    res.json({ count: parseInt(count) });
  });
});

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
