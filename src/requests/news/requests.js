const API_KEY = "7044a24af7a64a16b66110f112087002";

const requests = {
    fetchTopHeadlines: (country = false, category = false, sources = false, q = false, language = "en") => (
        `/top-headlines?apiKey=${API_KEY}${country && sources === false ? `&country=${country}` : ""}${category && sources === false ? `&category=${category}` : ""}${sources && country === false && category === false ? `&sources=${sources}` : ""}${q ? `&q=${q}` : ""}&language=${language}&pageSize=50`
    )
};

export default requests;