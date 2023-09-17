import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DummyJsonAPI } from "../../axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import Product from "../../components/Product";
import useFetch from "../../hooks/useFetch";
import { addProducts } from "../../store/slices/catalog";
import "./index.css";

export default function Catalog() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.catalog.products);
  const { sendRequest, resData } = useFetch(DummyJsonAPI);

  useEffect(() => {
    sendRequest({ method: "get", url: "/products", params: { limit: 15 } });
  }, []);

  useEffect(() => {
    if (resData) dispatch(addProducts(resData.products));
  }, [dispatch, resData]);

  if (!products) return <LoadingSpinner />;
  return (
    <div id="products">
      <h1>Fancy Online Shop</h1>
      <ul>
        {Object.values(products).map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
