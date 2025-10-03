import React, { useState } from 'react';
import { addBeer } from '../api/beer';
import { useNavigate } from 'react-router-dom';
import './AddBeer.css';

function AddBeer() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    style: '',
    vol: '',
    character: '',
    image: null,
  });

  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setForm({ ...form, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('style', form.style);
    formData.append('vol', form.vol);
    formData.append('character', form.character);
    formData.append('image', form.image);

    try {
      await addBeer(formData);
      setSuccess('Õlu lisatud!');
      setForm({
        name: '',
        description: '',
        price: '',
        style: '',
        vol: '',
        character: '',
        image: null,
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <div className="addbeer-container">
      <form onSubmit={handleSubmit} className="addbeer-form" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="style"
          placeholder="Style"
          value={form.style}
          onChange={handleChange}
        />
        <input
          type="text"
          name="character"
          placeholder="Character"
          value={form.character}
          onChange={handleChange}
        />
        <input
          type="number"
          name="vol"
          placeholder="Alcohol Volume (%)"
          value={form.vol}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <div
          className={`dropzone ${dragActive ? 'active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>{form.image ? `Fail valitud: ${form.image.name}` : 'Drag an image here or select a file'}</p>
        </div>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required={!form.image}
        />
        <button type="submit">Add</button>
      </form>
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}
    </div>
  );
}

export default AddBeer;
