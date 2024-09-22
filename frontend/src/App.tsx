//app.tsx
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

import LoginComponent from './LoginComponent';
function App() {
  return(
    <Auth0Provider
      domain="dev-gkei5fgd6dcn46fx.us.auth0.com"
      clientId="aXVeTO0iqtSNhx1q6gc1HMZqTNR3FOkw"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <LoginComponent />


    </Auth0Provider>
  )
}

export default App;
