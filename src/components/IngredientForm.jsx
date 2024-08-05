/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";

const IngredientForm = ({ fetchIngredients }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/ingredients", {
        name,
        quantity,
        unit,
      });
      fetchIngredients();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
      <TextField
        label="Nombre"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Cantidad"
        variant="outlined"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        fullWidth
      />
      <TextField
        label="Unidad"
        variant="outlined"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" type="submit">
        Agregar Ingrediente
      </Button>
    </Box>
  );
};

export default IngredientForm;
