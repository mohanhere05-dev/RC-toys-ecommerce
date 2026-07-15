import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import About from './pages/About/About';
import Contact from "./pages/Contact/Contact";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP/VerifyOTP';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Profile from './pages/Profile/Profile';
import Checkout from './pages/Checkout/Checkout';
import MyOrders from './pages/MyOrders/MyOrders';
import OrderDetails from './pages/OrderDetails/OrderDetails';
import Payment from './pages/Payment/Payment';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';

import AdminLayout from './Admin/layout/AdminLayout';
import Dashboard from './Admin/layout/Pages/Dashboard/Dashboard';
import AdminProducts from "./Admin/layout/Pages/Products/AdminProducts";
import Orders from './Admin/layout/Pages/Orders/Orders';
import Users from './Admin/layout/Pages/Users/Users';


function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<Orders />} />
            <Route path="/admin/users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
