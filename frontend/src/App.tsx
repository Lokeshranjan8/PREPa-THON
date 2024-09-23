import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login";
import Landing from "./routes/Landing";
import { Display } from "./routes/Display";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/display",
      element: <Display />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
