import React from "react";
import { supabase } from "../supabaseClient";
import UsersTable from "../components/users/UsersTable";

export default function Users() {
  return (
    <div className="page">
      <h1>Users</h1>
      <UsersTable />
    </div>
  );
}
