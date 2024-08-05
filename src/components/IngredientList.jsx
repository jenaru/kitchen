import PropTypes from "prop-types";
import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const IngredientList = ({
  ingredients,
  deleteIngredient,
  updateIngredient,
}) => {
  console.log("Rendering IngredientList with ingredients:", ingredients);

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editName, setEditName] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [editUnit, setEditUnit] = useState("");
  const [orderList, setOrderList] = useState([]);

  const handleClickOpenDelete = (ingredient) => {
    setSelectedIngredient(ingredient);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedIngredient(null);
  };

  const handleClickOpenEdit = (ingredient) => {
    setSelectedIngredient(ingredient);
    setEditName(ingredient.name);
    setEditQuantity(ingredient.quantity);
    setEditUnit(ingredient.unit);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedIngredient(null);
  };

  const handleDelete = () => {
    deleteIngredient(selectedIngredient._id);
    handleCloseDelete();
  };

  const handleEdit = () => {
    updateIngredient(selectedIngredient._id, {
      name: editName,
      quantity: editQuantity,
      unit: editUnit,
    });
    handleCloseEdit();
  };

  const handleAddToOrderList = (ingredient) => {
    setOrderList((prevList) => [...prevList, ingredient]);
  };

  const handleRemoveFromOrderList = (ingredient) => {
    setOrderList((prevList) =>
      prevList.filter((item) => item._id !== ingredient._id)
    );
  };

  const handleEditOrderList = (index) => {
    const ingredient = orderList[index];
    setSelectedIngredient(ingredient);
    setEditName(ingredient.name);
    setEditQuantity(ingredient.quantity);
    setEditUnit(ingredient.unit);
    setOpenEdit(true);
  };
  const handleCopyOrderList = () => {
    const orderListText = orderList
      .map(
        (ingredient) =>
          `${ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`
      )
      .join("\n");
    navigator.clipboard
      .writeText(orderListText)
      .then(() => {
        alert("Lista de pedido copiada al portapapeles");
      })
      .catch((err) => {
        console.error("Error al copiar la lista de pedido:", err);
      });
  };
  const handleEditOrderItem = () => {
    const updatedOrderList = orderList.map((item) =>
      item._id === selectedIngredient._id
        ? { ...item, name: editName, quantity: editQuantity, unit: editUnit }
        : item
    );
    setOrderList(updatedOrderList);
    handleCloseEdit();
  };

  const filteredIngredients = ingredients
    .slice() // Crear una copia del array para no mutar el original
    .sort((a, b) => a.name.localeCompare(b.name)) // Ordenar en orden alfabético ascendente
    .filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <TextField
          label="Buscar Ingrediente"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
      </Box>
      <Box
        sx={{
          mt: 4,
          p: 2,
          backgroundColor: "#f5f5f5",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}>
        <Typography variant="h6">Lista de Pedido</Typography>
        <List>
          {orderList.map((ingredient, index) => (
            <ListItem key={index} disableGutters>
              <ListItemText
                primary={
                  <Typography variant="body2">
                    {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                  </Typography>
                }
              />
              <IconButton onClick={() => handleEditOrderList(index)}>
                <EditIcon color="primary" />
              </IconButton>
              <IconButton onClick={() => handleRemoveFromOrderList(ingredient)}>
                <RemoveShoppingCartIcon color="error" />
              </IconButton>
            </ListItem>
          ))}
        </List>
        {orderList.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleCopyOrderList}>
            Copiar Lista de Pedido
          </Button>
        )}
      </Box>
      <List>
        {filteredIngredients.map((ingredient) => (
          <ListItem key={ingredient._id} disableGutters>
            <ListItemText
              primary={
                <Typography variant="body2">
                  {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                </Typography>
              }
            />
            <IconButton onClick={() => handleClickOpenDelete(ingredient)}>
              <DeleteIcon color="error" />
            </IconButton>
            <IconButton onClick={() => handleClickOpenEdit(ingredient)}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => handleAddToOrderList(ingredient)}>
              <AddShoppingCartIcon color="secondary" />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este ingrediente?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Editar Ingrediente</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            variant="outlined"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Cantidad"
            variant="outlined"
            value={editQuantity}
            onChange={(e) => setEditQuantity(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Unidad"
            variant="outlined"
            value={editUnit}
            onChange={(e) => setEditUnit(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={
              selectedIngredient &&
              orderList.some((item) => item._id === selectedIngredient._id)
                ? handleEditOrderItem
                : handleEdit
            }
            color="secondary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
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
