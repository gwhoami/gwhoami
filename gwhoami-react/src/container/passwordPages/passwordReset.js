import React, { useContext, useEffect, useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useHistory, useParams } from "react-router-dom";
import { InputEmail, PasswordCheck } from "../../component/forms";
import { apiGetCall } from "../../helper/API";
import { TinyLoader } from "../../helper/formElements";
import UrlNotFound from "../../helper/urlNotFound";
import ToastMessage from "../../toast";
import { MainContext, MenuContext } from "../../util/maincontext";

const PasswordReset = React.memo(() => {
    const params = useParams();
    const {showAlert} = useContext(MainContext);
    const {goTo} = useContext(MenuContext);
    const history = useHistory();
    const [sub, subRefresh] = useState(-1);
    const formData = useRef({
        initLoad: true,
        display: -1,
        email: '',
        password: '',
        password_re: '',
        userid: '',
        isLoading: false,
        isSubmit: false,
        formChanges: -1
    });
    useEffect(()=>{
        const check = async()=> {
            const res = await apiGetCall('/api/user/checkusername', {id: params.id});
            if (res.isError) {
                ToastMessage({ type: "error", message: res.Error.response.data.message, timeout: 2000 });
            } else {
                formData.current.initLoad = false;
                if (!res.success) formData.current.display = 1;
                else {
                    formData.current.display = 2;
                    formData.current.email = res.email;
                    formData.current.userid = res.userid;
                }
                subRefresh(Date.now());
            }
        };
        check();
        // eslint-disable-next-line
    }, []);
    const formSubmit = (e) => {
        e.preventDefault();
        formData.current.isSubmit = true;
        formData.current.formChanges = Date.now();
        subRefresh(Date.now());
        //console.log(document.querySelectorAll('.mark-err').length);
    }
    useEffect(()=>{
        if (formData.current.formChanges === -1) return;
        let first_err = document.querySelector('.mark-err');
        if (first_err) {
            first_err.scrollIntoView({ block: 'end',  behavior: 'smooth' });
            return;
        }
        subRefresh(Date.now());
        (async()=>{
            const res = await apiGetCall('/api/user/changepassword', {userid: formData.current.userid, id: params.id, password: formData.current.password});
            if (res.isError) {
                ToastMessage({ type: "error", message: res.Error.response.data.message, timeout: 2000 });
            } else {
                formData.current.display = 3;
                showAlert({type: 'success', message: <div>Password reset successfully!<br/>Please login again.</div>, callback: ()=>{
                    goTo(2);
                    history.push('/home/login');
                }});
            }
        })();
        // eslint-disable-next-line
    }, [formData.current.formChanges]);

    if (formData.current.initLoad) return <div className="w-full h-full bg-gray-100 flex justify-center items-center"><Oval secondaryColor="gray" color="#1e90ff" height={80} width={80} /></div>
    else if (formData.current.display === 1) return <UrlNotFound message="Password reset URL Expired!"/>
    else if (formData.current.display === 2) return (
        <div className="flex flex-col my-20">
            <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded-xl shadow-md text-black w-full">
                    <h1 className="mb-5 text-3xl text-left">New password</h1>
                    <div className="relative text-gray-700 mb-5">
                        <form noValidate onSubmit={e=>formSubmit(e)}>
                            <InputEmail styleClass="flex flex-col mb-4" formKey="email" formRef={formData} uiRefresh={sub} label="Email" placeholder="Name" required="Name is required" disabled={true}/>
                            <PasswordCheck styleClass="flex flex-col mb-8" formKey="password" ui={sub} formRef={formData} uiRefresh={sub}/>
                            <div className="flex justify-center mb-3 mt-8">
                                <button 
                                    className="h-14 px-32 m-2 text-indigo-100 transition-colors duration-150 bg-dodge-b rounded-full shadow-md shadow-gray-500 focus:shadow-outline hover:bg-dodge-d"
                                >
                                    {formData.current.isLoading ?<div className="w-12 flex justify-center"><TinyLoader/></div>: <>Reset</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
    else return null;
});

export default PasswordReset;