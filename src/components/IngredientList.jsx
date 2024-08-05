import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const IngredientList = ({
  ingredients,
  deleteIngredient,
  updateIngredient,
}) => {
  console.log("Rendering IngredientList with ingredients:", ingredients);

  return (
    <List>
      {ingredients.map((ingredient) => (
        <ListItem key={ingredient._id} disableGutters>
          <ListItemText
            primary={
              <Typography variant="body2">
                {ingredient.name} - {ingredient.quantity} {ingredient.unit}
              </Typography>
            }
          />
          <IconButton onClick={() => deleteIngredient(ingredient._id)}>
            <DeleteIcon color="error" />
          </IconButton>
          <IconButton onClick={() => updateIngredient(ingredient._id)}>
            <EditIcon color="primary" />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      unit: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteIngredient: PropTypes.func.isRequired,
  updateIngredient: PropTypes.func.isRequired,
};

export default IngredientList;
