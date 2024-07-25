import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IngredientForm from '../components/IngredientForm.jsx';
import IngredientList from '../components/IngredientList.jsx';



const Home = () => {
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ingredients');
      setIngredients(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteIngredient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/ingredients/${id}`);
      fetchIngredients();
    } catch (err) {
      console.error(err);
    }
  };

  const updateIngredient = async (id) => {
    const newQuantity = prompt("Nueva cantidad:");
    if (newQuantity) {
      try {
        await axios.put(`http://localhost:5000/api/ingredients/${id}`, { quantity: newQuantity });
        fetchIngredients();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div>
      <h1>Stock de la Cocina</h1>
      <IngredientForm fetchIngredients={fetchIngredients} />
      <IngredientList ingredients={ingredients} deleteIngredient={deleteIngredient} updateIngredient={updateIngredient} />
    </div>
  );
};

export default Home;
