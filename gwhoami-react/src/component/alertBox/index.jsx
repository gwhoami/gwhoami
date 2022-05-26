import React, { useEffect, useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import InputButton from '../inputButton';

const AlertBox = React.memo(({showAlert, type, title, message, callback}) => {
    const [show, setShow] = useState(false);
    const closeAlert = () => {
        showAlert(p=>({...p, type: ''}));
        setShow(!show);
    }
    const [btnClick, setBtnClick] = useState('no');
    const confirmCallback = (click) => {
        setBtnClick(click);
        closeAlert();
    }
    useEffect(()=>{
        if (type !== '') setShow(true);
        if (type === 'confirm') setBtnClick('no');
        else setBtnClick('ok');
    },[type]);
    useEffect(()=>{
        if (!show && callback) {
            setTimeout(()=>callback(btnClick), 20);
        }
        // eslint-disable-next-line
    },[show]);
    if (!show) return null;
    else if (type === 'success') {
        return (
            <SweetAlert
            success
            title={
              <>
                <div className="text-3xl">{message}</div>
              </>
            }
            onConfirm={closeAlert}
            customButtons={
              <InputButton
                label="Ok"
                className="w-3/6"
                onClick={closeAlert}
              />
            }
          ></SweetAlert>
        );
    } else if (type === 'confirm') {
        return (
            <SweetAlert
                warning
                title={title}
                onConfirm={()=>confirmCallback('yes')}
                onCancel={()=>confirmCallback('no')}
                customButtons={
                <div className="flex justify-around w-full">
                    <InputButton
                    label="Yes"
                    className="w-5/12 bg-dodge-b"
                    onClick={()=>confirmCallback('yes')}
                    />
                    <InputButton
                    className="w-5/12 ml-5"
                    label="No"
                    onClick={()=>confirmCallback('no')}
                    />
                </div>
              }
          >
            {message}
          </SweetAlert>
        );
    } else if (type === 'warning') {
      return (<SweetAlert
            error
            title={
              <>
                <div className="text-3xl">{message}</div>
              </>
            }
            onConfirm={closeAlert}
            customButtons={
              <InputButton
                label="Ok"
                className="w-3/6"
                onClick={closeAlert}
              />
            }
        ></SweetAlert>);
    } else return null;
});

export default AlertBox;