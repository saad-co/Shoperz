import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import { loader as FeateredDataloader } from "./components/Crousels/FeauteredProductsCrousel";
import Products, { loader as ProductsLoader } from "./pages/Products";
import ProductDetail, { loader as PordDetailLoader } from "./pages/ProductDetail";
import SignUp, { action as singupAction } from "./pages/SignUp";
import Login, { action as LoginAction, loader as LoginLoader } from "./pages/Login";
import ContactUs from "./pages/ContactUs";
import PrivateRoute, { loader as privateLoader } from "./PrivateRoute";
import ResetPassword, { action as ResetAction } from "./pages/ResetPassword";
import NotFound from "./pages/404";
import CreateProduct from "./pages/Admin/CreateProduct";
import AdminHome from "./pages/Admin/AdminHome";
import AdminProducts from "./pages/Admin/AdminProducts";
import EditProduct from "./pages/Admin/EditProducts";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminHome />
            </PrivateRoute>
          }
          loader={privateLoader}
        >
        </Route>
        <Route
          path="/admin/adminproducts"
          element={
            <PrivateRoute>
              <AdminProducts />
            </PrivateRoute>
          }
        >
        </Route>
        <Route
          path="/admin/editproduct/:id"
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        >
        </Route>
        <Route
          path="/admin/createProduct"
          element={
            <PrivateRoute>
              <CreateProduct />
            </PrivateRoute>
          }
        >
        </Route>
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
          <Route
            path="signup"
            element={<SignUp />}
            action={singupAction}
          />
          <Route
            path="login"
            element={<Login />}
            action={LoginAction}
            loader={LoginLoader}
          />
          <Route
            path="forgetpassword"
            element={<ResetPassword />}
            action={ResetAction}
          />
          {/* Protected Routes */}
          <Route
            path="contact"
            element={
              <PrivateRoute>
                <ContactUs />
              </PrivateRoute>
            }
            loader={privateLoader}
          />
        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
