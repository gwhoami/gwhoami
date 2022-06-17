import {
    faArrowRightFromBracket, faHome,
    fa9,
    faBasketball,
    faBaseball,
    faHomeLg,
    faUser,
    faUserGraduate
}
    from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState, useContext } from "react"
import Scrollbars from "react-custom-scrollbars";
import { Link, useParams } from "react-router-dom";
import MyLocalStorage from "../../helper/mylocalStorage";
import { MenuContext } from "../../util/maincontext";


const UserHomePage = React.memo(() => {
    const [menuTip, showMenuTip] = useState(false);
    const { pageId } = useParams();
    const {goTo} = useContext(MenuContext);
    const bodyClick = useCallback((e) => {
        e.stopPropagation();
        if (e.target.classList.contains('__tipmenu')) return;
        showMenuTip(false);
    }, []);
    const shortName = useRef(MyLocalStorage.getShortName())
    useEffect(() => {
        if (!menuTip) {
            document.body.removeEventListener('click', bodyClick);
        } else document.body.addEventListener('click', bodyClick);
        return () => {
            document.body.removeEventListener('click', bodyClick);
        }
        // eslint-disable-next-line
    }, [menuTip]);
    const showMenu = (e) => {
        showMenuTip(!menuTip);
    }
   

    return (
        <div className="bdy">
            <aside id="sidenav-open" className="h-screen">
                <nav className="flex w-80 flex-col justify-between rounded-md border-slate-500  p-9  bg-blue-50">
                    <div class="col">
                        <div class="flex ...">
                            <div class="flex-1 w-64 ... ">
                                <div class="row border items-center border-slate-300 hover:border-gray-800 ...">
                                    <Link to={`/admin/users`} className={`flex items-center p-0 mb-0 rounded-md hover:bg-gray-200${pageId === 'home' ? ' bg-gray-200 text-dodge-b' : ''}`}>
                                        &nbsp;<FontAwesomeIcon icon={faHomeLg} className="text-sx mr-0" />
                                        &nbsp;<span className="text-gray-900">Home</span>
                                        &nbsp;
                                        <svg data-accordion-icon class="w-6 h-6 -rotate-90 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </Link>
                                </div>
                            </div>&nbsp;
                            <div class="flex-1 w-32 ... ">
                                <div class="row border items-center border-slate-300 hover:border-gray-800 ...">
                                    <Link to={`/admin/profile`} className={`flex items-center p-0 mb-0 rounded-md hover:bg-gray-200${pageId === 'home' ? ' bg-gray-200 text-dodge-b' : ''}`}>
                                        &nbsp;<FontAwesomeIcon icon={faUser} className="text mr-0" />
                                        &nbsp;<span className="text-red-900">Profile</span>&nbsp;
                                        <Link to="/home/Profile" onClick={_=>goTo(5)} className="text-dodge-b"></Link>
                                       {/* <svg data-accordion-icon class="w-6 h-6 -rotate-90 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>*/}
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div class="flex ...">
                            <div class="flex-1 w-32 ... ">
                                <div class="row border items-center border-slate-300 hover:border-gray-800 ...">
                                    <Link to={`/admin/users`} className={`flex items-center p-0 mb-0 rounded-md hover:bg-gray-200${pageId === 'home' ? ' bg-gray-200 text-dodge-b' : ''}`}>
                                        &nbsp;<FontAwesomeIcon icon={faBasketball} className="text mr-0" />
                                        &nbsp;<span className="text-gray-900">Sport</span>
                                        <svg data-accordion-icon class="w-6 h-6 -rotate-90 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </Link>
                                </div>
                            </div>&nbsp;
                            <div class="flex-1 w-32 ... ">
                                <div class="row border items-center border-slate-300 hover:border-gray-800 ...">
                                    <Link to={`/admin/users`} className={`flex items-center p-0 mb-0 rounded-md hover:bg-gray-200${pageId === 'home' ? ' bg-gray-200 text-dodge-b' : ''}`}>
                                        &nbsp;<FontAwesomeIcon icon={faUser} className="text mr-0" />
                                        &nbsp;<span className="text-gray-900">Profile</span>&nbsp;
                                        <svg data-accordion-icon class="w-6 h-6 -rotate-90 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div class="flex ... ">
                            <div class="flex-1 w-32 ... ">
                                <div class="row border items-center border-slate-300 hover:border-gray-800 ...">
                                    <Link to={`/admin/users`} className={`flex items-center p-0 mb-0 rounded-md hover:bg-gray-200${pageId === 'home' ? ' bg-gray-200 text-dodge-b' : ''}`}>
                                        &nbsp;<FontAwesomeIcon icon={faUserGraduate} className="text mr-0" />
                                        &nbsp;<span className="text-gray-900">Education</span>&nbsp;
                                        <svg data-accordion-icon class="w-6 h-6 -rotate-90 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </Link>
                                </div>
                            </div>&nbsp;&nbsp;
                            <div class="flex-1 w-32 ... ">
                                <div class="row border items-center border-slate-300 hover:border-gray-800 ...">
                                    <Link to={`/admin/users`} className={`flex items-center p-0 mb-0 rounded-md hover:bg-gray-200${pageId === 'home' ? ' bg-gray-200 text-dodge-b' : ''}`}>
                                        &nbsp;<FontAwesomeIcon icon={faBaseball} className="text mr-0" />
                                        &nbsp;&nbsp;<span className="text-gray-900">Profile</span>&nbsp;
                                        <svg data-accordion-icon class="w-6 h-6 -rotate-90 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div class="flex ... ">
                            <div class="flex-1 w-32 ... ">
                                <div class="row border items-center border-slate-300 hover:border-gray-800 ...">
                                    <Link to={`/admin/users`} className={`flex items-center p-0 mb-0 rounded-lg hover:bg-gray-200${pageId === 'home' ? ' bg-gray-200 text-dodge-b' : ''}`}>
                                        &nbsp;<FontAwesomeIcon icon={fa9} className="text mr-0" />
                                        &nbsp;<span className="text-gray-900">Home</span>&nbsp;
                                        <svg data-accordion-icon class="w-6 h-6 -rotate-90 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </Link>
                                </div>
                            </div>&nbsp;&nbsp;
                            <div class="flex-1 w-32 ... ">
                                <div class="row border items-center border-slate-300 hover:border-gray-800 ...">
                                    <Link to={`/admin/users`} className={`flex items-center p-0 mb-0 rounded-lg hover:bg-gray-200${pageId === 'home' ? ' bg-gray-200 text-dodge-b' : ''}`}>
                                        &nbsp;<FontAwesomeIcon icon={faUser} className="text mr-0" />
                                        &nbsp;&nbsp;<span className="text-gray-900">Profile</span>&nbsp;
                                        <svg data-accordion-icon class="w-6 h-6 -rotate-90 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div class="flex ... ">
                            <div class="flex-1 w-32 ... ">
                                <div class="row border items-center border-slate-300 hover:border-gray-800 ...">
                                    <Link to={`/admin/users`} className={`flex items-center p-0 mb-0 rounded-lg hover:bg-gray-200${pageId === 'home' ? ' bg-gray-200 text-dodge-b' : ''}`}>
                                        &nbsp;<FontAwesomeIcon icon={faHome} className="text mr-0" />
                                        &nbsp;<span className="text-gray-900">Home</span>&nbsp;
                                        <svg data-accordion-icon class="w-6 h-6 -rotate-90 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </Link>
                                </div>
                            </div>&nbsp;&nbsp;
                            <div class="flex-1 w-32 ... ">
                                <div class="row border items-center border-slate-300 hover:border-gray-800 ...">
                                    <Link to={`/admin/users`} className={`flex items-center p-0 mb-0 rounded-lg hover:bg-gray-200${pageId === 'home' ? ' bg-gray-200 text-dodge-b' : ''}`}>
                                        &nbsp;<FontAwesomeIcon icon={faUser} className="text mr-0" />
                                        &nbsp;&nbsp;<span className="text-gray-900">Profile</span>&nbsp;
                                        <svg data-accordion-icon class="w-6 h-6 -rotate-90 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div class="flex ... ">
                            <div class="flex-1 w-32 ... ">
                                <div class="row border items-center border-slate-300 hover:border-gray-800 ...">
                                    <Link to={`/admin/users`} className={`flex items-center p-0 mb-0 rounded-lg hover:bg-gray-200${pageId === 'home' ? ' bg-gray-200 text-dodge-b' : ''}`}>
                                        &nbsp;<FontAwesomeIcon icon={faHome} className="text mr-0" />
                                        &nbsp;<span className="text-gray-900">Home</span>&nbsp;
                                        <svg data-accordion-icon class="w-6 h-6 -rotate-90 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </Link>
                                </div>
                            </div>&nbsp;&nbsp;
                            <div class="flex-1 w-32 ... ">
                                <div class="row border items-center border-slate-300 hover:border-gray-800 ...">
                                    <Link to={`/admin/users`} className={`flex items-center p-0 mb-0 rounded-lg hover:bg-gray-200${pageId === 'home' ? ' bg-gray-200 text-dodge-b' : ''}`}>
                                        &nbsp;<FontAwesomeIcon icon={faUser} className="text mr-0" />
                                        &nbsp;&nbsp;<span className="text-gray-900">Profile</span>&nbsp;
                                        <svg data-accordion-icon class="w-6 h-6 -rotate-90 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="px-32">&nbsp;</div>
                    </div>
                </nav>
                <a href="#/abc" id="sidenav-close" title="Close Menu" aria-label="Close Menu"><span></span></a>
            </aside>
            <main className="overflow-auto h-screen">
                <header className="flex items-center justify-between px-4 py-3 sticky top-0 bg-gray-50 shadow-md" style={{ zIndex: "999" }}>
                    <div className="flex items-center justify-between">
                        <a href="#sidenav-open" className="visible sm:hidden" title="Open Menu" aria-label="Open Menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="4" y1="6" x2="20" y2="6" />
                                <line x1="4" y1="12" x2="20" y2="12" />
                                <line x1="4" y1="18" x2="20" y2="18" />
                            </svg>
                        </a>
                        <h1 className="mx-2 text-xl font-bold text-gray-900">Gwhoami</h1>

                    </div>
                    <div className="lg:ml-4 flex items-center justify-start lg:mb-0 mb-4 cursor-pointer" id="userdropdown" onClick={e => showMenu(e)}>
                        <div className="rounded-full w-12 h-12 hover:border-dodge-b ignore-body-click border border-gray-500 flex justify-center items-center text-xs font-bold">{shortName.current}</div>
                    </div>
                    <div id="usermenu" className={`absolute lg:mt-16 pt-1 left-0 lg:left-auto lg:right-0 lg:top-0 lg:w-auto w-full${menuTip ? '' : ' hidden'}`}>
                        <div className="__tipmenu bg-white shadow-xl lg:px-8 px-6 lg:py-4 pb-4 pt-0 rounded lg:mr-3 rounded-t-none">
                            {/* <a href="/settings" className="pb-2 block text-gray-600 hover:text-gray-900 font-medium ignore-body-click"><FontAwesomeIcon icon={faGear} className="mr-1"/> Settings</a> */}
                            <Link to="/" className="block text-gray-600 hover:text-dodge-b font-medium ignore-body-click cursor-pointer"><FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-1" /> Logout</Link>
                        </div>
                    </div>
                </header>
                <Scrollbars className="px-4 overflow-auto" style={{ height: "calc(100% - 72px)" }}>
                    {/* <div style={{height: "2000px"}}></div> */}
                    {/* <Switch>
                        <Route exact path={path} render={(props)=><UserGrid {...props}/>}></Route>
                   </Switch> */}
                    {pageId === 'home' && <div className="flex justify-center items-center h-full"><div className="text-2xl">Welcome {MyLocalStorage.getLoginInfo().name}</div></div>}
                </Scrollbars>
                {/* <div className="px-4 py-3 overflow-auto" style={{height: "calc(100% - 72px)"}}>
                    
                </div> */}
            </main>
        </div>
    );
});

export default UserHomePage;