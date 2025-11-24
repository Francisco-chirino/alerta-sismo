const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// VAPID keys generated
const publicVapidKey = 'BHRVIb_laKbPLditm4OYseSZB3wwjwvaBhRGYSWnjNKYlje8H7uDeyTVGzJpqRXZzy9HRPAXRDbDMBj_aUIHmes';
const privateVapidKey = 'O-UYInsidPwKX9UXat9G7u_VQTv8y17q0N1T5iVBeck';

webpush.setVapidDetails(
  'mailto:test@example.com',
  publicVapidKey,
  privateVapidKey
);

// Store subscriptions in memory (in production use a database)
let subscriptions = [];

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post('/trigger-alert', (req, res) => {
  const payload = JSON.stringify({ title: 'ALERTA SISMICA', body: 'Se ha detectado un sismo. Mantenga la calma y busque un lugar seguro.' });

  const promises = subscriptions.map(sub =>
    webpush.sendNotification(sub, payload).catch(err => {
      console.error('Error sending notification, removing subscription', err);
      // Remove failed subscription (simplified)
      subscriptions = subscriptions.filter(s => s !== sub);
    })
  );

  Promise.all(promises).then(() => res.json({ success: true }));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
