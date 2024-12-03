import movieSVGlight from "../assets/movie-svg-light.svg";
import bookSVGlight from "../assets/book-svg-light.svg";
import musicSVGlight from "../assets/music-svg-light.svg";
import eventsSVGlight from "../assets/events-svg-light.svg";
import { FilterContext } from "../contexts/FilterContext";
import { useContext } from "react";

const IconFilterItem = ({ category }) => {
  const { setCategoryFilter } = useContext(FilterContext);

  let svgPath = "";
  if (category === "book") svgPath = bookSVGlight;
  else if (category === "movie") svgPath = movieSVGlight;
  else if (category === "music") svgPath = musicSVGlight;
  else if (category === "event") svgPath = eventsSVGlight;

  return (
    <div className="category-icon" onClick={() => setCategoryFilter(category)}>
      {svgPath.length ? <img src={svgPath} /> : <div className="">ALL</div>}
    </div>
  );
};
export default IconFilterItem;
