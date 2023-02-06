const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { google } = require('googleapis');
const app = express();

// Replace YOUR_CLIENT_ID and YOUR_CLIENT_SECRET with your own values
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  `${process.env.BASE_URL}:${process.env.PORT}/Callback`
);

app.use(cors())

app.get('/', (req, res) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'],
  });

  res.redirect(url);
});

app.get('/Callback', async (req, res) => {
  const { code } = req.query;

  const { tokens } = await oAuth2Client.getToken();
  console.log(tokens)
  res.send(tokens);
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});
