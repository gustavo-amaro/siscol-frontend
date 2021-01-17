import React, { useEffect } from "react";
import {Container} from './styles';
import {
  FaFish,
  FaHome,
  FaSwimmer,
  FaMoneyCheckAlt,
  FaChartBar,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const show = useSelector((state) => state.SidebarReducer.showSidebar);

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
  }, []);
  return (
    <Container className="sidebar primary">
      <div className="brand primary">
        <span className="title white-text">
          <img src={require('./assets/logo-branca.png')} alt='logo siscol' style={{maxWidth: 150, maxHeight: 100}}/>
        </span>
      </div>

      <ul>
        <li>
          <div className="item">
            <Link to="/">
              <FaHome size={14} color="#fff" /> Início
            </Link>
          </div>
        </li>

        <li>
        <div className="item">
          <Link to="/pescador">
            <FaSwimmer size={14} color="#fff" /> Pescador
          </Link>
          </div>
        </li>
        <li>
        <div className="item">
          <Link to="/anuidade">
            <FaMoneyCheckAlt size={14} color="#fff" /> Anuidade
          </Link>
          </div>
        </li>

        <li>
        <div className="item">
          <a href="fake">
            <FaChartBar size={14} color="#fff" /> Relatórios
          </a>
          </div>
        </li>
      </ul>
    </Container>
  );
}
