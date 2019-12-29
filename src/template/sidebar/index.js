import React, { useEffect, useState } from 'react';
import './styles.scss';
import {FaFish} from 'react-icons/fa';
import Divider from '../../components/divider';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Sidebar(){
    const show = useSelector(state=>state.SidebarReducer.showSidebar);

    useEffect(()=>{
        let sidebar = document.querySelector('.sidebar');
        if(show){
            sidebar.style.display = 'flex';
            sidebar.style.animation = "moveShow 400ms";
            sidebar.style.animationFillMode = "forwards";
        }else{
            sidebar.style.animation = "moveHide 400ms";
            sidebar.style.animationFillMode = "forwards";
        }
    }, [show]);
    useEffect(() =>{
        let sidebar = document.querySelector('.sidebar');
        sidebar.addEventListener("animationend", (event) =>{
             if(event.animationName === 'moveHide'){
                sidebar.style.display = 'none';
            }
        });
    }, [])
    return (
        <div className="sidebar">
            <div className="brand">
                <span className="icon"><FaFish /></span>
                <span className="title">SISCOL<sup>0.1</sup></span>
            </div>
            <Divider />
            <ul>
                <li ><Link to="/">Início</Link></li>
                <Divider />
                <li ><Link to="/pescador">Pescador</Link></li>
                <li ><a href="fake">Anuidade</a></li>
                <Divider />
                <li ><a href="fake">Relatórios</a></li>
            </ul>
        </div>
    );
}