import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
}, { collection: 'ingredientes' });  // Especifica la colección

export default model('Ingredient', ingredientSchema);
