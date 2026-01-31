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

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
