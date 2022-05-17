import React, { useCallback, useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { faFemale, faMale } from "@fortawesome/free-solid-svg-icons";
import { InputDOB, InputEmail, InputPhone, InputRadio, InputSelect, InputText, PasswordCheck } from "../component/forms";
import Constants from "../helper/Constants";
import { apiPostCall } from "../helper/API";
import ToastMessage from "../toast";



const RegisterUser = React.memo(() => {
    const [ui, uiRefresh] = useState(-1);
    const regRef = useRef({...Constants.user_empty_form});
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
        if (regRef.current.formChanges === -1) return;
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

        const apiCall = async()=> {
            const res = await apiPostCall('/api/user/userbasicreg',{...data});
            if (res.isError) {
                ToastMessage({ type: "error", message: res.Error.response.data.message, timeout: 2000 });
                regRef.current.isLoading = false;
                uiRefresh(Date.now());
            } else {
                regRef.current = {...Constants.user_empty_form}
                ToastMessage({ type: "success", message: "Registration successfull!", timeout: 1500 });
                uiRefresh(Date.now());
            }
        };
        apiCall();
    },[regRef.current.formChanges]);
    return (
        <div className="flex flex-col my-20">
            <form noValidate onSubmit={e=>formSubmit(e)}>
                <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-center text-3xl">Registration</h1>
                        <div class="flex ...">

                                <div class="flex ... ">
                                    <InputText styleClass="flex flex-col mb-4" formKey="fname" formRef={regRef} uiRefresh={ui} label="First Name" placeholder="First Name" required="First Name is required"/>
                                 </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                 <div class="w-1/2 ... ">
                                    <InputText styleClass="flex flex-col mb-4" formKey="Lname" formRef={regRef} uiRefresh={ui} label="Last Name" placeholder="Last Name" required="Last Name is required"/>
                                 </div>
                               </div>
                              
                                  
                               <div class="flex ... ">
                                    <div class="w-1/2 ... ">
                                      <InputDOB styleClass="flex flex-col mb-4" formKey="dob" ID="dob" formRef={regRef} uiRefresh={ui} label="DOB" placeholder="DOB" required="Date of birth is required" callback={dobCallback}/>
                                     </div>
                                    &nbsp;&nbsp;&nbsp;  
                                    <div class="w-1/2 ... ">
                                    <InputEmail styleClass="flex flex-col mb-4" formKey="username" formRef={regRef} uiRefresh={ui} label="Email" placeholder="Email" required="Email is required"/>
                                </div></div>


                  
                                <div class="flex...">
                                    <PasswordCheck styleClass="flex flex-col mb-4" formKey="password" ui={ui} formRef={regRef} uiRefresh={ui}/>
                                </div>


                                <div class="flex ... ">
                                    <div class="w-1/2 ... ">
                                    <InputPhone styleClass="flex flex-col mb-4" formKey="phone" ID="phone" formRef={regRef} uiRefresh={ui} label="Phone" code="phonecode" placeholder="Phone/Mobile" required="Phone is required"/>
                                     </div>
                                    &nbsp;&nbsp;&nbsp;  
                                    <div class="w-1/2 ... ">
                                    <InputText styleClass="flex flex-col mb-4" formKey="Address" formRef={regRef} uiRefresh={ui} label="Address" placeholder="Address" required="Address is required"/>
                                </div></div>


                        
                               <div class="flex ... ">
                                    <div class="w-1/2 ... ">
                                        <InputSelect styleClass="flex flex-col mb-4" formKey="country" formRef={regRef} uiRefresh={ui} label="Country" options={["United State", "India"]} placeholder="Select country" required="Country is required" callback={countryCallback}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;  
                                    <div class="w-1/2 ... ">
                                        <InputSelect styleClass="flex flex-col mb-4" formKey="state" ID="state" formRef={regRef} uiRefresh={ui} label="State" options={stateList.current[regRef.current.country]||[]} placeholder="Select state" required="State is required" callback={stateCallback}/>
                                    </div></div>

                        
                                <div class="flex ... ">
                                <div class="w-1/2 ... ">

                                        <InputText styleClass="flex flex-col mb-4" formKey="zipcode" formRef={regRef} uiRefresh={ui} label="Zip/Postal" placeholder="Zip/Postal" required="Zip/Postal is required"/>
                                </div>
                                 &nbsp;&nbsp;&nbsp;  
                            <div class="w-1/2 ... ">
                                <InputRadio styleClass="flex flex-col mb-3" formKey="business" formRef={regRef} ui={ui} name="business" label="Individual/Business" values={['Individual', 'Business']} required="Individual/Business is required"/>
                        </div></div>
                        
                        
                        <InputRadio styleClass="flex flex-col mb-3" formKey="gender" formRef={regRef} ui={ui} name="gender" label="Gender" values={['Male', 'Female', 'Other']} icons={[faMale, faFemale]} required="This field is required"/>
                        
                        
                        <InputRadio styleClass="flex flex-col mb-4" formKey="minor" formRef={regRef} ui={ui} name="minor" label="Is the user being minor (less than 18 years old)" values={['Yes', 'No']} required="This field is required"/>
                       

                        <div className="flex mb-4 justify-center">
                            <button 
                                className="h-14 px-12 m-2 text-indigo-100 transition-colors duration-150 bg-dodge-b rounded-full shadow-md shadow-gray-500 focus:shadow-outline hover:bg-dodge-d"
                            >
                            {regRef.current.isLoading ?
                                <div className="w-12 flex justify-center"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg></div>
                            : <>Submit</>}
                            </button>
                        </div>
                    </div>
                </div>
                
            </form>
        </div>
       
    );
});

export default RegisterUser;
