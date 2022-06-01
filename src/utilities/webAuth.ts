import auth0 from 'auth0-js'

export const webAuth = new auth0.WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
  redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
  responseType: 'token id_token',
  scope: 'openid profile email',
})
