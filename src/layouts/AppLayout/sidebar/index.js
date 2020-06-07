import React, { useEffect } from "react";
import "./styles.scss";
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
    <div className="sidebar">
      <div className="brand primary-dark">
        <span className="icon">
          <FaFish color="#b8c7ce" />
        </span>
        <span className="title white-text">
          SISCOL<sup>0.1</sup>
        </span>
      </div>

      <ul>
        <li className="header">Principal</li>
        <li>
          <Link to="/">
            <FaHome size={14} color="#b8c7ce" /> Início
          </Link>
        </li>

        <li>
          <Link to="/pescador">
            <FaSwimmer size={14} color="#b8c7ce" /> Pescador
          </Link>
        </li>
        <li>
          <Link to="/anuidade">
            <FaMoneyCheckAlt size={14} color="#b8c7ce" /> Anuidade
          </Link>
        </li>

        <li>
          <a href="fake">
            <FaChartBar size={14} color="#b8c7ce" /> Relatórios
          </a>
        </li>
      </ul>
    </div>
  );
}
