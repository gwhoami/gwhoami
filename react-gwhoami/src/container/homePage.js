import React, { useEffect, useRef, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import RegisterUser from "./register";
import { Scrollbars } from 'react-custom-scrollbars';
import LoginPage from "./login";
import { MenuContext } from "../util/maincontext";
import AboutUs from "./aboutUs";
import MyLocalStorage from "../helper/mylocalStorage";
import PasswordReset from "./passwordPages/passwordReset";
import VerifyEmail from "./passwordPages/verifyEmail";

const HomePage = React.memo(() => {
    let { path, url } = useRouteMatch();
    const [, menuRefresh] = useState(-1);
    const menuRef = useRef({
        menu: 0,
        list: [
            {p: '/home', name: 'Home'},
            {p: '/about', name: 'About Us'},
            {p: '/login', name: 'Login'},
            {p: '/signin', name: 'Register'}
        ]
    });
    const goTo = (idx) => {
        menuRef.current.menu = idx;
        menuRefresh(Date.now());
    }
    useEffect(()=>{
        MyLocalStorage.empty();
    }, []);
    return (
        <MenuContext.Provider value={{goTo}}>
        <div className="bg-gray-200 h-full">
            <header className="px-6 bg-white flex flex-wrap items-center lg:py-0 py-2 sticky top-0 z-100">
                <div className="flex-1 flex justify-between items-center font-black text-gray-700">
                    <div>Gwhoami</div>
                </div>
                <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
                    <svg 
                        className="fill-current text-gray-600 hover:text-gray-800" 
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                    >
                        <title>menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </label>
                <input className="hidden" type="checkbox" id="menu-toggle" />
                <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
                    <nav>
                        <ul className="lg:flex items-center justify-between text-sm font-medium text-gray-700 pt-4 lg:pt-0">
                            {menuRef.current.list.map((itm, idx)=>{
                                return( 
                                    <li key={idx}>
                                        <Link  
                                            className={`lg:p-4 py-3 px-0 block border-b-2 border-transparent font-bold ${menuRef.current.menu === idx ? 'border-dodge-b text-dodge-b' : 'text-gray-600 hover:text-gray-900'}`} 
                                            to={idx !== 0 ? `${url}${itm.p}` : `${url}`}
                                            onClick={_=>goTo(idx)}
                                        >{itm.name}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </div>
            </header>
            <Scrollbars autoHide className="px-4 overflow-auto" style={{height: "calc(100% - 54px)"}}>
                <Switch>
                    <Route exact path={path}>
                        <div className="flex justify-center items-center h-full">
                            <div className="text-2xl">Welcome to Gwhoami</div>
                        </div>
                    </Route>
                    <Route path={`${path}/signin`} render={(props)=><RegisterUser {...props}/>}></Route>
                    <Route path={`${path}/login`} render={(props)=><LoginPage {...props}/>}></Route>
                    <Route path={`${path}/about`} render={(props)=><AboutUs {...props}/>}></Route>
                    <Route path={`${path}/passwordreset/:id`} render={(props)=><PasswordReset {...props}/>}></Route>
                    <Route path={`${path}/verifyemail`} render={(props)=><VerifyEmail {...props}/>}></Route>
                </Switch>
            </Scrollbars>
        </div>
        </MenuContext.Provider>
    );
});

export default HomePage;