import { useState, useEffect } from "react";
import api from "../api/api.js"; // Asegúrate de actualizar con la ruta correcta
import IngredientForm from "../components/IngredientForm.jsx";
import IngredientList from "../components/IngredientList.jsx";
import { Container, Typography } from "@mui/material";

const Home = () => {
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async () => {
    try {
      const response = await api.get("/api/ingredients");
      console.log("Fetched ingredients:", response.data); // Verificar datos obtenidos
      setIngredients(response.data);
    } catch (err) {
      console.error("Error fetching ingredients:", err);
    }
  };

  const deleteIngredient = async (id) => {
    try {
      await api.delete(`/api/ingredients/${id}`);
      fetchIngredients();
    } catch (err) {
      console.error("Error deleting ingredient:", err);
    }
  };

  const updateIngredient = async (id, updatedData) => {
    try {
      await api.put(`/api/ingredients/${id}`, updatedData);
      fetchIngredients();
    } catch (err) {
      console.error("Error updating ingredient:", err);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Stock de la Cocina
      </Typography>
      <IngredientForm fetchIngredients={fetchIngredients} />
      <IngredientList
        ingredients={ingredients}
        deleteIngredient={deleteIngredient}
        updateIngredient={updateIngredient}
      />
    </Container>
  );
};

export default Home;
