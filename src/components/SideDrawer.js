import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import SportsIcon from '@mui/icons-material/Sports';
import DevicesIcon from '@mui/icons-material/Devices';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BiotechIcon from '@mui/icons-material/Biotech';
import { useDispatch } from "react-redux";
import { setNews } from "../features/news/newsSlice";

const SideDrawer = ({ drawerWidth, handleDrawerToggle, mobileOpen }) => {
    const dispatch = useDispatch();

    const categories = [
        {
            name: 'General',
            icon: <LanguageIcon />
        },
        {
            name: 'Sports',
            icon: <SportsIcon />
        },
        {
            name: 'Technology',
            icon: <DevicesIcon />
        },
        {
            name: 'Entertainment',
            icon: <TheaterComedyIcon />
        },
        {
            name: 'Health',
            icon: <LocalHospitalIcon />
        },
        {
            name: 'Science',
            icon: <BiotechIcon />
        },
        {
            name: 'Business',
            icon: <AttachMoneyIcon />
        }
    ];

    const handleChangeCategory = (cat) => {
        dispatch(setNews(cat));
    }

    const drawer = (
        <div>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    component="img"
                    src="logo.png"
                    alt="logo"
                    sx={{
                        display: 'flex',
                        m: 3,
                        mb: 1,
                        width: "100px",
                        borderRadius: "5px"
                    }}
                />
            </Toolbar>
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {categories.map(category => (
                        <ListItemButton onClick={() => handleChangeCategory(category.name)} key={category.name}>
                            <ListItemIcon>
                                {category.icon}
                            </ListItemIcon>
                            <ListItemText primary={category.name} />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </div>
    );
    return (
        <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box', width: drawerWidth, background: 'rgba(230, 62, 0, 1)', color: "white",
                        '& svg': { color: 'white' }
                    }
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box', width: drawerWidth, background: 'rgba(230, 62, 0, 1)', borderRight: 'none', color: "white",
                        '& svg': { color: 'white' }
                    }
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

export default SideDrawer;