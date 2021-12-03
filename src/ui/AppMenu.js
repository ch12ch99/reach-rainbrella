import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@mui/material';
import SignOut from '../account/SignOut';
import SignIn from '../account/SignIn';
import {AuthContext, STATUS} from '../account/AuthContext';

export default function AppMenu() {
    const authContext = useContext(AuthContext);//利用useContext hook取得AuthContext裡的值
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Button component={Link} to='/product' color="inherit">product</Button>
                <Button component={Link} to='/account' color="inherit">account</Button>
                <Button component={Link} to='/umbrella' color="inherit">umbrella</Button>
                <Button component={Link} to='/machine' color="inherit">machine</Button>
                <Button component={Link} to='/admin' color="inherit">admin</Button>
                <Button component={Link} to='/' color="inherit">index</Button>
                {authContext.status === "signOut" ? ( //查看預設狀態
                    <SignOut/>
                ):"預設個人帳號位置"}
                
            </Toolbar>
        </AppBar>
    )
}