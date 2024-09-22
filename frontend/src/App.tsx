<<<<<<< HEAD
//app.tsx
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
=======
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./routes/Landing";
import Login from "./routes/Login";
>>>>>>> 6a9376a90ed64f0b90cada8808d2372fbfc37b7f

import LoginComponent from './LoginComponent';
function App() {
<<<<<<< HEAD
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
=======

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing/>
    },
    {
      path: '/login',
      element: <Login/>
    }
  ])

  return (
    <RouterProvider router={router}/>
>>>>>>> 6a9376a90ed64f0b90cada8808d2372fbfc37b7f
  )
}

export default App;
