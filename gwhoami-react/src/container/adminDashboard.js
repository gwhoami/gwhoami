import React, {useState,useEffect, useCallback, useRef} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faRegistered } from "@fortawesome/free-solid-svg-icons";
import UserGrid from "./userGrid";
import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import MyLocalStorage from "../helper/mylocalStorage";

const AdminDashboard = () => {
    //let { path, url } = useRouteMatch();
    const [menuTip, showMenuTip] = useState(false);
    const {pageId} = useParams();
    const shortName = useRef(MyLocalStorage.getShortName())
    const bodyClick = useCallback((e) => {
        e.stopPropagation();
        if (e.target.classList.contains('__tipmenu')) return;
        showMenuTip(false);
    },[]);
    useEffect(()=>{
        if (!menuTip) {
            document.body.removeEventListener('click', bodyClick);
        } else document.body.addEventListener('click', bodyClick);
        return () => {
            document.body.removeEventListener('click', bodyClick);
        }
        // eslint-disable-next-line
    },[menuTip]);
    const showMenu = (e) => {
        showMenuTip(!menuTip);
    }
    return (
        <div className="bdy">
            <aside id="sidenav-open" className="h-screen">
                <nav className="flex flex-col justify-between h-full p-5 border-r bg-gray-50">
                    <div>
                        {/* <a href="/test" className="flex items-center p-3 rounded-xl hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-7 text-gray-900" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M6 1H1v14h5V1zm9 0h-5v5h5V1zm0 9v5h-5v-5h5zM0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm1 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-5z"/>
                            </svg>
                            <span className="text-gray-900">Dashboard</span>
                        </a> */}
                        <Link to={`/admin/users`} className={`flex items-center p-3 mb-2 rounded-xl hover:bg-gray-200${pageId === 'users' ? ' bg-gray-200 text-dodge-b': ''}`}>
                            <FontAwesomeIcon icon={faRegistered} className="text-3xl mr-2"/>
                            <span className="text-gray-900">Registered Users</span>
                        </Link>
                        {/* <Link to={`/admin/dashboard`} className={`flex items-center p-3 mb-2 rounded-xl hover:bg-gray-200${pageId === 'dashboard' ? ' bg-gray-200 text-dodge-b': ''}`}>
                            <FontAwesomeIcon icon={faBorderAll} className="text-3xl mr-2"/>
                            <span className="text-gray-900">Dashboard</span>
                        </Link>
                        <Link  to={`/admin/analytics`} className={`flex items-center p-3 mb-2 rounded-xl hover:bg-gray-200${pageId === 'analytics' ? ' bg-gray-200 text-dodge-b': ''}`}>
                            <FontAwesomeIcon icon={faChartBar} className="text-3xl mr-2"/>
                            <span className="text-gray-900">Analytics</span>
                        </Link> */}
                        {/* <a href="/test" className="flex items-center p-3 rounded-xl hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-7 text-gray-900" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z"/>
                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                            </svg>
                            <span className="text-gray-900">Analytics</span>
                        </a> */}
                        {/* <a href="/test" className="flex items-center p-3 rounded-xl hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-7 text-gray-900" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                            </svg>
                            <span className="text-gray-900">Orders</span>
                        </a>

                        <a href="/test" className="flex items-center p-3 rounded-xl hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-7 text-gray-900" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
                            </svg>
                            <span className="text-gray-900">Events</span>
                        </a>

                        <a href="/test" className="flex items-center p-3 rounded-xl hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-7 text-gray-900" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                            <span className="text-gray-900">Settings</span>
                        </a> */}
                    </div>
                    <div className="px-32">&nbsp;</div>
                </nav>
                <a href="#/abc" id="sidenav-close" title="Close Menu" aria-label="Close Menu"><span></span></a>
            </aside>
            <main className="overflow-auto h-screen">
                <header className="flex items-center justify-between px-4 py-3 sticky top-0 bg-gray-50 shadow-md" style={{zIndex: "999"}}>
                    <div className="flex items-center justify-between">
                        <a href="#sidenav-open" className="visible sm:hidden" title="Open Menu" aria-label="Open Menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="4" y1="6" x2="20" y2="6" />
                                <line x1="4" y1="12" x2="20" y2="12" />
                                <line x1="4" y1="18" x2="20" y2="18" />
                            </svg>
                        </a>
                        <h1 className="mx-2 text-xl font-bold text-gray-900">Gwhoami - Admin Dashboard</h1>
                        
                    </div>
                    <div className="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 cursor-pointer" id="userdropdown" onClick={e=>showMenu(e)}>
                        <div className="rounded-full w-12 h-12 hover:border-dodge-b ignore-body-click border border-gray-500 flex justify-center items-center text-xs font-bold upper-case">{shortName.current}</div>
                    </div>
                    <div id="usermenu" className={`absolute lg:mt-16 pt-1 left-0 lg:left-auto lg:right-0 lg:top-0 lg:w-auto w-full${menuTip ? '' : ' hidden'}`}>
                        <div className="__tipmenu bg-white shadow-xl lg:px-8 px-6 lg:py-4 pb-4 pt-0 rounded lg:mr-3 rounded-t-none">
                            {/* <a href="/settings" className="pb-2 block text-gray-600 hover:text-gray-900 font-medium ignore-body-click"><FontAwesomeIcon icon={faGear} className="mr-1"/> Settings</a> */}
                            <Link to="/" className="block text-gray-600 hover:text-dodge-b font-medium ignore-body-click cursor-pointer"><FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-1"/> Logout</Link>
                        </div>
                    </div>
                </header>
                <Scrollbars className="px-4 overflow-auto" style={{height: "calc(100% - 72px)"}}>
                    {/* <div style={{height: "2000px"}}></div> */}
                   {/* <Switch>
                        <Route exact path={path} render={(props)=><UserGrid {...props}/>}></Route>
                   </Switch> */}
                   {pageId === 'users' && <UserGrid/>}
                   {pageId === 'dashboard' &&  <div className="flex justify-center items-center h-full"><div className="text-2xl">Dashboard</div></div>}
                   {pageId === 'analytics' &&  <div className="flex justify-center items-center h-full"><div className="text-2xl">Analytics</div></div>}
                </Scrollbars>
                {/* <div className="px-4 py-3 overflow-auto" style={{height: "calc(100% - 72px)"}}>
                    
                </div> */}
            </main>
        </div>
    );
};

export default AdminDashboard;