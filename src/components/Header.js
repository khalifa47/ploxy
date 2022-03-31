import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import FaceIcon from '@mui/icons-material/Face';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { ListItemIcon, ListItemText } from '@mui/material';

import { useEffect } from "react";
import requests from "../requests/weather/requests";
import axios from "../requests/weather/axios";
import { selectLatitude, selectLongitude } from "../features/location/locationSlice";
import { useSelector } from "react-redux";
import SearchBar from './SearchBar';

const Header = ({ drawerWidth, handleDrawerToggle }) => {
    const lat = useSelector(selectLatitude);
    const lon = useSelector(selectLongitude);
    const [weatherIcon, setWeatherIcon] = useState(null);
    const [weatherCondition, setWeatherCondition] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchCurrent(lat, lon));
            setWeatherIcon(request.data.weather[0].icon);
            setWeatherCondition(request.data.weather[0].main);
            return request;
        }
        lat !== null && lon !== null && fetchData();
    }, [lat, lon]);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const settings = [
        {
            name: 'Profile',
            icon: <FaceIcon />
        },
        {
            name: 'Account',
            icon: <AccountCircleIcon />
        },
        {
            name: 'Logout',
            icon: <LogoutIcon />
        },
    ];

    return (
        <AppBar
            position="sticky"
            enableColorOnDark
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                position: 'fixed',
                left: { md: `${drawerWidth}px` },
                background: 'rgba(230, 62, 0, 1)',
                maxHeight: '65px',
                borderLeft: 'none',
                boxShadow: 0
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleDrawerToggle}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: 'flex', ml: { xs: 1, sm: 0 } }}>
                        <SearchBar />
                    </Box>

                    <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <img src={`https://openweathermap.org/img/wn/${weatherIcon}.png`} alt="weathericon" />
                        <Typography>{weatherCondition}</Typography>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="userprofile" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                    <ListItemIcon sx={{ color: 'rgb(230, 62, 0)' }}>
                                        {setting.icon}
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Typography sx={{ mx: 2 }}>{setting.name}</Typography>
                                    </ListItemText>

                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;