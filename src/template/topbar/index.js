import React, {useEffect} from 'react';
import {FaUser, FaBars, FaCog, FaDoorOpen} from 'react-icons/fa';
import M from 'materialize-css';
import {useDispatch, useSelector} from 'react-redux';

export default function Topbar(){
    const dispatch = useDispatch();
    useEffect(()=>{
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, {constrainWidth:false});
    }, [])
    function toggleSidebar(e){
        e.preventDefault();
        dispatch({type: 'TOGGLE_SIDEBAR'})
    }
    return (
        <nav>
            <div className="nav-wrapper primary">
                <ul id="nav-mobile" className="left">
                    <li><a onClick={toggleSidebar}><FaBars /></a></li>
                </ul>
                <ul id="nav-mobile" className="right">
                <li><a href="#!" className="dropdown-trigger" data-target="dropdownUser">Admin <FaUser /></a></li>
                </ul>
            </div>
            <ul id='dropdownUser' className='dropdown-content'>
                <li><a href="#!" className="blue-text"><FaCog /> Configurações</a></li>
                <li className="divider" tabIndex="-1"></li>
                <li><a href="#!" className="blue-text"><FaDoorOpen /> Sair</a></li>
            </ul>
        </nav>
    )
}