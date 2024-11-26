import { useParams } from "react-router-dom";

const DashboardPage = () => {

  const {userId} = useParams();
  
  return (
    <div>
      <h1>User Dashboard</h1>
      <ul>
        <li>Movies</li>
        <li>Books</li>
        <li>Music</li>
      </ul>
    </div>
  );
};
export default DashboardPage;
