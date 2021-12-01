import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar } from '@mui/material';

export default function AppMenu() {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Button component={Link} to='/product' color="inherit">product</Button>
                <Button component={Link} to='/account' color="inherit">account</Button>
                <Button component={Link} to='/umbrella' color="inherit">umbrella</Button>
                <Button component={Link} to='/machine' color="inherit">machine</Button>
                <Button component={Link} to='/admin' color="inherit">admin</Button>
                <Button component={Link} to='/' color="inherit">index</Button>
            </Toolbar>
        </AppBar>
    )
}