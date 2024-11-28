import ItemCard from "../components/ItemCard";

const DashboardPage = () => {
  return (
    <div className="dashboardPage">
      <div className="wrapper">
        <h1>Exhibitly</h1>
        <h2>Your unique gallery of favorites.</h2>

        <div className="card-container">
          <ItemCard category={"movie"} />
          <ItemCard category={"book"} />
          <ItemCard category={"music"} />
          <ItemCard category={"event"} />
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
