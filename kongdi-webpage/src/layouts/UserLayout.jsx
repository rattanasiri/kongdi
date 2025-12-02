import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";

function UserLayout() {
  return (
    <div>
      <Header />
      <div className="pt-15 ">
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;
