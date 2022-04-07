import { AppBar, Dialog, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef } from "react";
import { Masonry } from "@mui/lab";
import NewsItem from "./NewsItem";

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SearchDialog = ({ open, handleClose, query, news }) => {
    news = news.filter((value, index, arr) =>
        index === arr.findIndex((t) => t.title === value.title)
    );

    return (
        <Dialog
            fullScreen
            scroll="paper"
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'sticky', background: 'rgba(230, 62, 0, 1)' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Search results for "{query}"
                    </Typography>
                </Toolbar>
            </AppBar>
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2} sx={{ m: '0 auto', background: 'rgba(0, 0, 0, 1)' }}>
                {news?.map(newsItem => (
                    <NewsItem
                        key={newsItem.title}
                        image={newsItem.urlToImage}
                        source={newsItem.source.name}
                        time={newsItem.publishedAt}
                        headline={newsItem.title}
                        target={newsItem.url}
                        del={false}
                    />
                ))}
            </Masonry>
        </Dialog>
    );
}

export default SearchDialog;