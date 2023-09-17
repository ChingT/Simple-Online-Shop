import { useDispatch } from "react-redux";
import { addOneItem } from "../../store/slices/cart";
import "./index.css";

export default function Product({ product }) {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addOneItem(product.id));
  };

  return (
    <div id="product">
      <div className="thumbnail">
        <img src={product.thumbnail} />
      </div>
      <div className="title">
        <p>{product.title}</p>
      </div>
      <div className="price">
        <div>{product.price} EUR</div>
        <button id="add-to-cart" onClick={handleClick}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}
