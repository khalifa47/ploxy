import { Box } from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import SideDrawer from "./SideDrawer";

const Home = () => {
    const drawerWidth = 180;

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
            <SideDrawer drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
        </Box>
    );
}

export default Home;