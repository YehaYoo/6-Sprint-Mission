import React from "react";
import logoImg from "../../assets/logo.svg";
import profile from "../../assets/profile.svg";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

interface UserStateButtonProps {
  isAddItemPage: boolean;
}

function UserStateButton({ isAddItemPage }: UserStateButtonProps) {
  return isAddItemPage ? (
    <button className="profileButton">
      <img src={profile} alt="프로필 사진" />
    </button>
  ) : (
    <Link to="/signin">
      <button className="loginButton">로그인</button>
    </Link>
  );
}

function Navbar() {
  const location = useLocation();
  const isAddItemPage = location.pathname === "/additem";
  const isFreeBoardPage = location.pathname === "/items";
  return (
    <nav className="navbar">
      <div className="nav-menu">
        <Link to="/" className="logo">
          <img id="logo-img" alt="panda-market" src={logoImg} />
        </Link>
        <Link
          to={"/items"}
          className={`navbar-button ${isFreeBoardPage ? "active-link" : ""}`}
        >
          자유게시판
        </Link>
        <Link
          to={"/additem"}
          className={`navbar-button ${isAddItemPage ? "active-link" : ""}`}
        >
          중고마켓
        </Link>
      </div>
      <div>
        <UserStateButton isAddItemPage={isAddItemPage} />
      </div>
    </nav>
  );
}

export default Navbar;
