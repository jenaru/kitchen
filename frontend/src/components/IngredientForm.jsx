/* eslint-disable react/prop-types */
import { useState } from "react";
import api from "../api/api"; // Asegúrate de actualizar con la ruta correcta
import { TextField, Button, Box } from "@mui/material";

const IngredientForm = ({ fetchIngredients }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/ingredients", {
        name,
        quantity,
        unit,
      });
      fetchIngredients();
      setName(""); // Limpiar el campo de nombre
      setQuantity(0); // Limpiar el campo de cantidad
      setUnit(""); // Limpiar el campo de unidad
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
