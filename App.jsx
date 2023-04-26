import { useState } from "react";
const url = "https://course-api.com/react-tours-project";
import Loading from "./components/Loading";
import Tours from "./components/Tours";

import "./App.css";
import { useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };
  const fetchTours = async () => {
    setLoading(true);

    try {
      const responese = await fetch(url);
      const tours = await responese.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTours();
  }, []);
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length == 0) {
    return<main>
      <div className="title">
        <h2>No tours left</h2>
        <button className="btn" onClick={fetchTours}>
          Refresh
        </button>
      </div>
    </main>
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
