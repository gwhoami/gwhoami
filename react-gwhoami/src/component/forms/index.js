import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import ReactDatePicker from "react-datepicker";
//import PasswordStrengthBar from 'react-password-strength-bar';
import "react-datepicker/dist/react-datepicker.css";
import PasswordStrengthBar from 'react-password-strength-bar';

export const InputText = React.memo(({styleClass, formKey, formRef, uiRefresh, label, placeholder, required=""}) => {
    const isNotValid = () =>required && formRef.current.isSubmit && !formRef.current[formKey];
    const inValidBorder = ()=>isNotValid() ? ' border-red-500' : '';
    const [, refresh] = useState(-1);
    const setFormVal = (e) => {
        formRef.current[formKey] = e.currentTarget.value;
        refresh(Date.now());
    }
    return (
        <div className={`${styleClass}${isNotValid() ? ' mark-err' : ''}`}>
            <label className={`text-gray-600 mb-1${required?' required':''}`}>{label}</label>
            <input type="text" required={!!required} className={`w-full p-2 rounded${inValidBorder()}`} placeholder={placeholder} value={formRef.current[formKey]} onChange={e=>setFormVal(e)} />
            {isNotValid() && <div className='flex justify-start items-center text-red-500 text-xs mt-1'>{required}</div>}
        </div>
    );
});

export const InputEmail = React.memo(({styleClass, formKey, formRef, uiRefresh, label, placeholder, required="", readonly=false, disabled=false}) => {
    const isEmail = useRef(new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}'))
    const isNotValid = () =>required && formRef.current.isSubmit && (!formRef.current[formKey] || !isEmail.current.test(formRef.current[formKey]));
    const inValidBorder = ()=>isNotValid() ? ' border-red-500' : `${disabled ? ' bg-gray-200' : ''}`;
    const errorNum = () => !formRef.current[formKey] ? 1 : !isEmail.current.test(formRef.current[formKey]) ? 2 : 0;
    const [, refresh] = useState(-1);
    const setFormVal = (e) => {
        formRef.current[formKey] = e.currentTarget.value;
        refresh(Date.now());
    }
    return (
        <div className={`${styleClass}${isNotValid() ? ' mark-err' : ''}`}>
            <label className={`text-gray-600 mb-1${required?' required':''}`}>{label}</label>
            <input type="text" required={!!required} className={`w-full p-2 rounded${inValidBorder()}`} placeholder={placeholder} value={formRef.current[formKey]} onChange={e=>setFormVal(e)} readOnly={readonly} disabled={disabled} />
            {isNotValid() && <div className='flex justify-start items-center text-red-500 text-xs mt-1'>{errorNum() === 1 ? required : 'Invalid email address'}</div>}
        </div>
    );
});

export const InputRadio = React.memo(({styleClass="",formKey, formRef, ui, name, label, values = [], icons = [], required="", colors=[]}) => {
    const isNotValid = () =>required && formRef.current.isSubmit && !formRef.current[formKey];
    const inValidBorder = ()=>isNotValid() ? 'border-red-500' : 'border-gray-400';
    const [, refresh] = useState(-1);
    const setFormVal = (e) => {
        formRef.current[formKey] = e.currentTarget.value;
        refresh(Date.now());
    }
    return (
        <div className={`${styleClass}${isNotValid() ? ' mark-err' : ''}`}>
            <label className="text-gray-600 mb-1 required">{label}</label>
            <div className="flex">
                {values.map((r, i)=> (
                    <label key={i} className={`inline-flex items-center${i > 0 ? ' ml-5' : ''}`}>
                        <input 
                            type="radio" 
                            className={`rounded-full ${inValidBorder()} text-blue-400 shadow-sm focus:border-blue-700 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50`}
                            name={name}
                            value={r}
                            defaultChecked={formRef.current[formKey] === r}
                            onChange={e=>setFormVal(e)}
                        />
                        <span className="ml-2 text-gray-600">
                            {icons[i] && <FontAwesomeIcon icon={icons[i]} className="text-2xl mr-1" style={{color: formRef.current[formKey] === r ? colors[i]||'rgb(75 85 99)' : 'rgb(75 85 99)' }} />}
                            <span>{r}</span>
                        </span>
                    </label>
                ))}
            </div>
            {isNotValid() && <div className='flex justify-start items-center text-red-500 text-xs mt-1'>{required}</div>}
        </div>
    );
});

export const InputSelect = React.memo(({styleClass, formKey, formRef, ui, label, options = [], callback = null,placeholder="", required="", ID=""}) => {
    const isNotValid = () =>required && formRef.current.isSubmit && !formRef.current[formKey];
    const inValidBorder = ()=>isNotValid() ? 'border-red-500' : 'border-gray-400';
    const [, refresh] = useState(-1);
    const setFormVal = (e) => {
        formRef.current[formKey] = e.currentTarget.value;
        if (callback) callback();
        else refresh(Date.now());
    }
    return (
        <div className={`${styleClass}${isNotValid() ? ' mark-err' : ''}`}>
            <label className="text-gray-600 mb-1 required">{label}</label>
            <select className={`border ${inValidBorder()} w-full p-2 rounded`} defaultValue={formRef.current[formKey]} onChange={e=>setFormVal(e)} id={ID}>
                <option value="">{placeholder}</option>
                {options.map((itm, idx)=><option key={idx} value={itm.key||itm}>{itm.name||itm}</option>)}
            </select>
            {isNotValid() && <div className='flex justify-start items-center text-red-500 text-xs mt-1'>{required}</div>}
        </div>
    );
});

export const InputPhone = React.memo(({styleClass, formKey, formRef, ui, label, callback = null, code, placeholder="", required="", ID=""}) => {
    const isNotValid = () =>required && formRef.current.isSubmit && !formRef.current[formKey];
    const inValidBorder = ()=>isNotValid() ? 'border-red-500' : 'border-gray-400';
    const [, refresh] = useState(-1);
    const setFormVal = (e) => {
        formRef.current[formKey] = e.currentTarget.value;
        if (callback) callback();
        else refresh(Date.now());
    }
    return (
        <div className={`${styleClass}${isNotValid() ? ' mark-err' : ''}`}>
            <label className="text-gray-600 mb-1 required">{label}</label>
            <div className="flex">
                <span 
                    className={`inline-flex items-center justify-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 ${inValidBorder()} dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 w-12`}
                >{formRef.current[code]||'-'}</span>
                <input 
                    type="text" 
                    className={`rounded-none rounded-r-lg border ${inValidBorder()} text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder={placeholder}
                    value={formRef.current[formKey]}
                    onChange={e=>setFormVal(e)}
                />
            </div>
            {isNotValid() && <div className='flex justify-start items-center text-red-500 text-xs mt-1'>{required}</div>}
        </div>
    );
});

export const InputDOB = React.memo(({styleClass, formKey, formRef, ui, label, callback = null, code, placeholder="", required="", ID=""}) => {
    const isNotValid = () =>required && formRef.current.isSubmit && !formRef.current[formKey];
    const inValidBorder = ()=>isNotValid() ? 'border-red-500' : 'border-gray-400';
    const [, refresh] = useState(-1);
    const setFormVal = (date) => {
        formRef.current[formKey] = date;
        if (callback) callback();
        else refresh(Date.now());
    }
    return (
        <div className={`${styleClass}${isNotValid() ? ' mark-err' : ''}`}>
            <label className="text-gray-600 mb-1 required">DOB</label>
            <ReactDatePicker selected={formRef.current[formKey]} onChange={date=>setFormVal(date)} placeholderText={placeholder} className={`border ${inValidBorder()} w-full p-2 rounded`} dateFormat={'MMM/dd/yyyy'}/>
            {isNotValid() && <div className='flex justify-start items-center text-red-500 text-xs mt-1'>{required}</div>}
        </div>
    );
});

export const PasswordCheck = React.memo(({styleClass, formKey, formRef, ui, ID=""}) => {
    const isNotValid = () =>formRef.current.isSubmit && !formRef.current[formKey];
    const inValidBorder = ()=> {
        return isNotValid() ? 'border-red-500' : (formRef.current.isSubmit && feed >=0 && feed < 2) ? 'border-red-500' : 'border-gray-400';
    }
    const [feed, setFeed] = useState(0);
    const [, refresh] = useState(-1);
    const setFormVal = (e) => {
        formRef.current[formKey] = e.currentTarget.value;
        refresh(Date.now());
    }
    const rePass = (e) => {
        formRef.current[`${formKey}_re`] = e.currentTarget.value;
        refresh(Date.now());
    }
    const scoreFeed = (score, feed) => {
        setFeed(score);
    }
    const comparePass = () => {
        return (formRef.current[formKey] !== formRef.current[`${formKey}_re`] );
    }
    return (
        <>
            <div className={`flex flex-col${(isNotValid() || (formRef.current.isSubmit && feed >=0 && feed < 2)) ? ' mark-err' : ''}${formRef.current[formKey].length ? '': ' mb-4'}`}>
                <label className="text-gray-600 mb-1 required">Password</label>
                <input 
                    type="password" 
                    className={`border ${inValidBorder()} w-full p-2 rounded focus:border-dodge-b`} 
                    placeholder="Password" 
                    value={formRef.current[formKey]}
                    onChange = {evt=>setFormVal(evt)}
                />
                {isNotValid() && <div className='flex justify-start items-center text-red-500 text-xs mt-1'>Password is required</div>}
                {formRef.current[formKey].length > 0 && <PasswordStrengthBar password={formRef.current[formKey]} className="mt-2" onChangeScore={(score, feed)=>scoreFeed(score, feed)}/>}
            </div>
            <div className={`flex flex-col mb-4${comparePass() ? ' mark-err' : ''}`}>
                <label className="text-gray-600 mb-1 required">Re-Password</label>
                <input 
                    type="password" 
                    className={`border ${comparePass() ? 'border-red-500' : 'border-gray-400'} w-full p-2 rounded focus:border-dodge-b`} 
                    placeholder="Re-type password"
                    value={formRef.current[`${formKey}_re`]}
                    onChange={e=>rePass(e)}
                />
                {comparePass() && <div className='flex justify-start items-center text-red-500 text-xs mt-1'>Password not matched</div>}
            </div>
        </>
    );
});
