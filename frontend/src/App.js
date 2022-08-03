import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import classes from "./App.module.css";

import Category from "./Components/Category/Category";
import Product from "./Components/Product/Product";
function App() {
  const navigate = useNavigate();
  const navigateToCategory = () => {
    navigate("/Category");
  };
  const navigateToProduct = () => {
    navigate("/Product");
  };
  return (
    <div>
      <div>
        <div className={classes.buttons_div}>
          <button className={classes.main_category_button} onClick={navigateToCategory}>
            C a t e g o r y
          </button>
          <button className={classes.main_product_button} onClick={navigateToProduct}>
             P r o d u c t
          </button>
        </div>
        <Routes>
          <Route path="/category" element={<CategoryF />} />
          <Route path="/product" element={<ProductF />} />
        </Routes>
      </div>
    </div>
  );
}
function CategoryF() {
  return <Category />;
}
function ProductF() {
  return <Product />;
}
export default App;

