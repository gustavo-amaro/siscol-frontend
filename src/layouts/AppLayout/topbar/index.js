import React, { useEffect, useState } from "react";
import { FaUser, FaBars, FaDoorOpen } from "react-icons/fa";
import M from "materialize-css";
//import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container } from "./styles";
import { useAppLayout } from "../../../contexts/AppLayoutContext";

export default function Topbar({title=''}) {
  //const dispatch = useDispatch();
  const [toLogin, setToLogin] = useState(false);
  const userName = localStorage.getItem("user_name");
  const layoutContext = useAppLayout();

  useEffect(() => {
    var elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, { constrainWidth: false });
  }, []);
  /*function toggleSidebar(e) {
    e.preventDefault();
    dispatch({ type: "TOGGLE_SIDEBAR" });
  }*/

  function signoff() {
    localStorage.removeItem("entidade_id");
    localStorage.removeItem("_token");
    setToLogin(true);
  }

  if (toLogin) {
    return <Redirect to="/login" />;
  }

  function onMenuClick(e){
    e.preventDefault();
    layoutContext.toggleShowSidebar();
  }
  return (
    <Container className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/" onClick={onMenuClick}><FaBars /></a>
        
        <h1 className="nav-center">{title}</h1>

        <div className="dropdown">
          <div className="user dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <div className="me-auto"></div>
            <a href="#!">
              {userName?.split(" ")[0]}
            </a>
            <FaUser />
          </div>

          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
            <li><button className="dropdown-item" onClick={signoff}><FaDoorOpen style={{marginRight: 5 }} /> Sair</button></li>
          </ul>
        </div>

        
      </div>
    </Container>
  );
}
