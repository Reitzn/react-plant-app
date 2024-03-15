import "./App.css";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ColorModeContextProvider } from "./context/ColorModeContext";

import ErrorPage from "./routes/ErrorPage";

import Root from "./routes/Root";
import Contact from "./routes/Contact";
import About from "./routes/About";
import Account from "./routes/Account";
import Seeds from "./routes/Seeds";

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
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "seeds",
        element: <Seeds />,
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
