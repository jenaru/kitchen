import { Router } from 'express';
const router = Router();
import { getIngredients, addIngredient, updateIngredient, deleteIngredient } from '../controllers/ingredientsController.js';

router.get('/', getIngredients);
router.post('/', addIngredient);
router.put('/:id', updateIngredient);
router.delete('/:id', deleteIngredient);

export default router;
