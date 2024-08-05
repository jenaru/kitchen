import Ingredient from "../models/Ingredient.js";

export const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ingredientes" });
  }
};

export const addIngredient = async (req, res) => {
  try {
    const newIngredient = new Ingredient(req.body);
    await newIngredient.save();
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar ingrediente" });
  }
};

export const updateIngredient = async (req, res) => {
  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedIngredient);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar ingrediente" });
  }
};

export const deleteIngredient = async (req, res) => {
  try {
    await Ingredient.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Ingrediente eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar ingrediente" });
  }
};
