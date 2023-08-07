const msalConfig = {
    auth: {
      clientId: '0bcb521d-fd86-4cb1-889c-bbc25ee0610b',
      authority: 'https://login.microsoftonline.com/499881f9-8819-451e-ace7-4e600b7fc3e9',
      redirectUri: 'http://localhost:3000/redirect.html',
    },
    cache: {
      cacheLocation: 'localStorage',
    },
  };
  
  const msalInstance = new msal.PublicClientApplication(msalConfig);
  
  async function login() {
    try {
      const loginRequest = {
        scopes: ['openid', 'profile'],
      };
  
      const authResponse = await msalInstance.loginPopup(loginRequest);
      console.log('Authentication successful:', authResponse);
      window.location.href = 'home.html';
  
    } catch (error) {
      console.log('An error occurred during login:', error);
    }
  }
  async function logout() {
    try {
      const loginRequest = {
        scopes: ['openid', 'profile'],
      };
  
      const authResponse = await msalInstance.logout();
      console.log('logout successful:', authResponse);
      window.location.href = '/';
      
      // Redirect to the protected page or perform additional actions
  
    } catch (error) {
      console.log('An error occurred during logout:', error);
    }
  }
  