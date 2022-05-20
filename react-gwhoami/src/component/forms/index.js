import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import ReactDatePicker from "react-datepicker";
//import PasswordStrengthBar from 'react-password-strength-bar';
import "react-datepicker/dist/react-datepicker.css";
import PasswordStrengthBar from 'react-password-strength-bar';


export const InputText = React.memo(({ styleClass, formKey, formRef, uiRefresh, label, placeholder, required = "" }) => {
    const isNotValid = () => required && formRef.current.isSubmit && !formRef.current[formKey];
    const inValidBorder = () => isNotValid() ? ' border-red-500' : '';
    const [, refresh] = useState(-1);
    const setFormVal = (e) => {
        formRef.current[formKey] = e.currentTarget.value;
        refresh(Date.now());
    }

    //required for the placeholder
    const falseInput = isNotValid() ? placeholder + ' Required' : placeholder;
    const colorID = isNotValid() ? "inputIDred": "inputIDgrey";

    return (
        <div className={`text-xs ${styleClass}${isNotValid() ? ' mark-err' : ''}`}>
            <input id = {colorID} maxLength = "25" type="text" required={!!required} className={`w-full p-0 rounded${inValidBorder()}`} placeholder={falseInput} value={formRef.current[formKey]} onChange={e => setFormVal(e)} />
            
                {/* this part of the code is unnecessary 
                making the placeholder to do all the work*/}

                {/*//If the input is not valid and the feature is required
                //print what is inside the required

                 this is what is triggered when the input is not given */}
                

               {/*{ isNotValid() && <div className='flex justify-start items-left text-red-400 text-xs mt-1'>
                                    {/*{required}  {/* {..} is for printing variables values 
                                    {falseInput}
                                </div>}&nbsp;*/}
            
            <label className={`text-red-500 text-xs mb-0${required ? ' required' : ''}`}>

                {/* This lable is unnecessary */}

                {/*{label}          {/*displays the respective text */}
            </label >&nbsp;{/*space between two words with out going to next line*/}
            
            
            
        </div>
    );
});

export const InputEmail = React.memo(({ styleClass, formKey, formRef, uiRefresh, label, placeholder, required = "", readonly = false, disabled = false }) => {
    const isEmail = useRef(new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}'))
    const isNotValid = () => required && formRef.current.isSubmit && (!formRef.current[formKey] || !isEmail.current.test(formRef.current[formKey]));
    const inValidBorder = () => isNotValid() ? ' border-red-500' : `${disabled ? ' bg-gray-200' : ''}`;
    const errorNum = () => !formRef.current[formKey] ? 1 : !isEmail.current.test(formRef.current[formKey]) ? 2 : 0;
    const [, refresh] = useState(-1);
    const setFormVal = (e) => {
        formRef.current[formKey] = e.currentTarget.value;
        refresh(Date.now());
    }

    //required for the placeholder
    const falseInput = isNotValid() ? placeholder + ' Required' : placeholder;
    const colorID = isNotValid() ? "inputIDred": "inputIDgrey";



    return (

        <div className={`${styleClass}${isNotValid() ? ' mark-err' : ''}`}>
            <input type="text" id= {colorID} required={!!required} className={`w-full p-0 rounded${inValidBorder()}`} placeholder={falseInput} value={formRef.current[formKey]} onChange={e => setFormVal(e)} readOnly={readonly} disabled={disabled} />
            
            {/*this is not necessary */}
            {/*{isNotValid() && <div className='flex justify-start items-left text-red-400 text-xs mt-1'>{errorNum() === 1 ? required : 'Invalid email address'}</div>}*/}

            &nbsp;<label className={`text-red-500 text-xs mb-0${required ? ' required' : ''}`}>{/*label*/}</label>&nbsp;

        </div>
    );
});

export const InputRadio = React.memo(({ styleClass = "", formKey, formRef, ui, name, label, values = [], icons = [], required = "", colors = [] }) => {
    const isNotValid = () => required && formRef.current.isSubmit && !formRef.current[formKey];
    const inValidBorder = () => isNotValid() ? 'border-red-500' : 'border-gray-400';
    const [, refresh] = useState(-1);
    const setFormVal = (e) => {
        formRef.current[formKey] = e.currentTarget.value;
        refresh(Date.now());
    }
    return (

        <div className={`${styleClass}${isNotValid() ? ' mark-err' : ''}`}>
            <label className="text-gray-600 mb-1 required">{label}</label>
            <div className="flex">
                {values.map((r, i) => (
                    <label key={i} className={`inline-flex items-center${i > 0 ? ' ml-5' : ''}`}>
                        <input
                            type="radio"
                            className={`rounded-full ${inValidBorder()} text-blue-400 shadow-sm focus:border-blue-700 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50`}
                            name={name}
                            value={r}
                            defaultChecked={formRef.current[formKey] === r}
                            onChange={e => setFormVal(e)}
                        />
                        <span className="ml-2 text-gray-600">
                            {icons[i] && <FontAwesomeIcon icon={icons[i]} className="text-2xl mr-1" style={{ color: formRef.current[formKey] === r ? colors[i] || 'rgb(75 85 99)' : 'rgb(75 85 99)' }} />}
                            <span>{r}</span>
                        </span>
                    </label>
                ))}
            </div>
            {isNotValid() && <div className='flex justify-start items-center text-red-500 text-xs mt-1'>{required}</div>}
        </div>
    );
});

export const InputSelect = React.memo(({ styleClass, formKey, formRef, ui, label, options = [], callback = null, placeholder = "", required = "", ID = "" }) => {
    const isNotValid = () => required && formRef.current.isSubmit && !formRef.current[formKey];
    const inValidBorder = () => isNotValid() ? 'border-red-500' : 'border-gray-400';
    const [, refresh] = useState(-1);
    const setFormVal = (e) => {
        formRef.current[formKey] = e.currentTarget.value;
        if (callback) callback();
        else refresh(Date.now());
    }
    return (
        <div className={`${styleClass}${isNotValid() ? ' mark-err' : ''}`}>

            <label className="text-gray-600 mb-1 required">{label}</label> 

             {/* the name at the top*/}

            <select className={`border ${inValidBorder()} w-full p-1 border border-slate-300 hover:border-red-800 ... rounded`} defaultValue={formRef.current[formKey]} onChange={e => setFormVal(e)} id={ID}>

                <option value="">{placeholder}</option>

                {options.map((itm, idx) => <option key={idx} value={itm.key || itm}>{itm.name || itm}</option>)}

            </select>
            {isNotValid() && <div className='flex justify-start items-center text-red-500 text-xs mt-1'>{required}</div>}
        </div>
    );
});

export const InputPhone = React.memo(({ styleClass, formKey, formRef, ui, label, callback = null, code, placeholder = "", required = "", ID = "" }) => {
    const isNotValid = () => required && formRef.current.isSubmit && !formRef.current[formKey];
    const inValidBorder = () => isNotValid() ? 'border-red-500' : 'border-gray-400';
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
                    className={`inline-flex items-center justify-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-slate-300 hover:border-red-800 ... ${inValidBorder()} dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 w-12`}
                >{formRef.current[code] || '-'}</span>
                <input
                    type="text"
                    className={`rounded-none rounded-r-lg border border-slate-300 hover:border-red-800 ... border ${inValidBorder()} text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder={placeholder}
                    value={formRef.current[formKey]}
                    onChange={e => setFormVal(e)}
                />
            </div>
            {isNotValid() && <div className='flex justify-start items-center text-red-500 text-xs mt-1'>{required}</div>}
        </div>
    );
});

export const InputDOB = React.memo(({ styleClass, formKey, formRef, ui, label, callback = null, code, placeholder = "", required = "", ID = "" }) => {
    const isNotValid = () => required && formRef.current.isSubmit && !formRef.current[formKey];
    const inValidBorder = () => isNotValid() ? 'border-red-500' : 'border-gray-400';
    const [, refresh] = useState(-1);
    const setFormVal = (date) => {
        formRef.current[formKey] = date;
        if (callback) callback();
        else refresh(Date.now());
    }

    //required for the placeholder
    const falseInput = isNotValid() ? placeholder + ' Required' : placeholder;
    const colorID = isNotValid() ? "inputIDred": "inputIDgrey";


    return (
        <div className={`${styleClass}${isNotValid() ? ' mark-err' : ''}`}>

            <ReactDatePicker maxDate={new Date()} id = {colorID} selected={formRef.current[formKey]} onChange={date => setFormVal(date)} placeholderText={falseInput} className={`border ${inValidBorder()} w-full p-1 border border-slate-300 hover:border-red-800 ... rounded`} dateFormat={'MMM/dd/yyyy'} />
                    {/*DOB is setup to only take in an input for
                    when the date is before the current day, so unwanted dates are not possible */}

            {/*{isNotValid() && <div className='flex justify-start items-left text-red-400 text-xs mt-1'>{required}</div>}
            &nbsp;*/}
            
            <label className="text-red-500 text-xs mb-0 required"></label>&nbsp;
        </div>
    );
});

export const PasswordCheck = React.memo(({ styleClass, formKey, formRef, ui, ID = "" }) => {
    const isNotValid = () => formRef.current.isSubmit && !formRef.current[formKey];
    const inValidBorder = () => {
        return isNotValid() ? 'border-red-500' : (formRef.current.isSubmit && feed >= 0 && feed < 2) ? 'border-red-500' : 'border-gray-400';
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
        return (formRef.current[formKey] !== formRef.current[`${formKey}_re`]);
    }

    //required for the placeholder
    const placeholder = "Password";
    const falseInput = isNotValid() ? placeholder + ' Required' : placeholder;
    const colorID = isNotValid() ? "inputIDred": "inputIDgrey";



    return (
        <>
            <div className={`flex flex-col${(isNotValid() || (formRef.current.isSubmit && feed >= 0 && feed < 2)) ? ' mark-err' : ''}${formRef.current[formKey].length ? '' : ' mb-4'}`}>
                <div class="flex flex-row">
                    <div class="w-1/2 ... ">
                        <div class="row border border-slate-300 hover:border-red-800 ...">
                            <div class="icon">
                                <i class="fa fa-key"></i>
                            </div>

                            <input
                                type="password"
                                id = {colorID}
                                className={`border ${inValidBorder()} w-full p-1 border border-slate-300 hover:border-red-800 ... rounded focus:border-dodge-b`}
                                placeholder={falseInput}
                                value={formRef.current[formKey]}
                                onChange={evt => setFormVal(evt)}
                            />

                            {/*{isNotValid() && <div className='flex justify-start items-center text-red-500 text-xs mt-1'>Password is required</div>}*/}
                            
                            {formRef.current[formKey].length > 0 && <PasswordStrengthBar password={formRef.current[formKey]} className="mt-2" onChangeScore={(score, feed) => scoreFeed(score, feed)} />}
                            &nbsp;<label className="text-red-600 mb-1 required"></label>&nbsp;




                        </div>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div class="w-1/2 ... ">
                        <div class="row border border-slate-300 hover:border-red-800 ...">
                            <div class="icon">
                                <i class="fa fa-key"></i>
                            </div>

                            <input
                                type="password"
                                id = {colorID}
                                className={`border ${comparePass() ? 'border-red-500' : 'border-gray-400'} w-full p-1 border border-slate-300 hover:border-red-800 ... rounded focus:border-dodge-b`}
                                placeholder="Re-type password"
                                value={formRef.current[`${formKey}_re`]}
                                onChange={e => rePass(e)}
                            />
                            {isNotValid() && <div className='flex justify-start items-center text-red-500 text-xs mt-1'>Password not matched</div>}
                            {/*{comparePass() && <div className='flex justify-start items-center text-red-500 text-xs mt-1'>Password not matched</div>}*/}
                            &nbsp;<label className="text-gray-600 mb-1 required"></label>&nbsp;
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});
