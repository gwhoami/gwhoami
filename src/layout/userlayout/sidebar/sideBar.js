import React, { useEffect } from "react";
import NavList from "./navList";

const SideBar = React.memo(() => {
    useEffect(()=>{
        let arrows = document.querySelectorAll('.arrow');
        let sidebar = document.querySelector('div.sidebar');
        let sidebarBtn = document.querySelector('i.bx-menu');
        Array.from(arrows).forEach(itm=> {
            itm.addEventListener('click', (e)=> {
                e.target.parentElement.parentElement.classList.toggle('showMenu');
            }, false);
        });
        sidebarBtn.addEventListener('click', (e)=> {
            sidebar.classList.toggle('close');
        }, false);
    }, []);
    return (
        <div className="sidebar">
            <div className="logo-details">
                <i className='bx bxl-c-plus-plus'></i>
                <span className="logo_name">GWhoami</span>
            </div>
            <ul className="nav-links">
                {NavList.user.map((itm, idx)=>(
                    <React.Fragment key={itm.menu}>
                    {itm.sub.length === 1 ?
                    <li>
                        <a href="#/">{itm.icon}<span className="link_name">{itm.menu}</span></a>
                        <ul className="sub-menu blank">
                            <li><a href="#/" className="link_name">{itm.sub[0].name}</a></li>
                        </ul>
                    </li>: 
                    <li>
                        <div className="icon_links">
                            <a href="#/">{itm.icon}<span className="link_name">Category</span></a>
                            <i className='bx bxs-chevron-down arrow'></i>
                        </div>
                        <ul className="sub-menu">
                            {itm.sub.map((sub, subidx)=>(
                                <React.Fragment key={sub.name}>
                                {subidx === 0 ? 
                                    <li><a href="#/" className="link_name">{sub.name}</a></li> :
                                    <li><a href="#/">{sub.name}</a></li>
                                }
                                </React.Fragment>
                            ))}
                        </ul>
                    </li>}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
});

export default SideBar;