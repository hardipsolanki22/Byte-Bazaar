import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import PageLayout from './components/layout/PageLayout'
import Product from './pages/Product'
import SignIn from './components/auth/Signin'
import SignUp from './components/auth/Signup'
import Account from './pages/Account'
import Cart from './pages/Cart'
import Address from './components/checkout/Address'
import Payment from './components/checkout/Payment'
import Order from './pages/Order'
import SingleOrder from './components/order/SingleOrder'
import Rating from './pages/Rating'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <PageLayout />
        } >
          <Route element={
            <Index />
          } path='/' />
          <Route element={
            <SignIn />
          } path='/signin'
          />
          <Route element={
            <SignUp />
          } path='/signup'
          />
          <Route element={
            <Account />
          } path='/account' />
          <Route element={
            <Product />
          } path='/products/:slug' />
          <Route element={
            <Cart />
          } path='/checkout/cart' />

          <Route element={
            <Address />
          } path='/checkout/address' />
          <Route element={
            <Payment />
          } path='/checkout/payment' />
          <Route element={
            <Order />
          } path='/my-orders' />

          <Route element={
            <SingleOrder />
          } path='/my-orders/:orderId' />
          <Route element={
            <Rating />
          } path='/rating' />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
