import {
  createBrowserRouter,
 
} from "react-router-dom";
import Root from "./Root";
import Home from "../Pages/Home/Home";
import AllUsers from "../Pages/Home/AllUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children : [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/alluser",
        element: <AllUsers></AllUsers>,
      }
    ]
  },
]);