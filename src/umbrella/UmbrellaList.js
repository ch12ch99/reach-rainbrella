import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import AppMenu from '../ui/AppMenu';

export default function UmbrellaList() {
    const [employees] = useState([
        { id: "0", name: "Ben", department: "IT" },
        { id: "1", name: "Rich", department: "Marketing" },
        { id: "2", name: "Ruby", department: "Management" },
        { id: "3", name: "Judy", department: "IT" },
        { id: "4", name: "Rain", department: "IT" }
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };
    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            backgroundColor: 'background.paper',
            color: 'black',
            textAlign: 'left'
        }} >
            <AppMenu/>
            <List subheader="Umbrella list" aria-label="Umbrella list">
                {employees.map((employee, index) =>
                    <ListItem divider key={index} onClick={() => handleListItemClick(index)} selected={selectedIndex === index}>
                        <ListItemText primary={employee.name} secondary={"@" + employee.department}></ListItemText>
                    </ListItem>)}
            </List>
        </Box>
    );
}