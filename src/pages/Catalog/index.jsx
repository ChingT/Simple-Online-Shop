import { useEffect, useState } from "react";
import { DummyJsonAPI } from "../../axios";
import Product from "../../components/Product";
import useFetch from "../../hooks/useFetch";
import "./index.css";

export default function Catalog() {
  const [products, setProducts] = useState([]);

  const [config, setConfig] = useState(null);
  const { resData } = useFetch(DummyJsonAPI, config);

  useEffect(() => {
    setConfig({ method: "get", url: "/products", params: { limit: 12 } });
  }, []);

  useEffect(() => {
    if (resData) setProducts(resData.products);
  }, [resData]);

  if (!products) return <h2>Loading posts...</h2>;

  return (
    <div id="products">
      <h1>Crazy Shop</h1>
      <ul>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
