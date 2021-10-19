import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Components/users/login/Login'
import Logout from './Components/users/logout/Logout'
import Register from './Components/users/register/Register'
import ProductDetail from './pages/product/Detail'
import DeleteProduct from './pages/product/Delete'
import Products from './pages/product/List'
import Cart from './pages/cart/Cart'
import NotFound404 from './Components/component-not-found/ComponentNotFound' 
import Nav from './Components/nav/Nav'
import HomePage from './pages/home/Home'
import AdminPage from './pages/admin/Admin'
import CreateProduct from './pages/product/Create'


function App() {
  return (
    <Router>  
      <div className='App' >
        <Nav />
      <Switch>
        <Route path="/" exact ><HomePage/></Route>
        <Route path="/cart" exact ><Cart /></Route>
        <Route path="/products" exact ><Products/></Route>
        <Route path="/products/:id" exact children={<ProductDetail/>}></Route>
        <Route path="/products/:id/delete" exact children={<DeleteProduct/>}></Route>
        <Route path="/products/:id/update" exact children={<ProductDetail/>}></Route>
        <Route path="/products/add" exact ><CreateProduct/></Route>
        <Route path="/admin" exact ><AdminPage /></Route>
        <Route path="/auth/login" exact ><Login /></Route>
        <Route path="/auth/logout" exact ><Logout /></Route>
        <Route path="/auth/register" exact ><Register /></Route>
        <Route path="*" exact ><NotFound404 /></Route>
      </Switch>
      </div>
    </Router>
  )
}

export default App


