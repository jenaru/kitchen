import { useState, useEffect } from "react";
import axios from "axios";
import IngredientForm from "../components/IngredientForm.jsx";
import IngredientList from "../components/IngredientList.jsx";
import { Container, Typography } from "@mui/material";

const Home = () => {
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/ingredients",
        {
          withCredentials: true, // Asegúrate de incluir credenciales si es necesario
        }
      );
      console.log("Fetched ingredients:", response.data); // Verificar datos obtenidos
      setIngredients(response.data);
    } catch (err) {
      console.error("Error fetching ingredients:", err);
    }
  };

  const deleteIngredient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/ingredients/${id}`, {
        withCredentials: true, // Asegúrate de incluir credenciales si es necesario
      });
      fetchIngredients();
    } catch (err) {
      console.error("Error deleting ingredient:", err);
    }
  };

  const updateIngredient = async (id, updatedData) => {
    try {
      await axios.put(
        `http://localhost:5000/api/ingredients/${id}`,
        updatedData,
        {
          withCredentials: true,
        }
      );
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
