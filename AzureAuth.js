const { PublicClientApplication } = require('@azure/msal-node');


class AzureAuth {
  constructor() {
    this.authClient = null;
  }

  setConfig(clientId, tenantId, options = {}) {
    this.clientId = clientId;
    this.tenantId = tenantId;
    this.authClient = new PublicClientApplication({
      auth: {
        clientId: this.clientId,
        authority: `https://login.microsoftonline.com/${this.tenantId}`,
      },
      ...options, // Merge additional options
    });
  }

  async getToken(scopes, account = null) {
    const accounts = await this.authClient.getTokenCache().getAllAccounts();
    if (accounts.length === 0) {
      throw new Error('No accounts found. Please sign in first.');
    }

    const authResult = await this.authClient.acquireTokenSilent({
      scopes,
      account: account || accounts[0],
    });

    if (!authResult || !authResult.accessToken) {
      throw new Error('Failed to acquire access token.');
    }

    return authResult.accessToken;
  }

  // Add more methods as needed for refreshing tokens, revoking tokens, etc.
}

module.exports = AzureAuth;