import "./App.css";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ColorModeContextProvider } from "./context/ColorModeContext";

import ErrorPage from "./routes/ErrorPage";

import Root from "./routes/Root";
import Account from "./routes/Account";
import Seeds from "./routes/Seeds";
import Plants from "./routes/Plants";
import Users from "./routes/Users";

import Header from "./components/header/Header";

const Layout = () => (
  <ColorModeContextProvider>
    <AuthProvider>
      <CssBaseline />
      <Header />
      <Outlet />
    </AuthProvider>
  </ColorModeContextProvider>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "seeds",
        element: <Seeds />,
      },
      {
        path: "plants",
        element: <Plants />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
