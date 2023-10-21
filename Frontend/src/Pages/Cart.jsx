import "../CSS/Cart.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../Components/CartContext";

const Cart = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Cart</h1>
      {cart.map((product) => (
        <div key={product._id} className="outer-product-container">
          <div className="image-product">
            <img src={product.productImage} alt={product.productName} />
          </div>
          <div className="detail-product">
            <h4>Name: {product.productName}</h4>
            <h5>Price: Rs. {product.productPrice}</h5>
            <input
              type="button"
              value="Remove"
              onClick={() => {
                removeFromCart(product._id);
              }}
            />
          </div>
          <div className="increase-product">
            <RemoveIcon
              style={{
                border: "1px solid var(--color-6)",
                fontSize: "35px",
                cursor: "pointer",
              }}
              onClick={() => decrementQuantity(product._id)}
            />
            <h3>{product.quantity}</h3>
            <AddIcon
              style={{
                border: "1px solid var(--color-6)",
                fontSize: "35px",
                cursor: "pointer",
              }}
              onClick={() => incrementQuantity(product._id)}
            />
          </div>
          <div className="product-price-cart">
            <h1>Rs. {product.productPrice * product.quantity}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
