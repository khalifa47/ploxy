import { Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { addDoc, collection } from 'firebase/firestore';
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectUserId } from '../features/user/userSlice';

const NewsItem = ({ image, source, time, headline, target }) => {
    const [shownTime, setShownTime] = useState("");
    const uid = useSelector(selectUserId);

    const handleSave = async () => {
        uid === null ? alert("You must be logged in first") :
            addDoc(collection(db, `users/${uid}/savednews`), {
                image: image,
                source: source,
                time: time,
                headline: headline,
                target: target
            }).then(() => alert("success"));
    };

    useEffect(() => {
        const showTimeAgo = () => {
            const start = DateTime.fromISO(time, { zone: 'utc' });
            const end = DateTime.fromISO(DateTime.utc(), { zone: 'utc' });
            const i = start.until(end);
            const diff = i.toDuration(['months', 'days', 'hours', 'minutes', 'seconds']).toObject();

            let tempTime = {}
            Object.keys(diff).forEach(key => {
                if (diff[key] !== 0) {
                    tempTime[key] = diff[key];
                }
            });

            const selectedKey = Object.keys(tempTime)[0];
            const selectedValue = tempTime[selectedKey];

            setShownTime(`${selectedValue} ${selectedValue === 1 ? selectedKey.slice(0, -1) : selectedKey} ago`);
        }
        showTimeAgo();
    }, [time]);

    return (
        <Card sx={{ color: "white", background: "linear-gradient(rgba(11, 11, 11, 0.1), rgba(230, 62, 0, 0.9))" }}>
            <CardActionArea href={target} target="_blank">
                <CardMedia
                    component="img"
                    height="200"
                    image={image ? image : "imageNotFound.png"}
                    alt="media"
                />
                <CardContent sx={{ p: 1 }}>
                    <Typography variant="caption">
                        {source} · {shownTime}
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontWeight: 600, lineHeight: 1.3, pb: 1 }}>
                        {headline}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
                <IconButton onClick={handleSave} size="small" sx={{ color: "white" }}>
                    <FavoriteIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: "white" }}>
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default NewsItem;