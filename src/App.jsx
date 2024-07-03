import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import { loader as FeateredDataloader } from "./components/Crousels/FeauteredProductsCrousel";
import Products, { loader as ProductsLoader } from "./pages/Products";
import ProductDetail, { loader as PordDetailLoader } from "./pages/ProductDetail";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
          element={<Home />}
          loader={FeateredDataloader}
        />
        <Route
          path="products"
          element={<Products />}
          loader={ProductsLoader}
        />
        <Route
          path="products/:id"
          element={<ProductDetail />}
          loader={PordDetailLoader}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
