import ItemCard from "../components/ItemCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState({});

useEffect(() => {
  axios.get("http://localhost:5005/user").then((response) => {    
    const data = response.data;

    const user = data.find((oneUser) => oneUser.id === userId)

    
    setCurrentUser(user)
  })
}, [currentUser])



  return (
    <div className="dashboardPage">
      <div className="wrapper">
        <h1>Exhibitly</h1>
        <h2>Your unique gallery of favorites.</h2>

        <div className="card-container">
          <ItemCard category={"movie"} />
        </div>
        <div className="card-container">
          <ItemCard category={"book"} />
        </div>
        <div className="card-container">
          <ItemCard category={"music"} />
        </div>
        <div className="card-container">
          <ItemCard category={"event"} />
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
