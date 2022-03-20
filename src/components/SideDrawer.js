import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LanguageIcon from '@mui/icons-material/Language';
import SportsIcon from '@mui/icons-material/Sports';
import DevicesIcon from '@mui/icons-material/Devices';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const SideDrawer = ({ drawerWidth, handleDrawerToggle, mobileOpen }) => {
    const categories = [
        {
            name: 'Local',
            icon: <MyLocationIcon />
        },
        {
            name: 'World',
            icon: <LanguageIcon />
        },
        {
            name: 'Sport',
            icon: <SportsIcon />
        },
        {
            name: 'Technology',
            icon: <DevicesIcon />
        },
        {
            name: 'Travel',
            icon: <AirplaneTicketIcon />
        },
        {
            name: 'Business',
            icon: <AttachMoneyIcon />
        }
    ];

    const drawer = (
        <div>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                    LOGO
                </Typography>
            </Toolbar>
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {categories.map(category => (
                        <ListItem button key={category.name}>
                            <ListItemIcon>
                                {category.icon}
                            </ListItemIcon>
                            <ListItemText primary={category.name} />
                        </ListItem>
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