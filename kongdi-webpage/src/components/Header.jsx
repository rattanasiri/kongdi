import React from "react";
import useUserStore from "../stores/userStore";
import { Link, useNavigate } from "react-router";

import CategoryListSearch from "./CategoryListSearch";
import ProvinceListSearch from "./ProvinceListSearch";

function Header() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  //ปุ่มตอนไม่มี user
  const GuestLogin = () => (
    <div>
      <Link to="/login">Login</Link>
    </div>
  );
  // ปุ่มกดตอนมี user
  const AccountMenu = ({ user, logout }) => (
    <div
      className="flex
    "
    >
      <img
        src={user?.profileImage}
        alt={user?.firstName}
        className="w-10 h-10   rounded-full object-cover"
      />

      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
          {user.firstName}
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
        >
          <li>
            <Link to="/myPage">MyPage</Link>
          </li>
          <li>
            <Link to="/accountPage">Account</Link>
          </li>
          <li>
            <Link to="/follow">Follow</Link>
          </li>
          <li>
            <Link to="/bookmark">My Bookmarks</Link>
          </li>
          <li>
            <a onClick={handleLogout}> Log out</a>
          </li>
        </ul>
      </div>
    </div>
  );

  function AccountCheckMenu() {
    const user = useUserStore((state) => state.user);
    const logout = useUserStore((state) => state.logout);
    return (
      <div className="flex items-center">
        {user ? <AccountMenu user={user} logout={logout} /> : <GuestLogin />}
      </div>
    );
  }
  // ตัว header
  return (
    <div
      className="
      fixed top-0 left-0 w-full 
      flex items-center justify-between 
      bg-amber-500 
      p-4 
      h-auto 
      z-50 
      shadow-md
    "
    >
      {/* 1. Logo */}
      <div className="font-bold text-xl text-white">
        <Link to="/">Logo</Link>
      </div>

      {/* 2. Search  */}
      <div className="flex items-center gap-4">
        <CategoryListSearch />
        <ProvinceListSearch />
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="p-2 border border-gray-300 bg-white rounded-lg w-64"
          />
        </div>
        {/* Search Button (ใช้คำว่า 'Find' หรือ 'Search') */}
        <button className="bg-white text-amber-500 font-semibold py-2 px-4 rounded-lg hover:bg-amber-100 transition duration-150">
          Search
        </button>
      </div>

      {/* 3. Account Menu */}
      <div className="flex items-center">
        <AccountCheckMenu />
      </div>
    </div>
  );
}

export default Header;
