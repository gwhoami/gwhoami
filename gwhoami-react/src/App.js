import React, { Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AlertBox from './component/alertBox';
import DotSpinner from './component/DotSpinner';
import MainLayout from './container/mainLayout';
import { MainContext } from './util/maincontext';
import ReactModal from 'react-modal';
import ScrollTop from './util/ScrollTop';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { apiGetCall } from './helper/API';

const HomePage = React.lazy(()=>import('./container/homePage'));
const AdminDashboard = React.lazy(()=>import('./container/adminDashboard'));
const UserHomePage = React.lazy(()=>import('./container/userpages/userHome'));

ReactModal.setAppElement("#root");
const App = () => {
  const [alert, showAlert] = useState({
    type: '', title: '', message: '', callback: null
  });
  useEffect(()=>{
    apiGetCall('/test');
  }, []);
  const routes = (
    <Switch>
      <Route path="/home" render={(props)=><HomePage {...props}/>}/>
      <Route excat path="/admin/:pageId" render={(props)=><AdminDashboard {...props}/>}/>
      <Route excat path="/user/:pageId" render={(props)=><UserHomePage {...props}/>}/>
      <Route path="/">
        <Redirect to="/home"/>
      </Route>
    </Switch>                                 
  );
  return (
    <MainContext.Provider value={{showAlert}}>
      <ScrollTop/>
      <MainLayout>
        <ToastContainer/>
        <AlertBox showAlert={showAlert} {...alert} />
        <Suspense fallback={<DotSpinner/>}>{routes}</Suspense>
      </MainLayout>
    </MainContext.Provider>
  );
}

export default App;
