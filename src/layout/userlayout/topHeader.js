import React from "react";

const TopHeader = React.memo(() =>{
    return (
        <header className="z-10 bg-white shadow-md dark:bg-gray-800 flex justify-center">
            <div className="container flex items-center justify-between px-6">
                <div className="home-content">
                    <i className='bx bx-menu' ></i>
                </div>
                <div className="flex items-center">
                    <div className="mr-5 relative flex">
                        <i className='bx bx-bell text-2xl text-dodge-b' ></i>
                        <span aria-hidden="true" className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"></span>
                    </div>
                    <button className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none">
                        {/* <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;s=aa3a807e1bbdfd4364d1f449eaa96d82" alt="" aria-hidden="true"/> */}
                        <i class='bx bxs-user-circle text-4xl text-dodge-b' ></i>
                    </button>
                </div>
            </div>
        </header>
    );
});

export default TopHeader;