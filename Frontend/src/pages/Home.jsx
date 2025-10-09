import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: 'url(/taust.jpg)'}}>
        <div className="overlay"></div>
        <h1>RoosBeer</h1>
        <p>Jump into a new taste experience!</p>
        <div className="buttons">
          <button onClick={() => navigate("/about")} className="btn btn-light">
            Learn More
          </button>
          <button onClick={() => navigate("/shop")} className="btn btn-dark">
            Shop Now
          </button>
        </div>
      </section>

      <div className="gallery-title">
      <h2>Gallery</h2>
      </div>
      <section className="gallery">
        <div className="gallery-grid">
          <img src="outdoor.jpg" alt="Outdoor" />
          <img src="Beer.png" alt="RoosBeer" />
          <img src="taust.jpg" alt="Bar" />
          <img src="beers.jpg" alt="Beer in glass" />
          <img src="brewery.jpg" alt="Brewery" />
          <img src="Toasting.jpg" alt="Toasting" />
        </div>
      </section>
    </div>
  );
}

export default Home;
