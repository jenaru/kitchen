import React, { useState } from 'react';
import axios from 'axios';

const IngredientForm = ({ fetchIngredients }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/ingredients', { name, quantity, unit });
      fetchIngredients();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Cantidad" required />
      <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="Unidad" required />
      <button type="submit">Añadir Ingrediente</button>
    </form>
  );
};

export default IngredientForm;
