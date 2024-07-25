
const IngredientList = ({ ingredients, deleteIngredient, updateIngredient }) => {
  return (
    <ul>
      {ingredients.map(ingredient => (
        <li key={ingredient._id}>
          {ingredient.name} - {ingredient.quantity} {ingredient.unit}
          <button onClick={() => deleteIngredient(ingredient._id)}>Eliminar</button>
          <button onClick={() => updateIngredient(ingredient._id)}>Actualizar</button>
        </li>
      ))}
    </ul>
  );
};

export default IngredientList;
