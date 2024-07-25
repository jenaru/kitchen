import Ingredient from '../models/Ingredient.js';

// Método para obtener todos los ingredientes
export const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Método para añadir un nuevo ingrediente
export const addIngredient = async (req, res) => {
  const ingredient = new Ingredient(req.body);
  try {
    const newIngredient = await ingredient.save();
    res.status(201).json(newIngredient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Método para actualizar un ingrediente existente
export const updateIngredient = async (req, res) => {
  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedIngredient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Método para eliminar un ingrediente
export const deleteIngredient = async (req, res) => {
  try {
    await Ingredient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ingredient deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
