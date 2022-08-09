const API_KEY = process.env.REACT_APP_WEATHER_API_KEY ? process.env.REACT_APP_WEATHER_API_KEY : "3c72c025421eb8ec553bb5f13e594c17";

const requests = {
    fetchCurrent: (lat, lon) => `/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
};

export default requests;