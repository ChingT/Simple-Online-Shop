import "./index.css";

export default function Product({ product }) {
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
        <div className="add-to-cart">Add To Cart</div>
      </div>
    </div>
  );
}
