import { useDispatch, useSelector } from "react-redux";
import useCalculate from "../../hooks/useCalculate";
import { addOneItem, deleteItem, removeOneItem } from "../../store/slices/cart";
import "./index.css";

export default function Cart() {
  const { totalPrice } = useCalculate();
  const products = useSelector((state) => state.catalog.products);
  const itemsArray = useSelector((state) => state.cart.itemsArray);
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteItem(e.target.value));
  };
  const handleRemove = (e) => {
    e.preventDefault();
    dispatch(removeOneItem(e.target.value));
  };
  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addOneItem(e.target.value));
  };

  const renderItem = ([productID, quantity]) => {
    const product = products[productID];
    return (
      <div id="item" key={product.id}>
        <button onClick={handleDelete} value={productID}>
          X
        </button>
        <p className="title">{product.title}</p>

        <div className="quantity">
          <button onClick={handleRemove} value={productID}>
            -
          </button>
          <p>{quantity}</p>
          <button onClick={handleAdd} value={productID}>
            +
          </button>
        </div>

        <p>{product.price} EUR</p>
        <p>{product.price * quantity} EUR</p>
      </div>
    );
  };

  return (
    <div id="cart">
      <h1>Cart</h1>
      {itemsArray.length ? (
        itemsArray.map(renderItem)
      ) : (
        <div id="cart-empty">Your shopping cart is empty.</div>
      )}
      <h2 className="totalPrice">Total {totalPrice} EUR</h2>
    </div>
  );
}
