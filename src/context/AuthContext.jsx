/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useMemo, useState, useEffect, useReducer } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();
const reducer = (productList, action) => {
  switch (action.type) {
    case "add_product":
      return [...productList, action.payload];

    case "edit_product":
      return productList.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );

    case "delete_product":
      return productList.filter((product) => product.id !== action.payload);

    default:
      return productList;
  }
};
export const AuthProvider = ({ children }) => {
  //const [state, dispatch] = useReducer(reducer, ProductsDB);

  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [seeds, setSeeds] = useState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session);
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const value = useMemo(
    () => ({
      session,
      user,
      seeds,
    }),
    [session, user, seeds]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
