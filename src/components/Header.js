import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { ListItemIcon, ListItemText } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import { useEffect } from "react";
import requests from "../requests/weather/requests";
import axios from "../requests/weather/axios";
import { selectLatitude, selectLongitude } from "../features/location/locationSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from './SearchBar';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { selectUserName, selectUserPhoto, setSignOut, setUserLogin } from '../features/user/userSlice';
import SavedNews from './SavedNews';

const Header = ({ drawerWidth, handleDrawerToggle }) => {
    const lat = useSelector(selectLatitude);
    const lon = useSelector(selectLongitude);
    const [weatherIcon, setWeatherIcon] = useState(null);
    const [weatherCondition, setWeatherCondition] = useState(null);
    const [city, setCity] = useState(null);
    const [temp, setTemp] = useState(null);
    const [savedOpen, setSavedOpen] = useState(false);

    const dispatch = useDispatch();

    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                dispatch(setUserLogin({
                    name: authUser.displayName,
                    email: authUser.email,
                    photo: authUser.photoURL,
                    uid: authUser.uid
                }));
            }
        });
        const fetchData = async () => {
            const request = await axios.get(requests.fetchCurrent(lat, lon));
            setWeatherIcon(request.data.weather[0].icon);
            setWeatherCondition(request.data.weather[0].main);
            setCity(request.data.name);
            setTemp(request.data.main.temp)
            return request;
        }
        lat !== null && lon !== null && fetchData();
    }, [lat, lon]);

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                dispatch(setUserLogin({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                    uid: result.user.uid
                }));
            });
    };

    const logOut = () => {
        signOut(auth)
            .then(() => {
                dispatch(setSignOut());
            });
        handleCloseUserMenu();
    };

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleShowSaved = () => {
        handleCloseUserMenu();
        setSavedOpen(true);
    }

    const handleSavedClose = () => {
        setSavedOpen(false);
    }

    const settings = [
        {
            name: 'Account',
            icon: <AccountCircleIcon />,
            action: handleCloseUserMenu
        },
        {
            name: 'Saved',
            icon: <FavoriteIcon />,
            action: handleShowSaved
        },
        {
            name: 'Logout',
            icon: <LogoutIcon />,
            action: logOut
        }
    ];

    return (
        <>
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

                        <Box sx={{ mr: 2, display: { xs: 'none', sm: 'flex' }, alignItems: 'center', justifyContent: 'flex-end' }}>
                            <img src={`https://openweathermap.org/img/wn/${weatherIcon}.png`} alt="weathericon" />
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography>{city}</Typography>
                                <Typography variant='caption'>{weatherCondition}  · {(temp - 273.00).toFixed(2)} °C</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {
                                userName ?
                                    <>
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <Avatar alt={userName} src={userPhoto} />
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
                                                <MenuItem key={setting.name} onClick={setting.action}>
                                                    <ListItemIcon sx={{ color: 'rgb(230, 62, 0)' }}>
                                                        {setting.icon}
                                                    </ListItemIcon>
                                                    <ListItemText>
                                                        <Typography sx={{ mx: 2 }}>{setting.name}</Typography>
                                                    </ListItemText>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </>
                                    :
                                    <>
                                        <Tooltip title="Sign In">
                                            <IconButton onClick={signIn} sx={{ p: 0, color: 'white' }}>
                                                <LoginIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{ position: 'absolute', left: '60vw', top: '12vh', display: { xs: 'flex', sm: 'none' }, alignItems: 'center', justifyContent: 'flex-end' }}>
                <img src={`https://openweathermap.org/img/wn/${weatherIcon}.png`} alt="weathericon" />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography>{city}</Typography>
                    <Typography variant='caption'>{weatherCondition} · {(temp - 273.00).toFixed(2)} °C</Typography>
                </Box>
            </Box>
            <SavedNews open={savedOpen} handleClose={handleSavedClose} />
        </>
    );
}

export default Header;