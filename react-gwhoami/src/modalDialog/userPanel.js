import { faFemale, faMale, faTimes, faUserCheck, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { InputDOB, InputEmail, InputPhone, InputRadio, InputSelect, InputText, PasswordCheck } from "../component/forms";
import { apiPostCall } from "../helper/API";
import Constants from "../helper/Constants";
import { TinyLoader } from "../helper/formElements";
import ToastMessage from "../toast";
const UserPanelDialog = React.memo(({uiref, dataRef}) => {
    const [ui, uiRefresh] = useState(-1);
    const regRef = useRef({
        ...(dataRef.current.selectedIndex === -1 ? Constants.user_empty_form : dataRef.current.list[dataRef.current.selectedIndex]),
        dob: dataRef.current.selectedIndex === -1 ? '' : new Date(dataRef.current.list[dataRef.current.selectedIndex].dob)
    });
    const isNew = useRef(dataRef.current.selectedIndex === -1);
    const stateList = useRef({
        'United State': [...Constants.usa],
        'India': [...Constants.india]
    });
    const formSubmit = (e) => {
        e.preventDefault();
        regRef.current.isSubmit = true;
        regRef.current.formChanges = Date.now();
        uiRefresh(Date.now());
        //console.log(document.querySelectorAll('.mark-err').length);
    }
    const countryCallback = useCallback(() => {
        regRef.current.state = '';
        regRef.current.phonecode = Constants.phoneCode[regRef.current.country];
        document.querySelector('#state').selectedIndex = 0;
        uiRefresh(Date.now());
    }, []);
    const stateCallback = useCallback(() => {
        uiRefresh(Date.now());
    }, []);
    const dobCallback = useCallback(() => {
        uiRefresh(Date.now());
    }, []);
    useEffect(()=>{
        if (regRef.current.formChanges === undefined || regRef.current.formChanges === -1) return;
        //alert(typeof regRef.current.formChanges);
        let first_err = document.querySelector('.mark-err');
        if (first_err) {
            first_err.scrollIntoView({ block: 'end',  behavior: 'smooth' });
            return;
        }
        regRef.current.isLoading = true;
        uiRefresh(Date.now());
        let data = {...regRef.current}
        delete data.isSubmit;
        delete data.formChanges;
        delete data.isLoading;
        //console.log(JSON.stringify(data));
        let params = {}
        if (data._id) {
            params.id = data._id;
            params.data = JSON.stringify(data);
        } else params = {...data}
        const apiCall = async()=> {
            const res = await apiPostCall(`/api/user/${data._id ? 'userbasicupdate' : 'userbasicreg'}`,params);
            if (res.isError) {
                ToastMessage({ type: "error", message: res.Error.response.data.message, timeout: 2000 });
                regRef.current.isLoading = false;
                uiRefresh(Date.now());
            } else {
                regRef.current.isLoading = false;
                if (dataRef.current.selectedIndex !== -1) {
                    dataRef.current.list[dataRef.current.selectedIndex] = {...data}
                    ToastMessage({ type: "success", message: "Successfully updated!", timeout: 1500 });
                } else {
                    dataRef.current.list.push({...data});
                    ToastMessage({ type: "success", message: "Successfully Registered!", timeout: 1500 });
                }
                dataRef.current.toggleModal();
                //uiRefresh(Date.now());
            }
        };
        apiCall();
        // eslint-disable-next-line
    },[regRef.current.formChanges]);
    return (
        <form noValidate onSubmit={e=>formSubmit(e)} className="w-full">
            <div className="container w-full flex-1 flex flex-col items-center justify-center">
                <div className="bg-white px-2 py-6 rounded text-black w-full">
                    <div className="relative w-full px-2">
                        <FontAwesomeIcon icon={faTimes} className="absolute top-2 right-5 cursor-pointer" onClick={dataRef.current.toggleModal}/>
                        <h1 className="mb-8 text-3xl">{isNew.current ? 'New Registration' : 'Edit Registration'}</h1>
                    </div>
                    <Scrollbars className="overflow-auto" style={{height: "70vh"}}>
                        <div className="p-5">
                            <InputText styleClass="flex flex-col mb-4 " formKey="name" formRef={regRef} uiRefresh={ui} label="Name" placeholder="Name" required="Name is required"/>
                            <InputEmail styleClass="flex flex-col mb-4" formKey="username" formRef={regRef} uiRefresh={ui} label="Email" placeholder="Email" required="Email is required" disabled={!isNew.current}/>
                            {isNew.current && <PasswordCheck styleClass="flex flex-col mb-4" formKey="password" ui={ui} formRef={regRef} uiRefresh={ui}/>}
                            <InputRadio styleClass="flex flex-col mb-3" formKey="business" formRef={regRef} ui={ui} name="business" label="Individual/Business" values={['Individual', 'Business']} required="Individual/Business is required"/>
                            <InputDOB styleClass="flex flex-col mb-4" formKey="dob" ID="dob" formRef={regRef} uiRefresh={ui} label="DOB" placeholder="DOB" required="Date of birth is required" callback={dobCallback}/>
                            <InputRadio styleClass="flex flex-col mb-3" formKey="gender" formRef={regRef} ui={ui} name="gender" label="Gender" values={['Male', 'Female', 'Other']} icons={[faMale, faFemale]} required="This field is required"/>
                            <InputText styleClass="flex flex-col mb-4" formKey="city" formRef={regRef} uiRefresh={ui} label="Country/City" placeholder="Country/City" required="Country/City is required"/>
                            <InputText styleClass="flex flex-col mb-4" formKey="zipcode" formRef={regRef} uiRefresh={ui} label="Zip/Postal" placeholder="Zip/Postal" required="Zip/Postal is required"/>
                            <InputSelect styleClass="flex flex-col mb-4 " formKey="country" formRef={regRef} uiRefresh={ui} label="Country" options={["United State", "India"]} placeholder="Select country" required="Country is required" callback={countryCallback}/>
                            <InputSelect styleClass="flex flex-col mb-4" formKey="state" ID="state" formRef={regRef} uiRefresh={ui} label="State" options={stateList.current[regRef.current.country]||[]} placeholder="Select state" required="State is required" callback={stateCallback}/>
                            <InputPhone styleClass="flex flex-col mb-4" formKey="phone" ID="phone" formRef={regRef} uiRefresh={ui} label="Phone" code="phonecode" placeholder="Phone/Mobile" required="Phone is required"/>
                            <InputRadio styleClass="flex flex-col mb-4" formKey="minor" formRef={regRef} ui={ui} name="minor" label="Is the user being minor (less than 18 years old)" values={['Yes', 'No']} required="This field is required"/>
                            <InputRadio styleClass="flex flex-col mb-4" formKey="approved" formRef={regRef} ui={ui} name="approved" label="Approved" icons={[faUserCheck, faUserTimes]} values={['Yes', 'No']} colors={['rgb(101 163 13)', 'rgb(239 68 68)']} required="This field is required"/>
                            <div className="flex mb-4 justify-center">
                                <button 
                                    className="h-14 px-12 m-2 text-indigo-100 transition-colors duration-150 bg-dodge-b rounded-full shadow-md shadow-gray-500 focus:shadow-outline hover:bg-dodge-d"
                                >
                                    {regRef.current.isLoading ?<div className="w-12 flex justify-center"><TinyLoader/></div>: <>Submit</>}
                                </button>
                            </div>
                        </div>
                    </Scrollbars>
                </div>
            </div>
        </form>
    );
});

export default UserPanelDialog;