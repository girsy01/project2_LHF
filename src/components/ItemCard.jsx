import heartSVGred from "../assets/heart-svg-red.svg";
import heartSVGnoFill from "../assets/heart-svg-noFill.svg";
import movieSVG from "../assets/movie-svg.svg";
import bookSVG from "../assets/book-svg.svg";
import musicSVG from "../assets/music-svg.svg";
import eventSVG from "../assets/events-svg.svg";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemCard = ({ category, item }) => {
  const { userId } = useParams();

  let catIcon = "";
  if (category === "book") catIcon = bookSVG;
  else if (category === "movie") catIcon = movieSVG;
  else if (category === "event") catIcon = eventSVG;
  else catIcon = musicSVG;

  let imgSrc = "";
  if (category === "book")
    imgSrc =
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  else if (category === "movie")
    imgSrc =
      "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  else
    imgSrc =
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bXVzaWN8ZW58MHx8MHx8fDA%3D";

  https: return (
    <div className="card">
      <img src={imgSrc} alt="" />
      <div className="like pos-absolute-right ">
        <img src={heartSVGnoFill} className="liked" />
        {/* <img src={heartSVGred} className="liked" /> */}
      </div>
      <div className="category-icon pos-absolute-left ">
        <img src={catIcon} />
      </div>

      <div className="card-infos">
        <div className="details">
          <h2>{titles}</h2>
          <p>{category}</p>
        </div>
        <div className="total-likes">
          <div>10</div>
          <div className="like">
            <img src={heartSVGred} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemCard;
