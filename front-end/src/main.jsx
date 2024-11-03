import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
// import Layout from "./Layout/Layout";
import Home from "./Pages/Home/Home";
import AuthProvider from "./Firebase/AuthProvider";
import PrivateRoute from "./Firebase/PrivateRoute";
import UserProfile from "./Components/UserProfile";
import Pins from "./Pages/Home/Pins";
import Feed from "./Components/Feed";
import PinDetails from "./Components/PinDetails";
import CreatePin from "./Components/CreatePin";
import Search from "./Components/Search";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home></Home>
      </PrivateRoute>
    ),
    errorElement: <></>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Pins></Pins>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/create-pin",
            element: (
              <PrivateRoute>
                <CreatePin></CreatePin>
              </PrivateRoute>
            ),
          },
        ],
      },

      // {
      //   path: "/create-pin",
      //   element: (
      //     <PrivateRoute>
      //       <CreatePin></CreatePin>
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "/category/:categoryId",
        element: (
          <PrivateRoute>
            <Feed></Feed>
          </PrivateRoute>
        ),
      },
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Feed></Feed>
          </PrivateRoute>
        ),
      },
      {
        path: "/search",
        element: (
          <PrivateRoute>
            <Search></Search>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Pins></Pins>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/create-pin",
        element: (
          <PrivateRoute>
            <CreatePin></CreatePin>
          </PrivateRoute>
        ),
      },
      {
        path: "/pin-details/:pinId",
        element: (
          <PrivateRoute>
            <PinDetails></PinDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/user-profile/:userId",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
