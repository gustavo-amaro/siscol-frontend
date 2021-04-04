import React, { useEffect } from "react";
import { Container, Item } from "./styles";
import {
  FaHome,
  FaSwimmer,
  FaMoneyCheckAlt,
  FaChartBar,
  FaShoppingCart,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const show = useSelector((state) => state.SidebarReducer.showSidebar);
  const location = useLocation();

  useEffect(() => {
    let sidebar = document.querySelector(".sidebar");
    if (show) {
      sidebar.style.display = "flex";
      sidebar.style.animation = "moveShow 400ms";
      sidebar.style.animationFillMode = "forwards";
    } else {
      sidebar.style.animation = "moveHide 400ms";
      sidebar.style.animationFillMode = "forwards";
    }
  }, [show]);
  useEffect(() => {
    let sidebar = document.querySelector(".sidebar");
    sidebar.addEventListener("animationend", (event) => {
      if (event.animationName === "moveHide") {
        sidebar.style.display = "none";
      }
    });
    console.log(location);
  }, []);
  return (
    <Container className="sidebar primary">
      <div className="brand primary">
        <span className="title white-text">
          <img
            src={require("./assets/logo-branca.png")}
            alt="logo siscol"
            style={{ maxWidth: 150, maxHeight: 100 }}
          />
        </span>
      </div>

      <ul>
        <li>
          <Item active={location.pathname === "/"}>
            <Link to="/">
              <FaHome size={14} style={{ marginRight: 8 }} color="#fff" />{" "}
              <span> Início</span>
            </Link>
          </Item>
        </li>

        <li>
          <Item active={location.pathname === "/pescador"}>
            <Link to="/pescador">
              <FaSwimmer size={14} style={{ marginRight: 8 }} color="#fff" />{" "}
              <span>Pescador</span>
            </Link>
          </Item>
        </li>
        <li>
          <Item active={location.pathname === "/anuidade"}>
            <Link to="/anuidade">
              <FaMoneyCheckAlt
                size={14}
                style={{ marginRight: 8 }}
                color="#fff"
              />{" "}
              <span> Anuidade</span>
            </Link>
          </Item>
        </li>

        <li>
          <Item active={location.pathname === "/compra-pescado"}>
            <Link to="/compra-pescado">
              <FaShoppingCart
                size={14}
                style={{ marginRight: 8 }}
                color="#fff"
              />{" "}
              <span>Caixa</span>
            </Link>
          </Item>
        </li>

        <li>
          <Item>
            <a href="fake">
              <FaChartBar size={14} style={{ marginRight: 8 }} color="#fff" />{" "}
              <span>Relatórios</span>
            </a>
          </Item>
        </li>
      </ul>
    </Container>
  );
}
