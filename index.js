const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

let vapidKeys = webpush.generateVAPIDKeys();
console.log('vapidKeys, ', vapidKeys);

vapidKeys =  {
  publicKey: 'BB0W9tHrLURegsBMCt5Bbxu0aHNndIjIJfCizFzYQiMDzfzqTfRWcR08nLqn6N8QWeaeMmXv2j38cTKea2m8LX4',
  privateKey: 'nhrbQO3DAVpDogAra4mMqfetANctN5RShIoG40Bl0hI'
}

webpush.setVapidDetails(
  "mailto:test@test.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
  // publicVapidKey,
  // privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  console.log('subscribe called');
  
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ "notification": { title: "Push Test" }, title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
