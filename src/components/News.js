import { Masonry } from "@mui/lab";
import { Box, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import axios from "../requests/news/axios";

const News = ({ fetchUrl }) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setNews(request.data.articles);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2} sx={{ m: '0 auto' }}>
                {/* str.substr(0, str.lastIndexOf("-") - 1) */}
                {news?.map(newsItem => (
                    <NewsItem
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