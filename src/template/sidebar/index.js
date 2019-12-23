import React, { useEffect, useState } from 'react';
import './styles.scss';
import {FaFish} from 'react-icons/fa';
import Divider from '../../components/divider';
import { useSelector } from 'react-redux';

export default function Sidebar(){
    const show = useSelector(state=>state.SidebarReducer.showSidebar);
    const [contentSidebar, setContentSidebar] = useState(null);

    useEffect(()=>{
        let sidebar;
        if(show){
            sidebar = document.querySelector('.sidebar');
            sidebar.style.display = "flex";
            setTimeout(()=>{
                sidebar.style.width = "300px";
                if(contentSidebar!==null)
                    sidebar.innerHTML = contentSidebar;
            }, 100)
        }else{
            sidebar = document.querySelector('.sidebar');
            setContentSidebar(sidebar.innerHTML);
            sidebar.style.width = "0";
            sidebar.innerHTML = "";
            setTimeout(()=>{
                sidebar.style.display = "none";
            }, 500)
        }
    }, [show]);
    return (
        <div className="sidebar">
            <div className="brand">
                <span className="icon"><FaFish /></span>
                <span className="title">SISCOL<sup>0.1</sup></span>
            </div>
            <Divider />
            <ul>
                <li className="waves-effect"><a href="fake">Dashboard</a></li>
                <Divider />
                <li className="waves-effect"><a href="fake">Pescador</a></li>
                <li className="waves-effect"><a href="fake">Anuidade</a></li>
                <Divider />
                <li className="waves-effect"><a href="fake">Relatórios</a></li>
            </ul>
        </div>
    );
}