import { Box, Toolbar } from "@mui/material";
import NewsItem from "./NewsItem";

const News = () => {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <NewsItem /><NewsItem /><NewsItem />
        </Box>
    );
}

export default News;