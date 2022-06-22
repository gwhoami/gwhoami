import React from "react";
import Scrollbars from "react-custom-scrollbars";
import UserProctedRoutes from "../../routes/userProtectedRoutes";
import { UserContext } from "../../util/maincontext";
import SideMenu from "./sideMenu";
import UserHeader from "./userHeader";

const UserLanding = React.memo(() => {
    return (
        <UserContext.Provider value={{}}>
            <div className="bdy">
                <SideMenu/>
                <main className="overflow-auto h-screen">
                    <UserHeader/>
                </main>
                <Scrollbars autoHide className="px-4 overflow-auto" style={{height: "calc(100% - 72px)"}}>
                    <UserProctedRoutes/>
                </Scrollbars>
            </div>
        </UserContext.Provider>
    );
});

export default UserLanding;