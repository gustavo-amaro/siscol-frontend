import React, { useEffect, useState } from "react";
import { Container, Item } from "./styles";
import { FaHome, FaSwimmer, FaMoneyCheckAlt, FaChartBar } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAppLayout } from "../../../contexts/AppLayoutContext";

export default function Sidebar() {
  const appContext = useAppLayout();
  const location = useLocation();
  const [hideAnimation, setHideAnimation] = useState(false);

  function hideSidebar()
  {
    setHideAnimation(true);
    //appContext.toggleShowSidebar();
  }

  useEffect(() => {
    let sidebar = document.querySelector(".sidebar");
    sidebar.addEventListener("animationend", (event) => {
      setHideAnimation(false);
      if(event.animationName === 'kSYWhj'){
        appContext.toggleShowSidebar();
      }
    });
  }, []);

  return (
    <Container hideAnimation={hideAnimation} show={appContext.showSidebar} onClick={hideSidebar}>
      <div className="sidebar">
        <div className="brand primary">
          <span className="title white-text">
            <img
              src={require("../../../assets/logo-dark.png")}
              alt="logo siscol"
              style={{ maxWidth: 150, maxHeight: 100 }}
            />
          </span>
        </div>

        <ul>
          <li>
            <Item active={location.pathname === "/"}>
              <Link to="/">
                <FaHome size={14} style={{ marginRight: 8 }} />{" "}
                <span> Início</span>
              </Link>
            </Item>
          </li>

          <li>
            <Item active={location.pathname.includes("pescador")}>
              <Link to="/pescador">
                <FaSwimmer size={14} style={{ marginRight: 8 }} />{" "}
                <span>Pescador</span>
              </Link>
            </Item>
          </li>
          <li>
            <Item
              active={
                location.pathname === "/anuidade" ||
                location.pathname.substr(0, 9) === "/ver-guia"
              }
            >
              <Link to="/anuidade">
                <FaMoneyCheckAlt
                  size={14}
                  style={{ marginRight: 8 }}
                
                />{" "}
                <span> Anuidade</span>
              </Link>
            </Item>
          </li>

          {/*<li>
            <Item active={location.pathname === "/caixa"}>
              <Link to="/caixa">
                <FaShoppingCart
                  size={14}
                  style={{ marginRight: 8 }}
                
                />{" "}
                <span>Caixa</span>
              </Link>
            </Item>
          </li>*/}

          <li>
            <Item>
              <a href="fake">
                <FaChartBar size={14} style={{ marginRight: 8 }} />{" "}
                <span>Relatórios</span>
              </a>
            </Item>
          </li>
        </ul>
      </div>
    </Container>
  );
}
