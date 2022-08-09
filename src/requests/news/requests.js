const API_KEY = process.env.REACT_APP_NEWS_API_KEY ? process.env.REACT_APP_NEWS_API_KEY : "7044a24af7a64a16b66110f112087002";

const requests = {
    fetchTopHeadlines: (country = false, category = false, sources = false, q = false, language = "en") => (
        `/top-headlines?apiKey=${API_KEY}${country && sources === false ? `&country=${country}` : ""}${category && sources === false ? `&category=${category}` : ""}${sources && country === false && category === false ? `&sources=${sources}` : ""}${q ? `&q=${q}` : ""}&language=${language}&pageSize=50`
    ),
    fetchQueried: (q, sortby) => `/everything?q=${q}&sortBy=${sortby}&pageSize=60&language=en&searchIn=title&apiKey=${API_KEY}`
};

export default requests;