const NavList = {
    user: [{
        menu: 'Dashboard',
        icon: <i className="bx bx-grid-alt"></i>,
        sub: [
            {name: 'Home'},
        ]
    },{
        menu: 'Education',
        icon: <i className="bx bxs-graduation"></i>,
        sub: [
            {name: 'Education'},
            {name: 'School'},
            {name: 'College'}
        ]
    },{
        menu: 'Settings',
        icon: <i className="bx bx-cog"></i>,
        sub: [
            {name: 'Settings'},
        ]
    }]
}
export default NavList;