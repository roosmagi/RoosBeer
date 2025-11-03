import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneBeer } from '../api/beer';
import './Beer.css';

function BeerDetail() {
  const { id } = useParams();
  const [beer, setBeer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchBeer = async () => {
      try {
        const data = await getOneBeer(id); 
        setBeer(data.beer);
      } catch (err) {
        console.error(err);
        setError('Õlle detailide laadimine ebaõnnestus');
      } finally {
        setLoading(false);
      }
    };

    fetchBeer();
  }, [id]); 

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="beer-detail-container">
      {loading && <p>Laen õlle detaile...</p>}
      {error && <p className="error-msg">{error}</p>}

      {beer && (
        <div className="beer-detail">
          <img
            src={`http://localhost:3002/uploads/${beer.image}`}
            alt={beer.name}
            className="beer-image-detail"
          />
          <h2>{beer.name}</h2>
          <p><strong>Vol:</strong> {beer.vol}%</p>
          <p><strong>Style:</strong> {beer.style}</p>
          <p><strong>Description:</strong> {beer.description}</p>
          <p><strong>Price:</strong> {beer.price}€</p>
          <div className="card-actions">
            <div className="counter">
              <button onClick={decrement}>-</button>
              <span>{quantity}</span>
              <button onClick={increment}>+</button>
            </div>
            <div className="buybutton">
              <button>Buy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BeerDetail;
