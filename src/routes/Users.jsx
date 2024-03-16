import React from "react";
import { supabase } from "../supabaseClient";

export default function Users() {
  const getUsers = async () => {
    console.log(await supabase.from("profiles").select("*"));
  };

  getUsers();

  return (
    <div className="page">
      <h1>Users</h1>
    </div>
  );
}
