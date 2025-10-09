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

      {/* Gallery Section */}
      <div className="gallery-title">
      <h2>Our Gallery</h2>
      </div>
      <section className="gallery">
        <div className="gallery-grid">
          <img src="https://source.unsplash.com/random/400x400/?beer,1" alt="beer 1" />
          <img src="https://source.unsplash.com/random/400x400/?beer,2" alt="beer 2" />
          <img src="https://source.unsplash.com/random/400x400/?beer,3" alt="beer 3" />
          <img src="https://source.unsplash.com/random/400x400/?brewery,4" alt="beer 4" />
          <img src="https://source.unsplash.com/random/400x400/?beer,5" alt="beer 5" />
          <img src="https://source.unsplash.com/random/400x400/?brew,6" alt="beer 6" />
        </div>
      </section>
    </div>
  );
}

export default Home;
