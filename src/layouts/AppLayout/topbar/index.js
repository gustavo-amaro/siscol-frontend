import React, { useEffect, useState } from "react";
import { FaUser, FaBars, FaCog, FaDoorOpen } from "react-icons/fa";
import M from "materialize-css";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

export default function Topbar() {
  const dispatch = useDispatch();
  const [toLogin, setToLogin] = useState(false);
  const userName = localStorage.getItem("user_name");

  useEffect(() => {
    var elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, { constrainWidth: false });
  }, []);
  function toggleSidebar(e) {
    e.preventDefault();
    dispatch({ type: "TOGGLE_SIDEBAR" });
  }

  function signoff() {
    localStorage.removeItem("entidade_id");
    localStorage.removeItem("_token");
    setToLogin(true);
  }

  if (toLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <nav>
      <div className="nav-wrapper white">
        <ul id="nav-mobile" className="left">
          <li>
            <a href="sidebar" className="text-color" onClick={toggleSidebar}>
              <FaBars />
            </a>
          </li>
        </ul>
        <ul id="nav-mobile" className="right">
          <li>
            <a
              href="#!"
              className="dropdown-trigger text-color"
              data-target="dropdownUser"
            >
              {userName} <FaUser />
            </a>
          </li>
        </ul>
      </div>
      <ul id="dropdownUser" className="dropdown-content">
        <li>
          <a href="#!" className="blue-text">
            <FaCog /> Configurações
          </a>
        </li>
        <li className="divider" tabIndex="-1"></li>
        <li>
          <a href="#!" className="blue-text" onClick={signoff}>
            <FaDoorOpen /> Sair
          </a>
        </li>
      </ul>
    </nav>
  );
}
