import { Box } from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import News from "./News";
import SideDrawer from "./SideDrawer";
import { selectCategory } from "../features/news/newsSlice";
import { useSelector } from "react-redux";

const Home = () => {
    const category = useSelector(selectCategory);

    const drawerWidth = 190;

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
            <SideDrawer drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
            <News category={category} />
        </Box>
    );
}

export default Home;