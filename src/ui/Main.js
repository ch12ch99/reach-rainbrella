import React from 'react';

import { Link } from 'react-router-dom';

import AppMenu from './AppMenu';

import { Box, Button } from '@mui/material';



export default function Main() {



    return (

        <Box>

            <AppMenu />


                <Button component={Link} to='/product' color="inherit">product</Button>
                <Button component={Link} to='/employee' color="inherit">employee</Button>
                <Button component={Link} to='/account' color="inherit">account</Button>
                <Button component={Link} to='/umbrella' color="inherit">umbrella</Button>
                <Button component={Link} to='/machine' color="inherit">machine</Button>
                <Button component={Link} to='/record' color="inherit">record</Button>
                <Button component={Link} to='/manager' color="inherit">manager</Button>
                <Button component={Link} to='/blacklist' color="inherit">blacklist</Button>

        </Box>

    )



}