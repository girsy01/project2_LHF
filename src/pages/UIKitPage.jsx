import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import heartSVGred from "../assets/heart-svg-red.svg";
import heartSVGnoFill from "../assets/heart-svg-noFill.svg";
import movieSVG from "../assets/movie-svg.svg";
import bookSVG from "../assets/book-svg.svg";
import musicSVG from "../assets/music-svg.svg";

const UIKitPage = () => {
  return (
    <div id="UIKitPage">
      <h1>All UI elements</h1>

      <hr />

      <h2>Navbar:</h2>
      <div>
        <Navbar />
      </div>

      <hr />

      <h2>Buttons:</h2>
      <div>
        <Link to="#">
          <button className="btn-light">Details</button>
        </Link>
        <Link to="#">
          <button className="btn-dark">Details</button>
        </Link>
      </div>

      <hr />

      <h2>Item Cards:</h2>
      <div className="card-container">
        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="like pos-absolute-right ">
            <img src={heartSVGnoFill} className="liked" />
            {/* <img src={heartSVGred} className="liked" /> */}
          </div>
          <div className="category-icon pos-absolute-left ">
            <img src={movieSVG} />
          </div>

          <div className="card-infos">
            <div className="details">
              <h2>Title of item</h2>
              <p>Category</p>
            </div>
            <div className="total-likes">
              <div>10</div>
              <div className="like">
                <img src={heartSVGred} />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="like pos-absolute-right ">
            {/* <img src={heartSVGnoFill} className="liked" /> */}
            <img src={heartSVGred} className="liked" />
          </div>
          <div className="category-icon pos-absolute-left ">
            <img src={bookSVG} />
          </div>

          <div className="card-infos">
            <div className="details">
              <h2>Title of item</h2>
              <p>Category</p>
            </div>
            <div className="total-likes">
              <div>10</div>
              <div className="like">
                <img src={heartSVGred} />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bXVzaWN8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
          <div className="like pos-absolute-right ">
            <img src={heartSVGnoFill} className="liked" />
            {/* <img src={heartSVGred} className="liked" /> */}
          </div>
          <div className="category-icon pos-absolute-left ">
            <img src={musicSVG} />
          </div>

          <div className="card-infos">
            <div className="details">
              <h2>Title of item</h2>
              <p>Category</p>
            </div>
            <div className="total-likes">
              <div>10</div>
              <div className="like">
                <img src={heartSVGred} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UIKitPage;
