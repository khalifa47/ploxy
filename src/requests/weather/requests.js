import getLocation from "../location";

const location = getLocation();

const API_KEY = "3c72c025421eb8ec553bb5f13e594c17";

const requests = {
    fetchCurrent: `/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}`
};

export default requests;