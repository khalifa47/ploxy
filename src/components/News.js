import { Masonry } from "@mui/lab";
import { Box, Toolbar } from "@mui/material";
import NewsItem from "./NewsItem";

const News = () => {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Masonry columns={4} spacing={2}>
                <NewsItem /><NewsItem /><NewsItem /><NewsItem /><NewsItem /><NewsItem /><NewsItem />
            </Masonry>

        </Box>
    );
}

export default News;