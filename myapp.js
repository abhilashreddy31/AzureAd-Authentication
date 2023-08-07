const express = require('express');
const session = require('express-session');
const AzureAuth = require('./AzureAuth');

const app = express();
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

const clientId = '0bcb521d-fd86-4cb1-889c-bbc25ee0610b';
const tenantId = '499881f9-8819-451e-ace7-4e600b7fc3e9';
const scopes = ['openid', 'profile', 'email'];

const azureAuth = new AzureAuth();
azureAuth.setConfig(clientId, tenantId);

app.get('/', async (req, res) => {
  try {
    // Check if the user is already authenticated
    if (req.session.accessToken) {
      // User is authenticated, you can use the access token for API calls
      const accessToken = req.session.accessToken;
      // Your logic here to use the access token for API calls

      res.send('Authenticated');
    } else {
      // User is not authenticated, redirect to Azure AD for authentication
      const authUrl = await azureAuth.authClient.getAuthCodeUrl({
        scopes,
        redirectUri: 'http://localhost:3000/auth/callback', // Specify your redirect URI
      });
      res.redirect('home.html');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/auth/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const authResult = await this.authClient.acquireTokenSilent({
        scopes,
        account: accounts[0], // Use the first account found
        clientSecret: 'hzD8Q~lL1Kz0LrkWsnHaLvsFWa~2lkGzWe_qscVq', // Provide your client secret here
      });
      

    // Store the access token in the session
    req.session.accessToken = authResult.accessToken;

    res.redirect('/home.html');
  } catch (error) {
    res.status(500).send(error.message, 'ubui');
  }
});

app.get('/logout', (req, res) => {
  // Clear the session and log out the user
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
