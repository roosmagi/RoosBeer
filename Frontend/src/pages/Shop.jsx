import { useEffect, useState } from 'react';
import { getAllBeer } from '../api/beer';
import './Shop.css';

function Shop() {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const data = await getAllBeer();
        setBeers(data.beers);

        const initialQuantities = {};
        data.beers.forEach(beer => {
          initialQuantities[beer.id] = 1;
        });
        setQuantities(initialQuantities);

      } catch (err) {
        console.error(err);
        setError('Õllede laadimine ebaõnnestus');
      } finally {
        setLoading(false);
      }
    };

    fetchBeers();
  }, []);

  const increment = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };

  const decrement = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1
    }));
  };

  return (
    <div className="home-container">
      {loading && <p>Laen õllesid...</p>}
      {error && <p className="error-msg">{error}</p>}

      <div className="beer-grid">
        {beers.map((beer) => (
          <div key={beer.id} className="beer-card">
            <img
              src={`http://localhost:3002/uploads/${beer.image}`}
              alt={beer.name}
              className="beer-image"
            />
            <h3>{beer.name}</h3>
            <p><strong>Vol:</strong> {beer.vol}%</p>
            <p><strong>Style:</strong> {beer.style}</p>
            <p><strong>Price:</strong> {beer.price}€</p>
            <div className="card-actions">
            <div className="counter">
              <button onClick={() => decrement(beer.id)}>-</button>
              <span>{quantities[beer.id]}</span>
              <button onClick={() => increment(beer.id)}>+</button>
            </div>
            <div className='buybutton'>
            <button>Buy</button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;