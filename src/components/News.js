import { Masonry } from "@mui/lab";
import { Box, CircularProgress, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import axios from "../requests/news/axios";
import requests from "../requests/news/requests";

const News = ({ category }) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setNews([]);
            const request = await axios.get(requests.fetchTopHeadlines(false, category));
            setNews(request.data.articles);
            return request;
        }
        fetchData();
    }, [category]);

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            {
                news.length === 0 ?
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress size={100} variant="indeterminate" sx={{ color: 'rgba(230, 62, 0, 1)' }} />
                        </Box>
                    </> :
                    <>
                        <Typography variant="h5">{category} News</Typography>
                        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2} sx={{ m: '0 auto' }}>
                            {news?.map(newsItem => (
                                <NewsItem
                                    key={newsItem.title}
                                    image={newsItem.urlToImage}
                                    source={newsItem.source.name}
                                    time={newsItem.publishedAt}
                                    headline={newsItem.title.substr(0, newsItem.title.lastIndexOf("-") - 1)}
                                    target={newsItem.url}
                                    del={false}
                                />
                            ))}
                        </Masonry>
                    </>
            }
        </Box>
    );
}

export default News;