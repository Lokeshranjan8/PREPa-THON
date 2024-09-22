import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Login from "./routes/Login";
import Landing from "./routes/Landing";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/login",
      element: (
        <Auth0Provider
          domain="dev-gkei5fgd6dcn46fx.us.auth0.com"
          clientId="aXVeTO0iqtSNhx1q6gc1HMZqTNR3FOkw"
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <Login />
        </Auth0Provider>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
