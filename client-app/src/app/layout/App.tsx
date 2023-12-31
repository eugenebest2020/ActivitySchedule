import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';

/*import NavBar from './NavBar';*/
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observe } from 'mobx';
import { observer } from 'mobx-react-lite';
import NavBar from './NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import ModalContainer from '../common/modals/ModalContainer';



function App() {

    const location = useLocation();
    const { commonStore, userStore } = useStore();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded())
        } else {
            commonStore.setAppLoaded()
        }
    }, [commonStore, userStore])

    if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />
   
    return (
        <>
            <ModalContainer/>
            <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
            {location.pathname === '/' ?<HomePage/>:(
                <>
                   
                        <NavBar />
                        <Container style={{ marginTop: '7em' }}>
                            <Outlet />
                        </Container>
                </>
             ) }
        </>      
  );
}

export default observer(App);
