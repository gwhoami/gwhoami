import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Style from './index.module.css';

const SpinLabel = (props) => (
    <>
        <FontAwesomeIcon
        icon="circle-notch"
        className="text-xl animate-spin mr-1"
        />
    </>
);

const InputButton = (({label, onClick, loading, className}) => {
    return (
        <button
        type="button"
        className={`${Style.inputbutton} ${className||'w-full'}`}
        onClick={onClick || null}
      >
        {loading ? <SpinLabel label={label} /> : <>{label}</>}
      </button>
    );
});

export default InputButton;