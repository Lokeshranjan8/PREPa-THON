import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./routes/Landing";
import { Display } from "./routes/Display";
import Signup from "./routes/Signup";
import Login from "./routes/Login"
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/display",
      element: <Display />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
