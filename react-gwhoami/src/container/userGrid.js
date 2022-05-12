import { faTrashAlt, faUserCheck, faUserEdit, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import { apiGetCall } from "../helper/API";
import { TinyLoader } from "../helper/formElements";
import ToastMessage from "../toast";
import { MainContext } from "../util/maincontext";
import {Oval} from 'react-loader-spinner';
import ReactModal from "react-modal";
import UserPanelDialog from "../modalDialog/userPanel";

const UserGrid = React.memo(() => {
    const [ui, uiRefresh] = useState(-1);
    const gridData = useRef({
        list: [], 
        initLoad: false,
        isOpen: false,
        selectedIndex: -1,
        toggleModal: ()=> {
            // dataRef.current.recIdx = -1;
            // dataRef.current.selRec = {x: '0', y: '0', show: false, cx: -1, cy: -1, added: false, countryName: '', Id: getRowId(8)}
            gridData.current.isOpen = !gridData.current.isOpen;
            uiRefresh(Date.now());
        }
    });
    const {showAlert} = useContext(MainContext);
    useEffect(()=>{
        (async()=>{
            const res = await apiGetCall('/api/user/userinfo',{});
            if (res.isError) {
               ToastMessage({ type: "error", message: res.Error.stack, timeout: 1500 });
            } else {
                gridData.current.initLoad = true;
                gridData.current.list = res;
                uiRefresh(Date.now());
            }
        })();
    }, []);
    const editRecord = (idx) => {
        gridData.current.selectedIndex = idx;
        gridData.current.toggleModal();
    }
    const removeRecord = (row, idx) => {
        showAlert({type: 'confirm', title: 'Are you sure to delete?', callback: (msg) => {
            if (msg === 'no') return;
            row.loader = true;
            uiRefresh(Date.now());
            (async()=> {
                const res = await apiGetCall('/api/user/removeuser', {id: row._id});
                if (res.isError) {
                    ToastMessage({ type: "error", message: res.Error.stack, timeout: 1500 });
                 } else {
                     gridData.current.list.splice(idx, 1);
                     uiRefresh(Date.now());
                 }
            })();
        }});
    }
    const afterOpenModal = () => {
        document.querySelector('div.mymodal').classList.add('slideshow');
    }
    if (!gridData.current.initLoad)
        return <div className="w-full h-full bg-gray-100 flex justify-center items-center"><Oval secondaryColor="gray" color="#1e90ff" height={80} width={80} /></div>
    return (
        <>
        <ReactModal
            isOpen={gridData.current.isOpen}
            onRequestClose={gridData.current.toggleModal}
            contentLabel="My dialog"
            onAfterOpen={afterOpenModal}
            className="mymodal max-w-xl w-full"
            overlayClassName="myoverlay"
            closeTimeoutMS={500}
        >
            <div className="flex">
                <UserPanelDialog uiref={ui} dataRef={gridData}/>
            </div>
      </ReactModal>
        <div className="flex justify-center h-full">
            <div className="flex flex-col mt-20">
                <div className="flex justify-end mb-4">
                    <button 
                        className="h-12 px-12 m-2 text-indigo-100 transition-colors duration-150 bg-dodge-b rounded-full shadow-md shadow-gray-500 focus:shadow-outline hover:bg-dodge-d"
                        onClick={_=>editRecord(-1)}
                    >
                        Add
                    </button>
                </div>
                <div className="flex">
                    <div className="border flex border-black justify-center items-center w-28 bg-sky-b p-1 leading-5">Status</div>
                    <div className="border flex border-black justify-center items-center border-l-0 w-36 bg-sky-b p-1 leading-5">Name</div>
                    <div className="border flex border-black justify-center items-center border-l-0 w-24 bg-sky-b p-1">DOB</div>
                    <div className="border flex border-black justify-center items-center border-l-0 w-60 bg-sky-b p-1">Username</div>
                    <div className="border flex border-black justify-center items-center border-l-0 w-36 bg-sky-b p-1">Country</div>
                    <div className="border flex border-black justify-center items-center border-l-0 w-16 bg-sky-b p-1">Edit</div>
                    <div className="border flex border-black justify-center items-center border-l-0 w-16 bg-sky-b p-1">Delete</div>
                </div>
                {gridData.current.list.length === 0 && <div className="h-32 w-full border border-black border-t-0 flex justify-center items-center text-red-500">No record found</div>}
                {gridData.current.list.map((row, idx)=>(
                    <div key={idx} className={`flex text-sm${row.loader ? ' relative': ''}`}>
                        {row.loader && <div className="absolute left-0 top-0 w-full h-full bg-gray-100 flex justify-center items-center border border-black border-t-0"><TinyLoader color="#1e90ff"/></div>}
                        <div className={`flex justify-start items-center border border-black border-t-0 p-1.5 bg-white w-28`}>
                            {row.approved === 'Yes' ?
                                <><FontAwesomeIcon icon={faUserCheck} className="ml-1 mr-2 text-green-700 text-base"/> Approved</>:
                                <><FontAwesomeIcon icon={faUserTimes} className="ml-1 mr-2 text-red-700 text-base"/> Pending</>
                            }
                        </div>
                        <div className={`flex items-center border border-black border-t-0 border-l-0 p-1.5 bg-white w-36`}>{row.name}</div>
                        <div className={`flex justify-center items-center border border-black border-t-0 border-l-0 p-1.5 bg-white w-24`}>{new Date(row.dob).toLocaleDateString()}</div>
                        <div className={`flex items-center border border-black border-t-0 border-l-0 py-1.5 px-2 bg-white w-60`}>{row.username}</div>
                        <div className={`flex justify-center items-center border border-black border-t-0 border-l-0 p-1 bg-white w-36`}>{row.country}</div>
                        <div className={`flex justify-center items-center border border-black border-t-0 border-l-0 p-1 bg-white w-16 text-base`}>
                            <FontAwesomeIcon icon={faUserEdit} className="cursor-pointer hover:text-dodge-b" onClick={_=>editRecord(idx)}/>
                        </div>
                        <div className={`flex justify-center items-center border border-black border-t-0 border-l-0 p-1.5 bg-white w-16 text-base`}>
                            <FontAwesomeIcon icon={faTrashAlt} className="cursor-pointer hover:text-red-700" onClick={_=>removeRecord(row, idx)}/>
                        </div>
                    </div>
                ))}
                {/* <div className="flex text-sm">
                    <div className={`flex justify-start items-center border border-black border-t-0 p-1.5 bg-white w-28`}>
                    <FontAwesomeIcon icon={faUserCheck} className="ml-1 mr-2 text-green-700 text-base"/> Approved
                    </div>
                    <div className={`flex items-center border border-black border-t-0 border-l-0 p-1.5 bg-white w-36`}>Ajith Kumar</div>
                    <div className={`flex justify-center items-center border border-black border-t-0 border-l-0 p-1.5 bg-white w-24`}>05/31/1971</div>
                    <div className={`flex items-center border border-black border-t-0 border-l-0 py-1.5 px-2 bg-white w-60`}>m.sumansavio@gmail.com</div>
                    <div className={`flex justify-center items-center border border-black border-t-0 border-l-0 p-1.5 bg-white w-36`}>USA</div>
                    <div className={`flex justify-center items-center border border-black border-t-0 border-l-0 p-1.5 bg-white w-16 text-base`}>
                        <FontAwesomeIcon icon={faUserEdit} className="cursor-pointer hover:text-dodge-b"/>
                    </div>
                    <div className={`flex justify-center items-center border border-black border-t-0 border-l-0 p-1.5 bg-white w-16 text-base`}>
                        <FontAwesomeIcon icon={faTrashAlt} className="cursor-pointer hover:text-red-700"/>
                    </div>
                </div> */}
            </div>
        </div>
        </>
    );
});

export default UserGrid;