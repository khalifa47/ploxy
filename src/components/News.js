import { Masonry } from "@mui/lab";
import { Box, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import axios from "../requests/news/axios";
import requests from "../requests/news/requests";

const News = ({ category }) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchTopHeadlines(false, category));
            setNews(request.data.articles);
            return request;
        }
        fetchData();
    }, [category]);

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Typography variant="h5">{category} News</Typography>
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2} sx={{ m: '0 auto' }}>
                {/* str.substr(0, str.lastIndexOf("-") - 1) */}
                {news?.map(newsItem => (
                    <NewsItem
                        key={newsItem.title}
                        image={newsItem.urlToImage}
                        source={newsItem.source.name}
                        time={newsItem.publishedAt}
                        headline={newsItem.title.substr(0, newsItem.title.lastIndexOf("-") - 1)}
                        description={newsItem.description}
                        target={newsItem.url}
                    />
                ))}
            </Masonry>
        </Box>
    );
}

export default News;