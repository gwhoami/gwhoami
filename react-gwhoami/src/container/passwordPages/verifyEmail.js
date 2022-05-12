import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import { apiPostCall } from "../../helper/API";
import { TinyLoader } from "../../helper/formElements";
import ToastMessage from "../../toast";
import { MenuContext } from "../../util/maincontext";

const VerifyEmail = React.memo(() => {
    const {goTo} = useContext(MenuContext);
    const [, subRefresh] = useState(-1);
    const formData = useRef({
        username: '',
        mode: 1,
        isValid: true,
        failedMessage: '',
        isLoading: false
    });
    const isEmail = useRef(new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}'))
    const setFormValue = (e, key) => {
        formData.current[key] = e.currentTarget.value;
        formData.current.isValid = true;
        subRefresh(Date.now());
    }
    useEffect(()=>{
        goTo(-1);
        // eslint-disable-next-line
    }, []);
    const checkValidattion = () => {
        if (!formData.current.username.trim()) {
            formData.current.isValid = false;
            formData.current.failedMessage = 'Email is required';
            subRefresh(Date.now());
            return false;
        } else if (!isEmail.current.test(formData.current.username.trim())) {
            formData.current.isValid = false;
            formData.current.failedMessage = 'Invalid email address';
            subRefresh(Date.now());
            return false;
        }
        return true;
    }
    const verfiyEmail = () => {
        if (!checkValidattion()) return;
        formData.current.isLoading = true;
        subRefresh(Date.now());
        (async()=>{
            const res = await apiPostCall('/api/user/verifyemail', {username: formData.current.username,changeURL: encodeURIComponent(`${process.env.REACT_APP_BASE_URL}/home/passwordreset`)});
            if (res.isError) {
                ToastMessage({ type: "error", message: res.Error.response.data.message, timeout: 2000 });
                formData.current.isLoading = false;
                subRefresh(Date.now());
            } else {
                formData.current.isLoading = false;
                if (!res.success) {
                    ToastMessage({ type: "error", message: 'Invalid email address!', timeout: 2000 });
                } else formData.current.mode = 2;
                subRefresh(Date.now());
            }
        })();
    }
    if (formData.current.mode === 2) return (
        <div className="flex flex-col my-20">
            <div className="container max-w-xl mx-auto text-xl flex flex-col">
                <span>Password reset URL has been send to you email address. Please check you email inbox and reset your password!</span>
                <span className="mt-5">Thanks,<br/>Gwhoami Admin</span>
            </div>
        </div>
    );
    else return (
        <div className="flex flex-col my-20">
            <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded-xl shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-left">Verify Email</h1>
                    <div className="relative text-gray-700 mb-8">
                        <input 
                            className={`w-full h-10 pl-9 pr-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline${!formData.current.isValid ? ' border-red-500' : ''}`}
                            type="text"
                            placeholder="Email address"
                            value={formData.current.username}
                            onChange={e=>setFormValue(e, 'username')}
                        />
                        <div className="absolute inset-y-0 left-1 mt-0.5 flex items-center px-2 pointer-events-none">
                            <FontAwesomeIcon icon={faEnvelope} className="text-xl"/>
                        </div>
                        {!formData.current.isValid && <span className="absolute left-0 bottom-0 -mb-5 text-xs text-red-500">{formData.current.failedMessage}</span>}
                    </div>
                    <div className="flex justify-center mb-5">
                        <button 
                            className="h-14 px-32 m-2 text-indigo-100 transition-colors duration-150 bg-dodge-b rounded-full shadow-md shadow-gray-500 focus:shadow-outline hover:bg-dodge-d"
                            onClick={verfiyEmail}
                        >
                            {formData.current.isLoading ?<div className="w-12 flex justify-center"><TinyLoader/></div>: <>Verify</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default VerifyEmail;