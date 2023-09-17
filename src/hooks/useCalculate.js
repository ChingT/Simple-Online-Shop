import { useSelector } from "react-redux";

export default function useCalculate() {
  const products = useSelector((state) => state.catalog.products);
  const itemsArray = useSelector((state) => state.cart.itemsArray);

  const calculate = () => {
    let totalNumItems = 0;
    let totalPrice = 0;
    itemsArray.forEach(([productID, quantity]) => {
      totalNumItems += quantity;
      const product = products[productID];
      totalPrice += quantity * product.price;
    });
    return [totalNumItems, totalPrice];
  };

  const [totalNumItems, totalPrice] = calculate();
  return { totalNumItems, totalPrice };
}
