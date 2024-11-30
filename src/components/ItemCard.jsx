import heartSVGred from "../assets/heart-svg-red.svg";
import heartSVGnoFill from "../assets/heart-svg-noFill.svg";
import movieSVG from "../assets/movie-svg.svg";
import bookSVG from "../assets/book-svg.svg";
import musicSVG from "../assets/music-svg.svg";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemCard = ({ category, item }) => {
  const { userId } = useParams();

  let catIcon = "";
  if (category === "book") catIcon = bookSVG;
  else if (category === "movie") catIcon = movieSVG;
  else catIcon = musicSVG;

  let imgSrc = "../assets/logo.png";
  if (item) {
    if (category === "book") imgSrc = item.book_cover;
    else if (category === "movie") imgSrc = item.cover;
    else if (category === "music") imgSrc = item.album_cover;
    else if (category === "event") imgSrc = item.event_cover;
  }

  let titles = "Untitled";
  if (item) {
    if (category === "book") titles = item.book_title;
    else if (category === "movie") titles = item.title;
    else if (category === "music") titles = item.band_name;
    else if (category === "event") titles = item.event_name;
  }

  

  return (
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
