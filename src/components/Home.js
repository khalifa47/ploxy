import { useEffect } from "react";
import requests from "../requests/weather/requests";
import axios from "../requests/weather/axios";
import { selectLatitude, selectLongitude } from "../features/location/locationSlice";
import { useSelector } from "react-redux";

const Home = () => {
    const lat = useSelector(selectLatitude);
    const lon = useSelector(selectLongitude);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchCurrent(lat, lon));
            console.log(request.data);
            return request;
        }
        lat !== null && lon !== null && fetchData();
    }, [lat, lon]);

    return (
        <div>

        </div>
    );
}

export default Home;