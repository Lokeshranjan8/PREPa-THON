import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./routes/Landing";
import Login from "./routes/Login";

function App() {

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
  )
}

export default App;
