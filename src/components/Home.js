import { Box } from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import News from "./News";
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
            <News />
        </Box>
    );
}

export default Home;