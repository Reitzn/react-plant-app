import "./App.css";
import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { ColorModeContextProvider } from "./context/ColorModeContext";

import ErrorPage from "./routes/ErrorPage";

import Home from "./routes/Home";
import Account from "./routes/Account";
import Seeds from "./routes/Seeds";
import Plants from "./routes/Plants";
import Plant from "./routes/Plant";
import Users from "./routes/Users";

import Header from "./components/header/Header";

import { supabase } from "./supabaseClient";
import { setUserSession } from "./features/userSession/userSessionSlice";
import { getUserAction } from "./features/user/userSlice";
import { getSeedsAction } from "./features/seeds/seedsSlice";
import { getPlantsAction } from "./features/plants/plantsSlice";
import { getPlantNoteAction } from "./features/plants/plantNoteSlice";

import { useSelector, useDispatch } from "react-redux";

const Layout = () => (
  <ColorModeContextProvider>
    <CssBaseline />
    <Header />
    <Outlet />
  </ColorModeContextProvider>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "plants/:plantId",
        element: <Plant />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("session 1: ", session);
      // dispatch(setUserSession(session));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("session 2: ", session);
      if (session?.user) {
        console.log("Here With user ");
        dispatch(setUserSession(session));
        dispatch(getUserAction(session?.user?.id));
        dispatch(getSeedsAction(session?.user?.id));
        dispatch(getPlantsAction(session?.user?.id));
        dispatch(getPlantNoteAction(session?.user?.id));
      } else {
        dispatch(setUserSession({}));
        // To-Do: Need to reset other context to empty
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
