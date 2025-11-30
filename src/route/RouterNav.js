import { NavLink, Outlet } from "react-router-dom";
import './RouterNav.css';

export default function RouterNav(){
    return (
        <>
            <ul>
                <li><NavLink to="/">홈</NavLink></li>
                <li><NavLink to="/todo">TODO</NavLink></li>
                <li><NavLink to="/modern">MODERN</NavLink></li>
            </ul>
            <hr></hr>
            <Outlet></Outlet>
        </>
    )
}