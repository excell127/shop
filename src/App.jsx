import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={"/home"} />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
