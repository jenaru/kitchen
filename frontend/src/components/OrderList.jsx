import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const OrderList = ({
  orderList,
  handleEditOrderList,
  handleRemoveFromOrderList,
  handleCopyOrderList,
}) => {
  return (
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
  );
};

OrderList.propTypes = {
  orderList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      unit: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleEditOrderList: PropTypes.func.isRequired,
  handleRemoveFromOrderList: PropTypes.func.isRequired,
  handleCopyOrderList: PropTypes.func.isRequired,
};

export default OrderList;
