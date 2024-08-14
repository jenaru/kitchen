import PropTypes from "prop-types";
import { TextField, Box } from "@mui/material";

const IngredientSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        label="Buscar Ingrediente"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
      />
    </Box>
  );
};

IngredientSearch.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default IngredientSearch;
