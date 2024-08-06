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
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IngredientSearch from "./IngredientSearch"; // Importar el nuevo componente
import OrderList from "./OrderList"; // Importar el componente OrderList

// Componente funcional que recibe ingredientes y funciones para eliminarlos y actualizarlos como props
const IngredientList = ({
  ingredients,
  deleteIngredient,
  updateIngredient,
}) => {
  console.log("Rendering IngredientList with ingredients:", ingredients);

  // Estados para manejar la apertura de diálogos, ingrediente seleccionado y otros datos de edición/búsqueda
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editName, setEditName] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [editUnit, setEditUnit] = useState("");
  const [orderList, setOrderList] = useState([]);

  // Función para abrir el diálogo de eliminación y seleccionar el ingrediente a eliminar
  const handleClickOpenDelete = (ingredient) => {
    setSelectedIngredient(ingredient);
    setOpenDelete(true);
  };

  // Función para cerrar el diálogo de eliminación
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedIngredient(null);
  };

  // Función para abrir el diálogo de edición y cargar datos del ingrediente a editar
  const handleClickOpenEdit = (ingredient) => {
    setSelectedIngredient(ingredient);
    setEditName(ingredient.name);
    setEditQuantity(ingredient.quantity);
    setEditUnit(ingredient.unit);
    setOpenEdit(true);
  };

  // Función para cerrar el diálogo de edición
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedIngredient(null);
  };

  // Función para eliminar el ingrediente seleccionado
  const handleDelete = () => {
    deleteIngredient(selectedIngredient._id);
    handleCloseDelete();
  };

  // Función para actualizar el ingrediente seleccionado con los nuevos datos
  const handleEdit = () => {
    updateIngredient(selectedIngredient._id, {
      name: editName,
      quantity: editQuantity,
      unit: editUnit,
    });
    handleCloseEdit();
  };

  // Función para agregar un ingrediente a la lista de pedidos
  const handleAddToOrderList = (ingredient) => {
    setOrderList((prevList) => [...prevList, ingredient]);
  };

  // Función para remover un ingrediente de la lista de pedidos
  const handleRemoveFromOrderList = (ingredient) => {
    setOrderList((prevList) =>
      prevList.filter((item) => item._id !== ingredient._id)
    );
  };

  // Función para editar un ingrediente de la lista de pedidos
  const handleEditOrderList = (index) => {
    const ingredient = orderList[index];
    setSelectedIngredient(ingredient);
    setEditName(ingredient.name);
    setEditQuantity(ingredient.quantity);
    setEditUnit(ingredient.unit);
    setOpenEdit(true);
  };

  // Función para copiar la lista de pedidos al portapapeles
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

  // Función para actualizar un ingrediente de la lista de pedidos después de editarlo
  const handleEditOrderItem = () => {
    const updatedOrderList = orderList.map((item) =>
      item._id === selectedIngredient._id
        ? { ...item, name: editName, quantity: editQuantity, unit: editUnit }
        : item
    );
    setOrderList(updatedOrderList);
    handleCloseEdit();
  };

  // Filtrar ingredientes según el término de búsqueda y ordenar alfabéticamente
  const filteredIngredients = ingredients
    .slice() // Crear una copia del array para no mutar el original
    .sort((a, b) => a.name.localeCompare(b.name)) // Ordenar en orden alfabético ascendente
    .filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      {/* Utilizar el componente IngredientSearch */}
      <IngredientSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <OrderList
        orderList={orderList}
        handleEditOrderList={handleEditOrderList}
        handleRemoveFromOrderList={handleRemoveFromOrderList}
        handleCopyOrderList={handleCopyOrderList}
      />

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

// Definición de PropTypes para asegurar que las props tienen el tipo correcto
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
