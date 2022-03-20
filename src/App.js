import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./components/Home";
import { setLocation } from "./features/location/locationSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }));
      }, (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
          default:
            console.log(error);
            break;
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
