const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const requests = {
    fetchCurrent: (lat, lon) => `/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
};

export default requests;