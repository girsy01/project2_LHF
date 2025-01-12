import heartSVGred from "../assets/heart-svg-red.svg";
import heartSVGnoFill from "../assets/heart-svg-noFill.svg";
import movieSVG from "../assets/movie-svg.svg";
import bookSVG from "../assets/book-svg.svg";
import musicSVG from "../assets/music-svg.svg";
import eventSVG from "../assets/events-svg.svg";

const ItemCard = ({ category, item }) => {
  let catIcon = "";
  if (category === "book") catIcon = bookSVG;
  else if (category === "movie") catIcon = movieSVG;
  else if (category === "event") catIcon = eventSVG;
  else catIcon = musicSVG;

  let imgSrc = "";
  if (item) {
    if (category === "book") imgSrc = item.book_cover || "/placeholder-book.jpg";
    else if (category === "movie") imgSrc = item.cover || "/placeholder-movie.jpg";
    else if (category === "music") imgSrc = item.album_cover || "/placeholder-music.jpg";
    else if (category === "event") imgSrc = item.event_cover || "/placeholder-event.jpg";
  } else {
    imgSrc = "/placeholder.jpg";
  }

  let titles = "Untitled";
  let secondInfo = "";
  if (item) {
    if (category === "book") {
      titles = item.book_title;
      secondInfo = item.author;
    } else if (category === "movie") {
      titles = item.title;
      secondInfo = item.year;
    } else if (category === "music") {
      titles = item.band_name;
      secondInfo = item.release_date;
    } else if (category === "event") {
      titles = item.event_name;
      secondInfo = item.event_date;
    }
  }

  function catFirstLetterUpperCase() {
    return category[0].toUpperCase() + category.slice(1);
  }

  return (
    <div className="card">
      <img src={imgSrc} alt={titles} />
      {/* <div className="like pos-absolute-right ">
        <img src={heartSVGnoFill} className="liked" />
      </div> */}
      <div className="category-icon pos-absolute-right ">
        <img src={catIcon} />
      </div>

      <div className="card-infos">
        <div className="details">
          <h2>{titles}</h2>
          <p>{secondInfo}</p>
          {/* <p>{catFirstLetterUpperCase()}</p> */}
        </div>
        {/* <div className="total-likes">
          <div>10</div>
          <div className="like">
            <img src={heartSVGred} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ItemCard;
