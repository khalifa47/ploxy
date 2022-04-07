import { AppBar, Dialog, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef, useEffect, useState } from "react";
import { Masonry } from "@mui/lab";
import NewsItem from "./NewsItem";
import { useSelector } from "react-redux";
import { selectUserId } from "../features/user/userSlice";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "../firebase";

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SavedNews = ({ open, handleClose }) => {
    const [news, setNews] = useState([]);
    const uid = useSelector(selectUserId);

    useEffect(() => {
        if (uid) {
            const q = query(collection(db, `users/${uid}/savednews`), orderBy('time', 'desc'));
            onSnapshot(q, (snapshot) => {
                setNews(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                })));
            });
        }
    }, [uid]);
    return (
        <Dialog
            fullScreen
            scroll="paper"
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            sx={{
                '.MuiDialog-paperFullScreen': {
                    background: 'rgba(0, 0, 0, 1)'
                }
            }}
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
                        Saved News
                    </Typography>
                </Toolbar>
            </AppBar>
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2} sx={{ m: '0 auto' }}>
                {news?.map(newsItem => (
                    <NewsItem
                        key={newsItem.id}
                        image={newsItem.data.image}
                        source={newsItem.data.source}
                        time={newsItem.data.time}
                        headline={newsItem.data.headline}
                        target={newsItem.data.target}
                    />
                ))}
            </Masonry>
        </Dialog>
    );
}

export default SavedNews;